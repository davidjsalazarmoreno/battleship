import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useLocalStorage } from 'app/game-logic';
import { Link } from 'react-router-dom';

export function Score() {
  const { storedValue: scoreboard } = useLocalStorage([]);

  if (scoreboard.length === 0) {
    return (
      <>
        <Helmet>
          <title>Scoreboard</title>
          <meta name="description" content="No score!" />
        </Helmet>
        <Wrapper>
          There's not score to show, please go back to start screen and play a
          match :-)
        </Wrapper>
      </>
    );
  }

  const scores = scoreboard.map(score => {
    return (
      <tr>
        {Object.values(score).map((value, index) => (
          <td key={value + '' + index}>{value}</td>
        ))}
      </tr>
    );
  });

  return (
    <>
      <Helmet>
        <title>{`${scoreboard.length} matches`}</title>
        <meta name="description" content={`${scoreboard.length} matches!`} />
      </Helmet>
      <Wrapper>
        <table>
          <thead>
            <tr>
              <th>Result</th>
              <th>Cpu ships</th>
              <th>Player Ships</th>
              <th>Turns left</th>
              <th>Difficulty</th>
            </tr>
          </thead>

          <tbody>{scores}</tbody>
        </table>
        <Link to="/">Start page</Link>
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
