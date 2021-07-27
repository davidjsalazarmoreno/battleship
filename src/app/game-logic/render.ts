import { cellHasFailedShot, getShip } from './core';
import { Ship } from './types';

export type CellBaseClassNames = 'cell-default' | 'cell-failed-shot';
export type ShipClassNames = 'cell-strike' | 'cell-sunk' | 'cell-ship';

function getShipStyles(
  ship: Ship,
  gridPosition: string,
  isCpu: boolean,
): ShipClassNames | CellBaseClassNames {
  if (ship.isSunk) {
    return 'cell-sunk';
  }

  return ship.strikes.includes(gridPosition)
    ? 'cell-strike'
    : isCpu
    ? 'cell-default'
    : 'cell-ship';
}

export function getClassNames(
  gridPosition: string,
  ships: Ship[],
  shots: Set<string>,
  isCpu: boolean,
): CellBaseClassNames | ShipClassNames {
  const ship = getShip(gridPosition, ships);

  if (ship) {
    return getShipStyles(ship, gridPosition, isCpu);
  }

  if (cellHasFailedShot(gridPosition, shots)) {
    return 'cell-failed-shot';
  }

  return 'cell-default';
}

export function getCpuClassNames(
  gridPosition: string,
  ships: Ship[],
  shots: Set<string>,
) {
  return getClassNames(gridPosition, ships, shots, true);
}

export function getPlayerClassNames(
  gridPosition: string,
  ships: Ship[],
  shots: Set<string>,
) {
  return getClassNames(gridPosition, ships, shots, false);
}
