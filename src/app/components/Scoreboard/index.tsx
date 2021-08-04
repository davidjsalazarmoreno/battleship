import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useLocalStorage } from 'app/game-logic';
import { ButtonLink } from '../ButtonLink';
import { Title } from '../Title/index';
import tw from 'twin.macro';

export function Scoreboard() {
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
          <ButtonLink to="/">Start page</ButtonLink>
        </Wrapper>
      </>
    );
  }

  const scores = scoreboard.map(score => {
    return (
      <tr key={`${new Date().getTime()}`}>
        {Object.values(score).map((value, index) => (
          <td
            key={`${value}-${index}-${new Date().getTime()}`}
            className="p-3 uppercase"
          >
            {value}
          </td>
        ))}
      </tr>
    );
  });

  return (
    <>
      <Helmet>
        <title>{`Matches: ${scoreboard.length}`}</title>
        <meta name="description" content={`Matches: ${scoreboard.length}`} />
      </Helmet>
      <Wrapper>
        <Title>Scoreboard</Title>
        <table>
          <thead>
            <tr>
              <th className="p-3">Result</th>
              <th className="p-3">Cpu ships</th>
              <th className="p-3">Player Ships</th>
              <th className="p-3">Turns left</th>
              <th className="p-3">Difficulty</th>
            </tr>
          </thead>

          <tbody>{scoreboard.length > 0 && scores}</tbody>
        </table>
        <ButtonLink to="/">Start page</ButtonLink>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  ${tw`flex flex-col items-center justify-center h-screen text-brand-blue-1`}
  min-height: 320px;
`;
