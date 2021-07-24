export type MatchResults = 'tie' | 'defeat' | 'victory';
export type MatchDifficulty = 'easy' | 'medium' | 'hard';

export type Ship = {
  position: string[];
  strikes: string[];
  name: string;
  isSunk: boolean;
};

export type CellModel = {
  value: any;
  index: number;
  row: string;
  col: number;
};

export type Score = {
  result: MatchResults;
  cpuShips: number;
  playerShips: number;
  turnsLeft: number;
  difficulty: MatchDifficulty;
};
