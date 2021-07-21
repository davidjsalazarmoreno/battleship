import { getGridAsMap, getInitialShips } from '../initialization';

describe('Initialization', () => {
  it('should return a grid as map', () => {
    const grid = getGridAsMap(10, 10);
    expect(grid.get('c')!.length).toBe(10);
    expect(grid.get('j')![5].taken).toBe(false);
  });

  fit('generates the random positions for the ships', () => {
    const ships = getInitialShips(10, 10);
    console.log(ships);
    expect(ships.length).toBe(10);
  });
});
