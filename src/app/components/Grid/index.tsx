import React from 'react';
import styled from 'styled-components';
import { getGridArray } from './utils';
import { Cell } from './Cell';

export type Props = {
  rows: number;
  columns: number;
};

export const Grid: React.FC<Props> = props => {
  const { rows, columns } = props;
  const grid = getGridArray(rows * columns);

  console.log(grid);
  return (
    <Wrapper rows={rows} columns={columns}>
      {grid.map(cell => (
        <Cell key={cell.index} {...cell} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div<Props>`
  display: grid;
  grid-template-rows: repeat(${p => p.rows}, 1fr);
  grid-template-columns: repeat(${p => p.columns}, 1fr);
`;
