import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { Score } from 'app/game-logic/types';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

export function StartGame() {
  const history = useHistory();
  const [turns, setTurns] = useState<number | null>(null);

  const handleDifficultySelection = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    console.log(event.target.value);

    setTurns(parseInt(event.target.value));
  };

  const handleGameStart = () => {
    console.log(turns);
    history.push('/battleship');
  };

  return (
    <>
      <Helmet>
        <title>Game over</title>
        <meta name="description" content="Game over" />
      </Helmet>
      <Wrapper>
        {/* <Title>Last match result: {props.score.result}</Title> */}
        Game Over
        <select onChange={handleDifficultySelection}>
          <option value="1000">Facil (1000 turnos)</option>
          <option value="100">Medio (100 turnos)</option>
          <option value="50">Dificil (50 turnos)</option>
        </select>
        <button disabled={!turns} onClick={handleGameStart}>
          Start game
        </button>
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
