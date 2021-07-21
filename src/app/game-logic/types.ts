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

export type MatchResults = 'tie' | 'defeat' | 'victory';

export type Score = {
  result: MatchResults;
  cpuShips: number;
  playerShips: number;
  turnsLeft: number;
};
