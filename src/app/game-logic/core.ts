import {
  CellModel as Cell,
  GameLoop,
  MatchDifficulty,
  MatchResults,
  Ship,
} from './types';

export function cellHasFailedShot(gridPosition: string, shots: Set<string>) {
  return shots.has(gridPosition);
}

export function getShipIndex(gridPosition: string, ships: Ship[]) {
  return ships.findIndex(({ position }) => position.includes(gridPosition));
}

export function getShip(gridPosition: string, ships: Ship[]) {
  return ships.find(({ position }) => position.includes(gridPosition));
}

export function getRandomGridPosition(length: number) {
  const limit = length - 1;
  return Math.round(Math.random() * limit);
}

export function getGridArray(dimensions: number) {
  const array: Cell[] = [];
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  let col = 0;
  let row = 0;

  for (let index = 0; index < dimensions; index++) {
    array[index] = { value: null, index, row: '', col: 0 };

    array[index].row = letters[0];
    array[index].col = col;

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

/**
 * Isolates the ship attack logic, if we get an
 * array of ships the attack was successful
 *
 * @param {{
 *   position: string;
 *   enemyShips: Ship[];
 *   attackerShots: Set<string>;
 * }} args
 * @return {*}  {(Set<string> | Ship[])}
 */
export function attack(args: {
  position: string;
  enemyShips: Ship[];
  attackerShots: Set<string>;
}): Set<string> | Ship[] {
  const { position, enemyShips, attackerShots } = args;

  const target = getShipIndex(position, enemyShips);
  if (target > -1) {
    const shipsAfterStrike = [...enemyShips];
    const ship = shipsAfterStrike[target];
    ship.strikes.push(position);
    ship.isSunk = ship.strikes.length === ship.position.length;
    return shipsAfterStrike;
  } else {
    const missedShots = new Set(attackerShots);
    missedShots.add(position);
    return missedShots;
  }
}

export function getDifficulty(turns: number): MatchDifficulty {
  if (turns === 1000) {
    return 'easy';
  }

  if (turns === 100) {
    return 'medium';
  }

  if (turns === 50) {
    return 'hard';
  }

  return 'easy';
}

export function getMatchResultType(match: GameLoop): MatchResults {
  if (match.turnsLeft === 0) {
    return 'tie';
  }

  if (match.playerShips === 0) {
    return 'defeat';
  }

  if (match.cpuShips === 0) {
    return 'victory';
  }

  return 'tie';
}
