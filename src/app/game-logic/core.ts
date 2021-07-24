import { CellModel as Cell, Ship } from './types';

export function cellHasFailedShot(gridPosition: string, shots: Set<string>) {
  return shots.has(gridPosition);
}

export function getShipIndex(gridPosition: string, ships: Ship[]) {
  return ships.findIndex(({ position }) => position.includes(gridPosition));
}

export function getShip(gridPosition: string, ships: Ship[]) {
  return ships.find(({ position }) => position.includes(gridPosition));
}

export function getRandomGridPosition(length: number) {
  return Math.round(Math.random() * length - 1);
}

export function getGridArray(dimensions: number) {
  const array: Cell[] = [];
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  let col = 0;
  let row = 0;

  for (let index = 0; index < dimensions; index++) {
    array[index] = { value: null, index, row: '', col: 0 };

    array[index].row = letters[0];
    array[index].col = col;

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
