import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getGridArray,
  Ship,
  cellHasFailedShot,
  getShip,
  getCpuCellStyle,
  getPlayerCellStyle,
} from './utils';
import { Cell } from './Cell';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export type Props = {
  rows: number;
  columns: number;
};

// CPU
const cpuInitialShips: Ship[] = [
  // 1 ship with four spaces
  {
    position: ['A1', 'A2', 'A3'],
    strikes: ['A1', 'A2', 'A3'],
    name: uuidv4(),
  },
  // 2 ships with three spaces
  {
    position: ['H1', 'H2', 'H3'],
    strikes: ['H3'],
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

const playerShots: Set<string> = new Set();
const playerShips: Ship[] = [
  // 1 ship with four spaces
  {
    position: ['A1', 'A2', 'A3'],
    strikes: ['A1', 'A2', 'A3'],
    name: uuidv4(),
  },
  // 2 ships with three spaces
  {
    position: ['H1', 'H2', 'H3'],
    strikes: ['H3'],
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

playerShots.add('F5');
playerShots.add('I10');

function shotAllowed(position: string, ships: Ship[], shots: Set<string>) {
  const ship = getShip(position, ships);
  const shipHasStrike = ship && ship.strikes.includes(position);
  if (shipHasStrike) {
    return;
  }

  if (cellHasFailedShot(position, shots)) {
    return;
  }

  return true;
}

export const Grid: React.FC<Props> = props => {
  const { rows, columns } = props;
  const grid = getGridArray(rows * columns);
  const [cpuShips, setCpuShips] = useState<Ship[]>([]);
  const [cpuShots, setCpuShots] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCpuShips(cpuInitialShips);
  }, []);

  const handleCpuCellClick = (position: string) => {
    if (shotAllowed(position, cpuShips, cpuShots)) {
      const ship = getShip(position, cpuShips);
      if (ship) {
        console.log('Shooting ship at ' + position);
        const shipIndex = cpuShips.findIndex(({ name }) => ship.name === name);
        const updated = [...cpuShips];

        updated[shipIndex].strikes.push(position);

        setCpuShips(updated);
      } else {
        console.log('Missed at ' + position);
        const updated = new Set(cpuShots);
        updated.add(position)
        setCpuShots(updated);
      }
    }
  };

  console.log(cpuShots);
  return (
    <>
      <h1>CPU</h1>
      <Wrapper rows={rows} columns={columns}>
        {grid.map(cell => {
          const position = `${cell.row}${cell.col}`.toUpperCase();
          return (
            <Cell
              key={cell.index}
              {...cell}
              style={getCpuCellStyle(position, cpuShips, cpuShots)}
              onClick={() => handleCpuCellClick(position)}
            />
          );
        })}
      </Wrapper>
      {/* ./CPU Grid */}

      <h1>Player</h1>
      <Wrapper rows={rows} columns={columns}>
        {grid.map(cell => {
          const position = `${cell.row}${cell.col}`.toUpperCase();
          return (
            <Cell
              key={cell.index}
              {...cell}
              style={getPlayerCellStyle(position, playerShips, playerShots)}
              onClick={() => console.log('HI')}
            />
          );
        })}
      </Wrapper>
      {/* ./Player grid */}
    </>
  );
};

const Wrapper = styled.div<Props>`
  display: grid;
  grid-template-rows: repeat(${p => p.rows}, 1fr);
  grid-template-columns: repeat(${p => p.columns}, 1fr);
`;
