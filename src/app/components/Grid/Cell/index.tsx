import React from 'react';
import styled from 'styled-components/macro';

export type Props = {
  value: any;
  index: number;
  row: string;
  col: number;
};

export const Cell: React.FC<Props> = props => {
  return <Wrapper>{props.index}</Wrapper>;
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
