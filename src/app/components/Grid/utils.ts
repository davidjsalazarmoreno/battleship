import { CellModel as Cell } from './Cell';

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
