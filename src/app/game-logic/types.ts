export type Ship = {
  position: string[];
  strikes: string[];
  name: string;
};

export type CellModel = {
  value: any;
  index: number;
  row: string;
  col: number;
};

export type Score = {
  result: 'tie' | 'defeat' | 'victory';
  cpuShips: number;
  playerShips: number;
  turnLeft: number;
};
