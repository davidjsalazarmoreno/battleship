import React, { CSSProperties } from 'react';
import styled from 'styled-components/macro';
import { CellModel } from '../../../game-logic/types';

export type Props = {
  style: CSSProperties;
  testIdPrefix: string;
  onClick?: Function;
} & CellModel;

export const Cell: React.FC<Props> = props => {
  const { onClick = () => '', testIdPrefix } = props;
  return (
    <Wrapper
      data-testid={`${testIdPrefix}-${props.row}${props.col}`}
      style={props.style}
      onClick={() => onClick()}
    >
      {`${props.row}${props.col}`.toUpperCase()}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  border: 1px solid #000;
  padding: 5px;
  text-align: center;

  :hover,
  :active {
    cursor: pointer;
    background-color: red;
  }
`;
