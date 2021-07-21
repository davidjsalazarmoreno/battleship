import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { Score } from 'app/game-logic/types';

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
        <Title>Last match result: {props.score.result}</Title>
        Game Over
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: black;
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;
