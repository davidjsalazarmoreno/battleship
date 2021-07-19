import { Ship } from './types';
import { range, uuidv4 } from './utils';

function rowFactory(cols: number) {}

function isCellTaken(args) {
  const { shipSize, vertical, grid, letters, rowIndex, columnIndex } = args;

  if (vertical) {
    const cells = range(shipSize, rowIndex + 1);
    return cells.some(letterIndex => {
      const row = grid.get(letters[letterIndex]) || [];
      if (!row[columnIndex]) {
        return true;
      }

      if (row[columnIndex].taken) {
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

    return cells.slice(columnIndex).some(cell => {
      return cell.taken;
    });
  }
}

// Vertical 'A1', 'B2', 'B3'
function positionShipVertically(args) {
  const {
    grid = new Map(args.grid),
    letters,
    rowIndex,
    columnIndex,
    shipSize,
  } = args;

  const cells = range(shipSize, rowIndex + 1);
  grid.get(letters[rowIndex])![columnIndex].taken = true;

  const ship: Ship = {
    name: uuidv4(),
    position: [`${letters[rowIndex]}${columnIndex}`.toUpperCase()],
    strikes: [],
  };

  cells.forEach(letterIndex => {
    ship.position.push(`${letters[letterIndex]}${columnIndex}`.toUpperCase());
    grid.get(letters[letterIndex])![columnIndex].taken = true;
  });

  return {
    grid,
    ship,
  };
}

// Horizontal 'A1', 'A2', 'A3'
function positionShipHorizontally(args) {
  const {
    grid = new Map(args.grid),
    letters,
    rowIndex,
    columnIndex,
    shipSize,
  } = args;

  let j = shipSize;
  let i = columnIndex;
  const ship: Ship = {
    name: uuidv4(),
    position: [],
    strikes: [],
  };

  while (j > 0) {
    ship.position.push(`${letters[rowIndex]}${i}`.toUpperCase());
    grid.get(letters[rowIndex])![i].taken = true;
    i += 1;
    j -= 1;
  }

  return {
    grid,
    ship,
  };
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
    const rowIndex = Math.round(Math.random() * rows);
    const columnIndex = Math.round(Math.random() * cols);
    const rowTaken = grid.get(letters[rowIndex])?.[columnIndex]?.taken;
    const shipSize = shipsToAdd[0].size;

    if (rowTaken) {
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

    const { grid: updatedGrid, ship } = vertical
      ? positionShipVertically({
          grid,
          letters,
          rowIndex,
          columnIndex,
          shipSize,
        })
      : positionShipHorizontally({
          grid,
          letters,
          rowIndex,
          columnIndex,
          shipSize,
        });

    grid = updatedGrid;

    ships.push(ship);
    shipsToAdd.shift();
  }

  return ships;
}
