import { CSSProperties } from 'react';
import { CellModel as Cell } from './Cell';

// Grid building
export function getGridArray(dimensions: number) {
  const array: Cell[] = [];
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  let col = 0;
  let row = 0;

  for (let index = 0; index < dimensions; index++) {
    array[index] = { value: null, index, row: '', col: 0 };

    array[index].row = letters[0];
    array[index].col = col + 1;

    col += 1;
    row += 1;

    if (row > 9) {
      letters.shift();
      row = 0;
    }

    if (col > 9) {
      col = 0;
    }
  }

  return array;
}

// Render
export type Ship = {
  position: string[];
  strikes: string[];
  name: string;
};

export function cellHasFailedShot(gridPosition: string, shots: Set<string>) {
  return shots.has(gridPosition);
}

export function getShip(gridPosition: string, ships: Ship[]) {
  const ship = ships.find(({ position }) => position.includes(gridPosition));

  return ship;
}

function getShipStyles(ship: Ship, gridPosition: string, isCpu: boolean) {
  const isSunk = ship.strikes.sort().join('') === ship.position.join('');
  if (isSunk) {
    return {
      backgroundColor: 'black',
      color: 'red',
    };
  }

  return ship.strikes.includes(gridPosition)
    ? {
        backgroundColor: 'orange',
      }
    : {
        backgroundColor: isCpu ? 'blue' : 'gray',
      };
}

export function getBaseCellStyles(
  gridPosition: string,
  ships: Ship[],
  shots: Set<string>,
  isCpu: boolean,
): CSSProperties {
  const ship = getShip(gridPosition, ships);

  if (ship) {
    return getShipStyles(ship, gridPosition, isCpu);
  }

  if (cellHasFailedShot(gridPosition, shots)) {
    return {
      backgroundColor: 'white',
    };
  }

  return {
    backgroundColor: 'blue',
  };
}

export function getCpuCellStyle(
  gridPosition: string,
  ships: Ship[],
  shots: Set<string>,
) {
  return getBaseCellStyles(gridPosition, ships, shots, true);
}


export function getPlayerCellStyle(
  gridPosition: string,
  ships: Ship[],
  shots: Set<string>,
) {
  return getBaseCellStyles(gridPosition, ships, shots, false);
}

