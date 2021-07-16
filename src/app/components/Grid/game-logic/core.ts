import { Ship } from './types';

export function cellHasFailedShot(gridPosition: string, shots: Set<string>) {
  return shots.has(gridPosition);
}

export function getShip(gridPosition: string, ships: Ship[]) {
  const ship = ships.find(({ position }) => position.includes(gridPosition));

  return ship;
}

export function getRandomGridPosition(length: number) {
  return Math.round(Math.random() * length - 1);
}
