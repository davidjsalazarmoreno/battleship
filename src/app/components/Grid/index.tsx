import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Cell } from './Cell';
import { cpuInitialShips, playerInitialShips } from './constants';
import { useHistory } from 'react-router-dom';
import {
  getCpuCellStyle,
  getGridArray,
  getPlayerCellStyle,
  getRandomGridPosition,
  getShip,
  Ship,
  shotAllowed,
  useLocalStorage,
} from '../../game-logic';
import { useDispatch } from 'react-redux';
import { addMatchResult, resetMatchResult } from 'entities/score';
import { MatchResults, Score } from 'app/game-logic/types';

export type Props = {
  rows: number;
  columns: number;
};

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

export const Grid: React.FC<Props> = props => {
  const history = useHistory();
  const { rows, columns } = props;
  const [grid, setGrid] = useState(getGridArray(rows * columns));

  const [cpuShips, setCpuShips] = useState<Ship[]>([]);
  const [playerShips, setPlayerShips] = useState<Ship[]>([]);

  const [shotsByCpu, setShotsByCpu] = useState<Set<string>>(new Set());
  const [shotsByPlayer, setShotsByPlayer] = useState<Set<string>>(new Set());

  const [gameLoop, setGameLoop] = useState<GameLoop>(defaultGameLoop);

  const [scoreboard, setScoreboard] = useLocalStorage([]);
  const dispatch = useDispatch();

  function getMatchResultType(match: GameLoop): MatchResults {
    if (gameLoop.turnsLeft === 0) {
      return 'tie';
    }

    if (gameLoop.playerShips === 0) {
      return 'defeat';
    }

    if (gameLoop.cpuShips === 0) {
      return 'victory';
    }

    return 'tie';
  }

  useEffect(() => {
    console.log(cpuInitialShips);
    console.log(playerInitialShips);
    setCpuShips(cpuInitialShips);
    setPlayerShips(playerInitialShips);
    setGameLoop(defaultGameLoop);
    setGrid(getGridArray(rows * columns));
  }, []);

  useEffect(() => {
    dispatch(resetMatchResult());
  }, [dispatch]);

  useEffect(() => {
    const matchEnded =
      gameLoop.turnsLeft === 0 ||
      gameLoop.playerShips === 0 ||
      gameLoop.cpuShips === 0;
    if (matchEnded) {
      const result: Score = {
        result: getMatchResultType(gameLoop),
        cpuShips: gameLoop.cpuShips,
        playerShips: gameLoop.playerShips,
        turnsLeft: gameLoop.turnsLeft,
      };

      setGameLoop(loop => ({ ...loop, cpuTurn: false }));
      setScoreboard([result, ...scoreboard]);
      dispatch(addMatchResult(result));
      history.push('/game-over');
      return;
    }

    if (gameLoop.cpuTurn) {
      // Cpu turn here
      // const vertical = Math.round(Math.random()) === 1;
      // console.log(grid)
      const playerGrid = grid.filter(cell => {
        // console.log(shotAllowed(`${cell.row}${cell.col}`, playerShips, shotsByCpu))
        return (
          shotAllowed(`${cell.row}${cell.col}`, playerShips, shotsByCpu) ===
          true
        );
      });

      // console.log(playerGrid)

      if (playerGrid) {
        let index = getRandomGridPosition(playerGrid.length);
        if (playerGrid[index]) {
          const { row, col } = playerGrid[index];

          console.log(playerGrid.length);
          console.log(`coord: ${row}${col}`);
          handleCpuAttack(`${row}${col}`);
        }
      }

      // TODO: Create custom hook

      setGameLoop(loop => ({
        ...loop,
        cpuTurn: false,
        turnsLeft: loop.turnsLeft - 1,
      }));
    }
  }, [gameLoop.turnsLeft, gameLoop.cpuTurn, grid]);

  const handlePlayerAttack = (position: string) => {
    if (gameLoop.turnsLeft === 0) {
      return;
    }

    if (shotAllowed(position, cpuShips, shotsByPlayer)) {
      const ship = getShip(position, cpuShips);
      if (ship) {
        // console.log('Shooting ship at ' + position);
        const shipIndex = cpuShips.findIndex(({ name }) => ship.name === name);
        const updated = [...cpuShips];

        updated[shipIndex].strikes.push(position);
        setGameLoop(loop => ({ ...loop, cpuShips: loop.cpuShips - 1 }));
        console.log(updated[shipIndex].strikes);
        setCpuShips(updated);
      } else {
        // console.log('Missed at ' + position);
        const updated = new Set(shotsByPlayer);
        updated.add(position);
        setShotsByPlayer(updated);
      }

      setGameLoop(loop => ({ ...loop, cpuTurn: true }));
    }
  };

  const handleCpuAttack = (position: string) => {
    // TODO: Game over hook
    if (gameLoop.turnsLeft === 0) {
      return;
    }

    if (shotAllowed(position, playerShips, shotsByCpu)) {
      const ship = getShip(position, playerShips);
      if (ship) {
        // console.log('Shooting ship at ' + position);
        const shipIndex = playerShips.findIndex(
          ({ name }) => ship.name === name,
        );
        const updated = [...playerShips];

        updated[shipIndex].strikes.push(position);

        setGameLoop(loop => ({ ...loop, playerShips: loop.playerShips - 1 }));
        setPlayerShips(updated);
      } else {
        // console.log('Missed at ' + position);
        const updated = new Set(shotsByCpu);
        updated.add(position);
        setShotsByCpu(updated);
      }
    }
  };

  return (
    <>
      <h1>
        {gameLoop.turnsLeft === 0
          ? 'Game over'
          : `Turns left: ${gameLoop.turnsLeft}`}
      </h1>
      <h1>CPU</h1>
      <Wrapper rows={rows} columns={columns}>
        {grid.map(cell => {
          const position = `${cell.row}${cell.col}`;
          return (
            <Cell
              key={cell.index}
              {...cell}
              style={getPlayerCellStyle(position, cpuShips, shotsByPlayer)}
              onClick={() => handlePlayerAttack(position)}
            />
          );
        })}
      </Wrapper>
      {/* ./CPU Grid */}

      <h1>Player</h1>
      <Wrapper rows={rows} columns={columns}>
        {grid.map(cell => {
          const position = `${cell.row}${cell.col}`;
          return (
            <Cell
              key={cell.index}
              {...cell}
              style={getPlayerCellStyle(position, playerShips, shotsByCpu)}
            />
          );
        })}
      </Wrapper>
      {/* ./Player grid */}
    </>
  );
};

const Wrapper = styled.div<Props>`
  display: grid;
  grid-template-rows: repeat(${p => p.rows}, 1fr);
  grid-template-columns: repeat(${p => p.columns}, 1fr);
`;
