import { range } from 'app/game-logic/utils';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export type Props = {
  columns: number;
  testPrefix: string;
};

export const ColumnHeaders: React.FC<Props> = props => {
  const { testPrefix, columns } = props;

  return (
    <>
      {range(columns).map((_, index) => {
        const key = `${testPrefix}-${index}-column-heading`
        return (
          <Wrapper data-testid={key} key={key}>
            <Content className="cell-content">{index}</Content>
          </Wrapper>
        );
      })}
    </>
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
