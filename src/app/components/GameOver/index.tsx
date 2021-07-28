import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { Score } from 'app/game-logic/types';
import { ButtonLink } from '../ButtonLink';
import { Text } from '../Text/index';
import { Title } from '../Title';
import tw from 'twin.macro';

export type Props = {
  score: Score;
};

export function GameOver(props: Props) {
  return (
    <>
      <Helmet>
        <title>Game over</title>
        <meta name="description" content="Game over" />
      </Helmet>
      <Wrapper>
        <Title>Game Over</Title>
        <Text>Last match result: {props.score.result}</Text>

        <ButtonLink to="/">Try again</ButtonLink>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  ${tw`flex flex-col items-center justify-center h-screen`}
  min-height: 320px;
`;
