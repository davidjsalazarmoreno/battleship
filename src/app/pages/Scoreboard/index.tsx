import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'app/components/PageWrapper';
import { Grid } from 'app/components/Grid';

export function Scoreboard() {
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
        {/* <Score /> */}
      </PageWrapper>
    </>
  );
}
