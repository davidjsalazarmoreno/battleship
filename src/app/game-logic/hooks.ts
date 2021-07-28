import { useEffect, useState } from 'react';
import { defaultGameLoop } from './constants';
import {
  attack,
  getDifficulty,
  getGridArray,
  getMatchResultType,
  getRandomGridPosition,
} from './core';
import { getValidCellsToShot, shotAllowed } from './events';
import { getInitialShips } from './initialization';
import { getCpuClassNames, getPlayerClassNames } from './render';

import { GameLoop, Score, Ship, UseBattleshipArgs } from './types';

export function useBattleship(args: UseBattleshipArgs) {
  const { rows, columns, turns, initialShips } = args;

  const [grid, setGrid] = useState(getGridArray(rows * columns));
  const [cpuShips, setCpuShips] = useState<Ship[]>([]);
  const [playerShips, setPlayerShips] = useState<Ship[]>([]);

  const [shotsByCpu, setShotsByCpu] = useState<Set<string>>(new Set());
  const [shotsByPlayer, setShotsByPlayer] = useState<Set<string>>(new Set());

  const {
    matchEnded,
    cpuTurn,
    turnsLeft,
    nextTurn,
    ...gameLoopPublicApi
  } = useGameLoop(turns);

  useEffect(() => {
    if (initialShips) {
      setCpuShips(initialShips?.cpu!);
      setPlayerShips(initialShips?.player!);
    } else {
      const cpus = getInitialShips(rows, columns);
      const pls = getInitialShips(rows, columns);
      console.log(cpus, 'cpus');
      console.log(pls, 'pls');
      setCpuShips(cpus);
      setPlayerShips(pls);
    }

    setGrid(getGridArray(rows * columns));
  }, [columns, rows, turns]);

  useEffect(() => {
    if (matchEnded) {
      return;
    }

    onCpuTurn();
  }, [matchEnded, cpuTurn, grid]);

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
    const result = attack({
      position,
      enemyShips: playerShips,
      attackerShots: shotsByCpu,
    });

    if (Array.isArray(result)) {
      setPlayerShips(result);
    } else {
      setShotsByCpu(result);
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

  const getCellClassName = (position: string, isCpu = false) => {
    if (isCpu) {
      return getCpuClassNames(position, cpuShips, shotsByPlayer);
    } else {
      return getPlayerClassNames(position, playerShips, shotsByCpu);
    }
  };

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

  // Public API
  return {
    matchEnded,
    grid,
    turnsLeft,
    handleAttack,
    getCellClassName,
    ...gameLoopPublicApi,
  };
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
      [shipsAfterStrike]: enemyShips.filter(ship => !ship.isSunk).length,
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
