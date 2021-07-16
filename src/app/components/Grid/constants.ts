import { Ship, uuidv4 } from './game-logic';

// CPU
export const cpuInitialShips: Ship[] = [
  // 1 ship with four spaces
  {
    position: ['A1', 'A2', 'A3'],
    strikes: [],
    name: uuidv4(),
  },
  // 2 ships with three spaces
  {
    position: ['H1', 'H2', 'H3'],
    strikes: [],
    name: uuidv4(),
  },
  {
    position: ['J1', 'J2', 'J3'],
    strikes: [],
    name: uuidv4(),
  },
  // 3 ships with two spaces
  {
    position: ['A10', 'B10'],
    strikes: [],
    name: uuidv4(),
  },
  {
    position: ['D5', 'E5'],
    strikes: [],
    name: uuidv4(),
  },
  {
    position: ['F6', 'G6'],
    strikes: [],
    name: uuidv4(),
  },
  // 4 ships with 1 spaces
  {
    position: ['F3'],
    strikes: [],
    name: uuidv4(),
  },
  {
    position: ['J9'],
    strikes: [],
    name: uuidv4(),
  },
  {
    position: ['C8'],
    strikes: [],
    name: uuidv4(),
  },
  {
    position: ['D1'],
    strikes: [],
    name: uuidv4(),
  },
];

// Player
export const playerInitialShips: Ship[] = [
  // 1 ship with four spaces
  {
    position: ['A1', 'A2', 'A3'],
    strikes: [],
    name: uuidv4(),
  },
  // 2 ships with three spaces
  {
    position: ['H1', 'H2', 'H3'],
    strikes: [],
    name: uuidv4(),
  },
  {
    position: ['J1', 'J2', 'J3'],
    strikes: [],
    name: 'first-ship',
  },
  // 3 ships with two spaces
  {
    position: ['A10', 'B10'],
    strikes: [],
    name: 'first-ship',
  },
  {
    position: ['D5', 'E5'],
    strikes: [],
    name: 'first-ship',
  },
  {
    position: ['F6', 'G6'],
    strikes: [],
    name: 'first-ship',
  },
  // 4 ships with 1 spaces
  {
    position: ['F3'],
    strikes: [],
    name: 'first-ship',
  },
  {
    position: ['J9'],
    strikes: [],
    name: 'first-ship',
  },
  {
    position: ['C8'],
    strikes: [],
    name: 'first-ship',
  },
  {
    position: ['D1'],
    strikes: [],
    name: 'first-ship',
  },
];
