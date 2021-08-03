import { range } from 'app/game-logic/utils';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export type Props = {
  rows: number;
  testPrefix: string;
};

export const RowsHeaders: React.FC<Props> = props => {
  const { testPrefix, rows } = props;
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  return (
    <div className="flex flex-col justify-end uppercase">
      {range(rows).map((_, index) => {
        const letter = letters.shift() || '';
        const key = `${testPrefix}-${index}-${letter}-row-heading`;
        return (
          <Wrapper data-testid={key} key={key}>
            <Content className="cell-content">{letter}</Content>
          </Wrapper>
        );
      })}
    </div>
  );
};

export const Wrapper = styled.div`
  ${tw`p-2 font-bold text-center`}
  ${tw`border select-none text-brand-blue-1 border-brand-blue-3`}
`;

export const Content = styled.div`
  width: 30px;
  height: 30px;
`;
