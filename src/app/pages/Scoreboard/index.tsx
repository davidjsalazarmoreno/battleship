import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'app/components/PageWrapper';
import { Scoreboard } from 'app/components/Scoreboard';

export function ScoreboardPage() {
  return (
    <>
      <Helmet>
        <title>Scoreboard</title>
        <meta name="description" content="Check the scoreboard" />
      </Helmet>
      <PageWrapper>
        <Scoreboard />
      </PageWrapper>
    </>
  );
}
