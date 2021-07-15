import { cellHasFailedShot, getShip } from './core';
import { Ship } from './types';

export function shotAllowed(
  position: string,
  ships: Ship[],
  shots: Set<string>,
) {
  const pos = position.toUpperCase();
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
