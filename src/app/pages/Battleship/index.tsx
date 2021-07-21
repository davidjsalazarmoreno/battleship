import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'app/components/PageWrapper';
import { Grid } from 'app/components/Grid';

export function HomePage() {
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
        <Grid rows={10} columns={10} />
      </PageWrapper>
    </>
  );
}
