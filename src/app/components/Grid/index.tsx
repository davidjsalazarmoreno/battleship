import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { CellModel } from 'app/game-logic';
import { Cell } from './Cell';
import { RowsHeaders } from './RowsHeaders';
import { ColumnHeaders } from './ColumnsHeaders';

export type Props = {
  rows: number;
  columns: number;
  isCpu?: boolean;
  grid: CellModel[];
  onAttack?: (position: string) => void;
  cellClassName: (position: string, isCpu: boolean) => string;
};

export const Grid: React.FC<Props> = props => {
  const { grid, rows, columns, isCpu = false, onAttack, cellClassName } = props;
  const testPrefix = isCpu ? 'cpu' : 'player';

  return (
    <Wrapper>
      <RowsHeaders rows={rows} testPrefix={testPrefix} />
      <GridWrapper rows={rows} columns={columns}>
        <ColumnHeaders columns={columns} testPrefix={testPrefix} />
        {grid.map(cell => {
          const position = `${cell.row}${cell.col}`;
          return (
            <Cell
              key={position}
              testPrefix={testPrefix}
              {...cell}
              className={cellClassName(position, isCpu)}
              onClick={() => {
                if (onAttack) {
                  onAttack(position);
                }
              }}
            />
          );
        })}
      </GridWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${tw`flex`}
`;

const GridWrapper = styled.div<{ rows: number; columns: number }>`
  ${tw`grid w-full select-none lg:w-4/6`}
  grid-template-rows: repeat(${p => p.rows}, 1fr);
  grid-template-columns: repeat(${p => p.columns}, 1fr);
`;
