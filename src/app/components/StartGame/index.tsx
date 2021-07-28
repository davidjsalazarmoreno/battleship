import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import {
  resetGameDifficulty,
  selectGameDifficulty,
} from 'entities/configuration';
import { useDispatch } from 'react-redux';
import { Title } from '../Title';
import { ButtonLink } from '../ButtonLink';
import tw from 'twin.macro';

export function StartGame() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetGameDifficulty());
  }, [dispatch]);

  const handleDifficultySelection = (turns: number) => {
    console.log(turns);
    dispatch(selectGameDifficulty(turns!));
  };

  return (
    <>
      <Helmet>
        <title>StartGame</title>
        <meta name="description" content="Start game" />
      </Helmet>
      <Wrapper>
        <Title>Welcome to Battleship</Title>

        <Buttons>
          <ButtonLink
            to="/battleship"
            onClick={() => {
              handleDifficultySelection(1000);
            }}
          >
            Easy (1000 turns)
          </ButtonLink>

          <ButtonLink
            to="/battleship"
            onClick={() => {
              handleDifficultySelection(100);
            }}
          >
            Medium (100 turns)
          </ButtonLink>

          <ButtonLink
            to="/battleship"
            onClick={() => {
              handleDifficultySelection(50);
            }}
          >
            Hard (50 turns)
          </ButtonLink>

          <ButtonLink to="/scoreboard">Scoreboard</ButtonLink>
        </Buttons>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  ${tw`flex flex-col items-center justify-center h-screen`}
  min-height: 320px;
`;

const Buttons = styled.div`
  ${tw`flex flex-col`}
`;
