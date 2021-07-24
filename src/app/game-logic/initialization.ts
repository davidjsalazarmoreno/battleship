import { Ship } from './types';
import { range, uuidv4 } from './utils';

function isCellTaken(args) {
  const { shipSize, vertical, grid, letters, rowIndex, columnIndex } = args;

  if (vertical) {
    const cells = range(shipSize, rowIndex);
    return cells.some(letterIndex => {
      const row = grid.get(letters[letterIndex]) || [];
      if (!row[columnIndex]) {
        return true;
      }

      if (row[columnIndex].taken === true) {
        return true;
      }

      return false;
    });
  } else {
    const row = grid.get(letters[rowIndex]) || [];
    const cells = row.slice(columnIndex);

    if (cells.length < shipSize) {
      return true;
    }

    return cells.some(cell => {
      return cell.taken === true;
    });
  }
}

export type PositionArgs = {
  letters: string[];
  rowIndex: number;
  columnIndex: number;
  shipSize: number;
};

// Vertical 'A1', 'B2', 'B3'
function positionShipVertically(args: PositionArgs) {
  const { letters, rowIndex, columnIndex, shipSize } = args;

  const cells = range(shipSize, rowIndex);

  const ship: Ship = {
    name: uuidv4(),
    position: [],
    strikes: [],
    isSunk: false,
  };

  cells.forEach(letterIndex => {
    const cellName = `${letters[letterIndex]}${columnIndex}`;
    ship.position.push(cellName);
  });

  return ship;
}

// Horizontal 'A1', 'A2', 'A3'
function positionShipHorizontally(args: PositionArgs) {
  const { letters, rowIndex, columnIndex, shipSize } = args;

  let size = shipSize;
  let i = columnIndex;
  const ship: Ship = {
    name: uuidv4(),
    position: [],
    strikes: [],
    isSunk: false,
  };

  while (size > 0) {
    ship.position.push(`${letters[rowIndex]}${i}`);
    i += 1;
    size -= 1;
  }

  return ship;
}

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
  let grid = getGridAsMap(rows, cols);
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
    const rowIndex = Math.round(Math.random() * (rows - 1));
    const columnIndex = Math.round(Math.random() * (cols - 1));

    const row = grid.get(letters[rowIndex]);
    const shipSize = shipsToAdd[0].size;

    if (!row || row[columnIndex]?.taken) {
      continue;
    }

    const vertical = Math.round(Math.random()) === 1;
    const taken = isCellTaken({
      shipSize,
      vertical,
      grid,
      letters,
      rowIndex: rowIndex + 1,
      columnIndex,
    });

    if (taken) {
      continue;
    }

    const ship = vertical
      ? positionShipVertically({
          letters,
          rowIndex,
          columnIndex,
          shipSize,
        })
      : positionShipHorizontally({
          letters,
          rowIndex,
          columnIndex,
          shipSize,
        });

    ship.position.forEach(pos => {
      const [row, col] = pos;
      grid.get(row)![col].taken = true;
    });

    ships.push(ship);
    shipsToAdd.shift();
  }

  console.log(grid);

  return ships;
}
