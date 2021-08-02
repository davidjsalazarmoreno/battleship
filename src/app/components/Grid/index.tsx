import React from 'react';
import styled from 'styled-components';
import { Cell } from './Cell';
import tw from 'twin.macro';
import { ColumnHeaders, RowHeaders } from './Heading/index';

export type Props = {
  rows: number;
  columns: number;
  isCpu?: boolean;
  grid: any;
  onAttack: any;
  cellClassName: (position: string, isCpu: boolean) => string;
};

export const Grid: React.FC<Props> = props => {
  const { grid, rows, columns, isCpu = false, onAttack, cellClassName } = props;

  return (
    <div className="flex">
      <RowHeaders rows={rows} />
      <Wrapper rows={rows} columns={columns}>
        <ColumnHeaders columns={columns} />
        {grid.map(cell => {
          const position = `${cell.row}${cell.col}`;
          return (
            <>
              <Cell
                key={position}
                testIdPrefix="cpu"
                {...cell}
                className={cellClassName(position, isCpu)}
                onClick={() => onAttack(position)}
              />
            </>
          );
        })}
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div<{ rows: number; columns: number }>`
  ${tw`grid w-full select-none lg:w-4/6`}
  grid-template-rows: repeat(${p => p.rows}, 1fr);
  grid-template-columns: repeat(${p => p.columns}, 1fr);
`;
