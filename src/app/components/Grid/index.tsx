import React from 'react';
import styled from 'styled-components';
import {
  getGridArray,
  Ship,
  cellHasFailedShot,
  getShip,
  getCpuCellStyle,
  getPlayerCellStyle,
} from './utils';
import { Cell } from './Cell';

export type Props = {
  rows: number;
  columns: number;
};

// CPU
const cpuShots: Set<string> = new Set();
const cpuShips: Ship[] = [
  // 1 ship with four spaces
  {
    position: ['A1', 'A2', 'A3'],
    strikes: ['A1', 'A2', 'A3'],
  },
  // 2 ships with three spaces
  {
    position: ['H1', 'H2', 'H3'],
    strikes: ['H3'],
  },
  {
    position: ['J1', 'J2', 'J3'],
    strikes: [],
  },
  // 3 ships with two spaces
  {
    position: ['A10', 'B10'],
    strikes: [],
  },
  {
    position: ['D5', 'E5'],
    strikes: [],
  },
  {
    position: ['F6', 'G6'],
    strikes: [],
  },
  // 4 ships with 1 spaces
  {
    position: ['F3'],
    strikes: [],
  },
  {
    position: ['J9'],
    strikes: [],
  },
  {
    position: ['C8'],
    strikes: [],
  },
  {
    position: ['D1'],
    strikes: [],
  },
];

// Player

const playerShots: Set<string> = new Set();
const playerShips: Ship[] = [
  // 1 ship with four spaces
  {
    position: ['A1', 'A2', 'A3'],
    strikes: ['A1', 'A2', 'A3'],
  },
  // 2 ships with three spaces
  {
    position: ['H1', 'H2', 'H3'],
    strikes: ['H3'],
  },
  {
    position: ['J1', 'J2', 'J3'],
    strikes: [],
  },
  // 3 ships with two spaces
  {
    position: ['A10', 'B10'],
    strikes: [],
  },
  {
    position: ['D5', 'E5'],
    strikes: [],
  },
  {
    position: ['F6', 'G6'],
    strikes: [],
  },
  // 4 ships with 1 spaces
  {
    position: ['F3'],
    strikes: [],
  },
  {
    position: ['J9'],
    strikes: [],
  },
  {
    position: ['C8'],
    strikes: [],
  },
  {
    position: ['D1'],
    strikes: [],
  },
];

playerShots.add('F5');
playerShots.add('I10');

function handlePlayerClick(gridPosition: string) {
  if (
    getShip(gridPosition, playerShips) ||
    cellHasFailedShot(gridPosition, playerShots)
  ) {
    return;
  }

  console.log('Hi');
}

export const Grid: React.FC<Props> = props => {
  const { rows, columns } = props;
  const grid = getGridArray(rows * columns);

  console.log(grid);
  return (
    <>
      <h1>CPU</h1>
      <Wrapper rows={rows} columns={columns}>
        {grid.map(cell => {
          const gridPosition = `${cell.row}${cell.col}`.toUpperCase();
          return (
            <Cell
              key={cell.index}
              {...cell}
              style={getCpuCellStyle(gridPosition, cpuShips, cpuShots)}
              onClick={() => handlePlayerClick(gridPosition)}
            />
          );
        })}
      </Wrapper>
      {/* ./CPU Grid */}

      <h1>Player</h1>
      <Wrapper rows={rows} columns={columns}>
        {grid.map(cell => {
          const gridPosition = `${cell.row}${cell.col}`.toUpperCase();
          return (
            <Cell
              key={cell.index}
              {...cell}
              style={getPlayerCellStyle(gridPosition, playerShips, playerShots)}
              onClick={() => handlePlayerClick(gridPosition)}
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
