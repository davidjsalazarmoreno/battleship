import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'app/components/PageWrapper';
import { StartGame } from 'app/components/StartGame';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Start game</title>
        <meta name="description" content="Battleship" />
      </Helmet>
      <PageWrapper>
        <StartGame />
      </PageWrapper>
    </>
  );
}
