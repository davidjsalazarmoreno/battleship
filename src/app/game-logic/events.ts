import { cellHasFailedShot, getShip } from './core';
import { CellModel, Ship } from './types';

export function shotAllowed(
  position: string,
  ships: Ship[],
  shots: Set<string>,
) {
  const pos = position;
  const ship = getShip(pos, ships);
  const shipHasStrike = ship && ship.strikes.includes(pos);
  if (shipHasStrike) {
    return false;
  }

  if (cellHasFailedShot(pos, shots)) {
    return false;
  }

  return true;
}

export function getValidCellsToShot(
  grid: CellModel[],
  ships: Ship[],
  shots: Set<string>,
) {
  return grid.filter(cell => {
    return shotAllowed(`${cell.row}${cell.col}`, ships, shots) === true;
  });
}
