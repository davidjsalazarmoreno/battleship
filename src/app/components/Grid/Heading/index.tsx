import React from 'react';
import styled from 'styled-components/macro';
import { CellModel } from '../../../game-logic/types';
import tw from 'twin.macro';
import { range } from 'app/game-logic/utils';

export type Props = {
  testIdPrefix: string;
} & CellModel;

const CellHeading: React.FC<Props> = props => {
  const { testIdPrefix } = props;
  return (
    <Wrapper data-testid={`${testIdPrefix}-${props.row}${props.col}`}>
      <CellContent className="cell-content">{props.row}</CellContent>
    </Wrapper>
  );
};

export const ColumnHeaders: React.FC<{ columns: number }> = props => {
  return (
    <>
      {range(props.columns).map((_, index) => {
        return (
          <CellHeading
            value="1"
            index={1}
            row={index + 1 + ''}
            col={1}
            key={'hi'}
            testIdPrefix="cpu"
          />
        );
      })}
    </>
  );
};

export const RowHeaders: React.FC<{ rows: number }> = props => {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  return (
    <div className="flex flex-col justify-end uppercase">
      {range(props.rows).map((_, index) => {
        return (
          <CellHeading
            value="1"
            index={1}
            row={letters.shift() || ''}
            col={1}
            key={'hi'}
            testIdPrefix="cpu"
          />
        );
      })}
    </div>
  );
};

export const Wrapper = styled.div`
  ${tw`p-2 font-bold text-center border select-none text-brand-blue-1 border-brand-blue-3`}
`;

export const CellContent = styled.div`
  width: 30px;
  height: 30px;
`;
