import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'app/components/PageWrapper';
import { GameOver } from 'app/components/GameOver';
import { useSelector } from 'react-redux';
import { RootState } from 'types';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export function GameOverPage() {
  const history = useHistory();
  const lastMatch = useSelector((state: RootState) => state.score.lastMatch);

  useEffect(() => {
    if (!lastMatch) {
      history.push('/');
    }
  }, [lastMatch, history]);

  if (lastMatch == null) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <PageWrapper>
        <GameOver score={lastMatch} />
      </PageWrapper>
    </>
  );
}
