import { useEffect, useState } from 'react';
import {
  getGridArray,
  getRandomGridPosition,
  getShip,
  getShipIndex,
} from './core';
import { shotAllowed } from './events';
import { getInitialShips } from './initialization';
import { useLocalStorage } from './storage';
import { MatchDifficulty, MatchResults, Score, Ship } from './types';

// CPU
export const cpuInitialShips: Ship[] = getInitialShips(10, 10);

// Player
export const playerInitialShips: Ship[] = getInitialShips(10, 10);

export type UseBattleshipArgs = {
  rows: number;
  columns: number;
  turns: number;
};

function getValidCellsToShot(grid, ships, shots) {
  return grid.filter(cell => {
    return shotAllowed(`${cell.row}${cell.col}`, ships, shots) === true;
  });
}

/**
 * Isolates the ship attack logic, if we get an
 * array of ships the attack was successful
 *
 * @param {{
 *   position: string;
 *   enemyShips: Ship[];
 *   attackerShots: Set<string>;
 * }} args
 * @return {*}  {(Set<string> | Ship[])}
 */
function attack(args: {
  position: string;
  enemyShips: Ship[];
  attackerShots: Set<string>;
}): Set<string> | Ship[] {
  const { position, enemyShips, attackerShots } = args;

  const target = getShipIndex(position, enemyShips);
  if (target > -1) {
    const shipsAfterStrike = [...enemyShips];
    shipsAfterStrike[target].strikes.push(position);
    return shipsAfterStrike;
  } else {
    const missedShots = new Set(attackerShots);
    missedShots.add(position);
    return missedShots;
  }
}

export function useBattleship(args: UseBattleshipArgs) {
  const { rows, columns, turns } = args;
  const [grid, setGrid] = useState(getGridArray(rows * columns));
  const [cpuShips, setCpuShips] = useState<Ship[]>([]);
  const [playerShips, setPlayerShips] = useState<Ship[]>([]);

  const [shotsByCpu, setShotsByCpu] = useState<Set<string>>(new Set());
  const [shotsByPlayer, setShotsByPlayer] = useState<Set<string>>(new Set());

  // pa fuera
  const [scoreboard, setScoreboard] = useLocalStorage([]);
  const {
    matchEnded,
    cpuTurn,
    turnsLeft,
    nextTurn,
    ...gameLoopPublicApi
  } = useGameLoop(100);

  useEffect(() => {
    setCpuShips(cpuInitialShips);
    setPlayerShips(playerInitialShips);
    setGrid(getGridArray(rows * columns));
  }, [columns, rows, turns]);

  useEffect(() => {
    // Outside
    if (matchEnded) {
      return;
    }

    onCpuTurn();
  }, [matchEnded, cpuTurn, grid]);

  const onCpuTurn = () => {
    if (cpuTurn) {
      const playerGrid = getValidCellsToShot(grid, playerShips, shotsByCpu);
      if (playerGrid.length) {
        let index = getRandomGridPosition(playerGrid.length);
        if (playerGrid[index]) {
          const { row, col } = playerGrid[index];
          handleAttack(`${row}${col}`, true);
        }
      }
    }
  };

  const handlePlayerAttack = (position: string) => {
    const result = attack({
      position,
      enemyShips: cpuShips,
      attackerShots: shotsByPlayer,
    });

    if (Array.isArray(result)) {
      setCpuShips(result);
    } else {
      setShotsByPlayer(result);
    }

    nextTurn({
      enemyShips: cpuShips,
      isCpuNext: true,
    });
  };

  const handleCpuAttack = (position: string) => {
    // Return boleans to avoid unnecesary renders
    const result = attack({
      position,
      enemyShips: playerShips,
      attackerShots: shotsByCpu,
    });

    // Strikes
    if (Array.isArray(result)) {
      setCpuShips(result);
    } else {
      setShotsByPlayer(result);
    }

    nextTurn({
      enemyShips: playerShips,
      isCpuNext: false,
    });
  };

  const handleAttack = (position: string, isCpu = false) => {
    if (turnsLeft === 0) {
      return;
    }

    const { enemyShips, attackerShots } = isCpu
      ? { enemyShips: playerShips, attackerShots: shotsByCpu }
      : {
          enemyShips: cpuShips,
          attackerShots: shotsByPlayer,
        };

    const attackAllowed = shotAllowed(position, enemyShips, attackerShots);
    if (!attackAllowed) {
      return;
    }

    if (isCpu) {
      handleCpuAttack(position);
    } else {
      handlePlayerAttack(position);
    }
  };

  // Public API
  return {
    matchEnded,
    handleAttack,
    ...gameLoopPublicApi,
  };
}

// TODO: To types and constants
export type GameLoop = {
  cpuTurn: boolean;
  turnsLeft: number;
  playerShips: number;
  cpuShips: number;
};

const defaultGameLoop: GameLoop = {
  cpuTurn: false,
  turnsLeft: 50,
  playerShips: 20,
  cpuShips: 20,
};
function getMatchResultType(match: GameLoop): MatchResults {
  if (match.turnsLeft === 0) {
    return 'tie';
  }

  if (match.playerShips === 0) {
    return 'defeat';
  }

  if (match.cpuShips === 0) {
    return 'victory';
  }

  return 'tie';
}

function getDifficulty(turns: number): MatchDifficulty {
  if (turns === 1000) {
    return 'easy';
  }

  if (turns === 100) {
    return 'medium';
  }

  if (turns === 50) {
    return 'hard';
  }

  return 'easy';
}

export function useGameLoop(turns: number) {
  const [matchEnded, setMatchEnded] = useState(false);
  const [gameLoop, setGameLoop] = useState<GameLoop>(defaultGameLoop);

  useEffect(() => {
    setGameLoop({
      ...defaultGameLoop,
      turnsLeft: turns!,
    });
  }, [turns]);

  useEffect(() => {
    if (
      gameLoop.turnsLeft === 0 ||
      gameLoop.playerShips === 0 ||
      gameLoop.cpuShips === 0
    ) {
      setGameLoop(loop => ({ ...loop, cpuTurn: false }));
      setMatchEnded(true);
    }
  }, [gameLoop]);

  const getScore: () => Score = () => {
    return {
      result: getMatchResultType(gameLoop),
      cpuShips: gameLoop.cpuShips,
      playerShips: gameLoop.playerShips,
      turnsLeft: gameLoop.turnsLeft,
      difficulty: getDifficulty(turns),
    };
  };

  const nextTurn = (args: { enemyShips: Ship[]; isCpuNext: boolean }) => {
    const { enemyShips, isCpuNext } = args;
    const shipsAfterStrike = isCpuNext ? 'cpuShips' : 'playerShips';
    setGameLoop(loop => ({
      ...loop,
      cpuTurn: isCpuNext,
      turnsLeft: loop.turnsLeft - 1,
      [shipsAfterStrike]: enemyShips.filter(ship => ship.isSunk).length,
    }));
  };

  // Public API
  return {
    matchEnded,
    cpuTurn: gameLoop.cpuTurn,
    turnsLeft: gameLoop.turnsLeft,
    getScore,
    nextTurn,
  };
}
