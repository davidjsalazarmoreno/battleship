import { Ship } from './types';
import { uuidv4 } from './utils';

function range(size: number, startAt: number = 0): ReadonlyArray<number> {
  return [...Array(size).keys()].map(i => i + startAt);
}

// Horizontal 'A1', 'A2', 'A3'
// Vertical 'A1', 'B2', 'B3'

// const ships = [
//   // 1 ship with four spaces
//   {
//     position: ['A1', 'A2', 'A3'],
//     strikes: [],
//     name: "uuidv4()",
//   },
//   // 2 ships with three spaces
//   {
//     position: ['H1', 'H2', 'H3'],
//     strikes: [],
//     name: "uuidv4()",
//   },
//   {
//     position: ['J1', 'J2', 'J3'],
//     strikes: [],
//     name: "uuidv4()",
//   },
//   // 3 ships with two spaces
//   {
//     position: ['A10', 'B10'],
//     strikes: [],
//     name: "uuidv4()",
//   },
//   {
//     position: ['D5', 'E5'],
//     strikes: [],
//     name: "uuidv4()",
//   },
//   {
//     position: ['F6', 'G6'],
//     strikes: [],
//     name: "uuidv4()",
//   },
//   // 4 ships with 1 spaces
//   {
//     position: ['F3'],
//     strikes: [],
//     name: "uuidv4()",
//   },
//   {
//     position: ['J9'],
//     strikes: [],
//     name: "uuidv4()",
//   },
//   {
//     position: ['C8'],
//     strikes: [],
//     name: "uuidv4()",
//   },
//   {
//     position: ['D1'],
//     strikes: [],
//     name: "uuidv4()",
//   },
// ];

function rowFactory(cols: number) {}

export function getGridAsMap(rows: number, cols: number) {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  const grid = new Map<string, { taken: boolean }[]>();

  for (let index = 0; index < rows; index++) {
    const cells = Array.from({ length: cols }, () => ({ taken: false }));
    grid.set(letters[index], cells);
  }

  return grid;
}

export function getInitialShips(rows: number, cols: number) {
  if (rows > 10) {
    throw new Error(
      'Grid max level reached, please choose a number between 2 and 10',
    );
  }
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  const grid = getGridAsMap(rows, cols);
  const ships: Ship[] = [];
  // 1 ship with four spaces
  // 2 ships with three spaces
  // 3 ships with two spaces
  // 4 ships with 1 spaces

  let shipsToAdd = [
    {
      size: 2,
    },
  ];

  while (shipsToAdd.length > 0) {
    let rowIndex = Math.round(Math.random() * rows - 1);
    let columnIndex = Math.round(Math.random() * cols - 1);

    let rowTaken = grid.get(letters[rowIndex])![columnIndex].taken;
    if (rowTaken) {
      continue;
    } else {
      const k = range(shipsToAdd[0].size, rowIndex);
      const taken = k.some(letterIndex => {
        return grid.get(letters[letterIndex])![columnIndex].taken;
      });

      if (taken) {
        continue;
      }

      grid.get(letters[rowIndex])![columnIndex].taken = true;
      const ship: Ship = {
        name: uuidv4(),
        position: [`${letters[rowIndex]}${columnIndex}`],
        strikes: [],
      };
      k.forEach(letterIndex => {
        ship.position.push(`${letters[letterIndex]}${columnIndex}`);
        grid.get(letters[letterIndex])![columnIndex].taken = true;
      });

      ships.push(ship);

      shipsToAdd.shift();
    }
  }

  return ships;
}
