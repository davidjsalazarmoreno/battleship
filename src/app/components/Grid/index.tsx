import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { getGridArray } from './utils';
import { Cell } from './Cell';

export type Props = {
  rows: number;
  columns: number;
};

export type Ship = {
  shot: boolean;
};

const shots: Set<string> = new Set();
const ships: Map<string, Ship> = new Map();

shots.add('A1');

ships.set('A9', { shot: false });

function cellHasFailedShot(gridPosition: string) {
  return shots.has(gridPosition);
}

function getShip(gridPosition: string) {
  return ships.get(gridPosition);
}

function getPlayerCellStyle(gridPosition: string): CSSProperties {
  console.log(gridPosition)
  if (cellHasFailedShot(gridPosition)) {
    return {
      backgroundColor: 'red',
    };
  }

  const ship = getShip(gridPosition);
  if (ship) {
    return ship.shot
      ? {
          backgroundColor: 'orange',
        }
      : {
          backgroundColor: 'green',
        };
  }

  return {
    backgroundColor: 'blue',
  };
}

function handlePlayerClick(gridPosition: string) {
  if (cellHasFailedShot(gridPosition) || getShip(gridPosition)) {
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
