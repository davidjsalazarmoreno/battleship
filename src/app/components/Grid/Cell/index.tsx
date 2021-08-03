import React from 'react';
import styled from 'styled-components/macro';
import { CellModel } from '../../../game-logic/types';
import tw from 'twin.macro';

export type Props = {
  testPrefix: string;
  onClick?: Function;
  className: string;
} & CellModel;

export const Cell: React.FC<Props> = props => {
  const { onClick = () => '', testPrefix } = props;
  return (
    <Wrapper
      data-testid={`${testPrefix}-${props.row}${props.col}`}
      onClick={() => onClick()}
      className={props.className}
    >
      <CellContent className="cell-content">&nbsp;</CellContent>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  ${tw`p-2 border`}

  &.cell-default {
    ${tw`bg-brand-blue-1 border-brand-blue-3`}
  }

  &.cell-default > .cell-content {
    ${tw`border-brand-blue-1 bg-brand-blue-2`}
  }

  &.cell-ship {
    ${tw`bg-brand-gray-1 border-brand-gray-1`}
  }

  &.cell-ship > .cell-content {
    ${tw`border-gray-400 shadow-sm bg-brand-gray-2`}
  }

  &.cell-failed-shot {
    ${tw`bg-white border-brand-gray-1`}
  }

  &.cell-failed-shot > .cell-content {
    ${tw`bg-white border-gray-200`}
  }

  &.cell-strike {
    ${tw`bg-yellow-100 border-yellow-700`}
  }

  &.cell-strike > .cell-content {
    ${tw`bg-yellow-100 border-yellow-700`}
  }

  &.cell-sunk {
    ${tw`bg-red-600 border-red-600 opacity-90`}
  }

  &.cell-sunk > .cell-content {
    ${tw`bg-red-500 border-red-400`}
  }
`;

export const CellContent = styled.div`
  width: 30px;
  height: 30px;
  ${tw`p-2 mx-auto text-sm text-transparent border-2 rounded-full`}
`;
