import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getGridArray,
  Ship,
  getCpuCellStyle,
  getPlayerCellStyle,
  shotAllowed,
  getShip,
} from './utils';
import { Cell } from './Cell';
import { cpuInitialShips, playerInitialShips } from './constants';

export type Props = {
  rows: number;
  columns: number;
};

export type GameLoop = {
  cpuTurn: boolean;
  turnsLeft: number;
};

const defaultGameLoop: GameLoop = {
  cpuTurn: false,
  turnsLeft: 15,
};

// TODO: Create game logic module
function getRandomGridPosition() {
  const column = Math.round(Math.random() * 10);
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  const letterPosition = column >= letters.length ? column - 1 : column;

  console.log(column);
  console.log(letters.length);
  return `${letters[letterPosition]}${column}`.toUpperCase();
}

export const Grid: React.FC<Props> = props => {
  const { rows, columns } = props;
  const grid = getGridArray(rows * columns);
  const [cpuShips, setCpuShips] = useState<Ship[]>([]);
  const [playerShips, setPlayerShips] = useState<Ship[]>([]);
  const [cpuShots, setCpuShots] = useState<Set<string>>(new Set());
  const [playerShots, setPlayerShots] = useState<Set<string>>(new Set());
  const [gameLoop, setGameLoop] = useState<GameLoop>(defaultGameLoop);

  useEffect(() => {
    setCpuShips(cpuInitialShips);
    setCpuShips(playerInitialShips);
  }, []);

  useEffect(() => {
    if (gameLoop.turnsLeft === 0) {
      // Gameover here
      setGameLoop(loop => ({ ...loop, cpuTurn: false }));
      return;
    }

    if (gameLoop.cpuTurn) {
      // Cpu turn here
      // const vertical = Math.round(Math.random()) === 1;

      let position = getRandomGridPosition();
      // TODO: Create custom hook
      while (shotAllowed(position, playerShips, playerShots) === false) {
        console.log(getRandomGridPosition());
        position = getRandomGridPosition();
      }

      handleCpuAttack(position);
      setGameLoop(loop => ({
        ...loop,
        cpuTurn: false,
        turnsLeft: loop.turnsLeft - 1,
      }));
    }
  }, [gameLoop.turnsLeft, gameLoop.cpuTurn]);

  const handlePlayerAttack = (position: string) => {
    if (gameLoop.turnsLeft === 0) {
      return;
    }

    if (shotAllowed(position, cpuShips, cpuShots)) {
      const ship = getShip(position, cpuShips);
      if (ship) {
        // console.log('Shooting ship at ' + position);
        const shipIndex = cpuShips.findIndex(({ name }) => ship.name === name);
        const updated = [...cpuShips];

        updated[shipIndex].strikes.push(position);

        setCpuShips(updated);
      } else {
        // console.log('Missed at ' + position);
        const updated = new Set(cpuShots);
        updated.add(position);
        setCpuShots(updated);
      }

      setGameLoop(loop => ({ ...loop, cpuTurn: true }));
    }
  };

  const handleCpuAttack = (position: string) => {
    // TODO: Game over hook
    if (gameLoop.turnsLeft === 0) {
      return;
    }

    if (shotAllowed(position, playerShips, playerShots)) {
      const ship = getShip(position, playerShips);
      if (ship) {
        // console.log('Shooting ship at ' + position);
        const shipIndex = playerShips.findIndex(
          ({ name }) => ship.name === name,
        );
        const updated = [...playerShips];

        updated[shipIndex].strikes.push(position);

        setPlayerShips(updated);
      } else {
        // console.log('Missed at ' + position);
        const updated = new Set(playerShots);
        updated.add(position);
        setPlayerShots(updated);
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
          const position = `${cell.row}${cell.col}`.toUpperCase();
          return (
            <Cell
              key={cell.index}
              {...cell}
              style={getCpuCellStyle(position, cpuShips, cpuShots)}
              onClick={() => handlePlayerAttack(position)}
            />
          );
        })}
      </Wrapper>
      {/* ./CPU Grid */}

      <h1>Player</h1>
      <Wrapper rows={rows} columns={columns}>
        {grid.map(cell => {
          const position = `${cell.row}${cell.col}`.toUpperCase();
          return (
            <Cell
              key={cell.index}
              {...cell}
              style={getPlayerCellStyle(position, playerShips, playerShots)}
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
