import { Ship, uuidv4 } from '../../game-logic';
import { getInitialShips } from '../../game-logic/initialization';

// CPU
export const cpuInitialShips: Ship[] = getInitialShips(10, 10);

// Player
export const playerInitialShips: Ship[] = getInitialShips(10, 10);
