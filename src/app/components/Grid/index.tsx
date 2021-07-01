import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { getGridArray } from './utils';
import { Cell } from './Cell';

export type Props = {
  rows: number;
  columns: number;
};

export type Ship = {
  position: string[];
  strikes: string[];
};

const shots: Set<string> = new Set();
const ships: Ship[] = [
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

shots.add('F5');
shots.add('I10');

function cellHasFailedShot(gridPosition: string) {
  return shots.has(gridPosition);
}

function getShip(gridPosition: string) {
  const ship = ships.find(({ position }) => position.includes(gridPosition));

  return ship;
}

function getPlayerCellStyle(gridPosition: string): CSSProperties {
  const ship = getShip(gridPosition);
  if (ship) {
    const isSunk = ship.strikes.sort().join('') === ship.position.join('');
    if (isSunk) {
      return {
        backgroundColor: 'black',
        color: 'red'
      };
    }

    return ship.strikes.includes(gridPosition)
      ? {
          backgroundColor: 'orange',
        }
      : {
          backgroundColor: 'green',
        };
  }

  if (cellHasFailedShot(gridPosition)) {
    return {
      backgroundColor: 'white',
    };
  }

  return {
    backgroundColor: 'blue',
  };
}

function handlePlayerClick(gridPosition: string) {
  if (getShip(gridPosition) || cellHasFailedShot(gridPosition)) {
    return;
  }

  console.log('Hi');
}

export const Grid: React.FC<Props> = props => {
  const { rows, columns } = props;
  const grid = getGridArray(rows * columns);

  console.log(grid);
  return (
    <Wrapper rows={rows} columns={columns}>
      {grid.map(cell => {
        const gridPosition = `${cell.row}${cell.col}`.toUpperCase();
        return (
          <Cell
            key={cell.index}
            {...cell}
            style={getPlayerCellStyle(gridPosition)}
            onClick={() => handlePlayerClick(gridPosition)}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div<Props>`
  display: grid;
  grid-template-rows: repeat(${p => p.rows}, 1fr);
  grid-template-columns: repeat(${p => p.columns}, 1fr);
`;
