import * as React from 'react';
import styled from 'styled-components/macro';
import tw from 'twin.macro';
import { Title } from '../Title/index';

export type Props = {
  turnsLeft: number;
  matchEnded: boolean;
};

export function MatchInformation(props: Props) {
  const { matchEnded, turnsLeft } = props;

  if (matchEnded) {
    return null;
  }
  return (
    <Wrapper>
      <Title data-testid="turns-left">{`Turns: ${turnsLeft}`}</Title>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${tw`my-5`};
  ${tw`flex items-center justify-center font-bold text-brand-blue-1`};
`;
