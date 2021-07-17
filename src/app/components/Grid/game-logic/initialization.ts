import { Ship } from './types';
import { uuidv4 } from './utils';

// https://stackoverflow.com/questions/34937349/javascript-create-empty-array-of-a-given-size
function range(size: number, startAt: number = 0): ReadonlyArray<number> {
  return [...Array(size).keys()].map(i => i + startAt);
}

// Horizontal 'A1', 'A2', 'A3'
// Vertical 'A1', 'B2', 'B3'

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

  let shipsToAdd = [
    // 1 ship with four spaces
    {
      size: 4,
    },
    // 2 ships with three spaces
    {
      size: 3,
    },
    {
      size: 3,
    },
    // 3 ships with two spaces
    {
      size: 2,
    },
    {
      size: 2,
    },
    {
      size: 2,
    },
    // 4 ships with 1 spaces
    {
      size: 1,
    },
    {
      size: 1,
    },
    {
      size: 1,
    },
    {
      size: 1,
    },
  ];

  while (shipsToAdd.length > 0) {
    let rowIndex = Math.round(Math.random() * rows);
    let columnIndex = Math.round(Math.random() * cols);

    let rowTaken = grid.get(letters[rowIndex])?.[columnIndex]?.taken;
    if (rowTaken) {
      continue;
    } else {
      // const nextRow = grid.get(letters[rowIndex + 1]);

      // if (!nextRow) {
      //   continue;
      // }

      // const nextColumn = nextRow[columnIndex]

      // if (!nextColumn) {
      //   continue;
      // }

      try {
        const k = range(shipsToAdd[0].size, rowIndex + 1);
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
          ship.position.push(
            `${letters[letterIndex]}${columnIndex}`.toUpperCase(),
          );
          grid.get(letters[letterIndex])![columnIndex].taken = true;
        });

        ships.push(ship);

        shipsToAdd.shift();
      } catch (e) {
        continue;
      }
    }
  }

  return ships;
}
