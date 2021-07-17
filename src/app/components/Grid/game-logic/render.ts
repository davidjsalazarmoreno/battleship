import { CSSProperties } from 'react';
import { cellHasFailedShot, getShip } from './core';
import { Ship } from './types';

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
