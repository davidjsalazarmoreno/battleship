import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'app/components/PageWrapper';
import { GameOver } from 'app/components/GameOver';
import { useLocalStorage } from 'app/game-logic';
import { useSelector } from 'react-redux';
import { RootState } from 'types';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export function GameOverPage() {
  const history = useHistory();
  const lastMatch = useSelector((state: RootState) => state.score.lastMatch);
  const { storedValue: scoreboard, setValue: setScoreboard } = useLocalStorage(
    [],
  );

  useEffect(() => {
    if (!lastMatch) {
      history.push('/');
    } else {
      setScoreboard([{ ...lastMatch }, ...scoreboard]);
    }
  }, [lastMatch, history]); // eslint-disable-line react-hooks/exhaustive-deps

  if (lastMatch == null) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Game over</title>
        <meta name="description" content="Game over" />
      </Helmet>
      <PageWrapper>
        <GameOver score={lastMatch} />
      </PageWrapper>
    </>
  );
}
