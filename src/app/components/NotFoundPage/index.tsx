import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { Title } from '../Title';
import { Text } from '../Text/index';
import tw from 'twin.macro';
import { ButtonLink } from '../ButtonLink';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Wrapper>
        <Title>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </Title>
        <Text>Page not found.</Text>

        <ButtonLink to="/">Go to Home Page</ButtonLink>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  ${tw`flex flex-col items-center justify-center h-screen text-brand-blue-1`}
  min-height: 320px;
`;
