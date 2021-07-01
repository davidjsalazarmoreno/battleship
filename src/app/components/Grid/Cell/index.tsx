import React, { CSSProperties } from 'react';
import styled from 'styled-components/macro';

export type CellModel = {
  value: any;
  index: number;
  row: string;
  col: number;
};

export type Props = {
  style: CSSProperties;
  onClick: any;
} & CellModel;

export const Cell: React.FC<Props> = props => {
  return (
    <Wrapper style={props.style} onClick={props.onClick}>
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
