import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import tw from 'twin.macro';

export type Props = {
  to: string;
  onClick?: () => void;
};

export const ButtonLink: React.FC<Props> = props => {
  const history = useHistory();

  return (
    <Wrapper
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }

        history.push(props.to);
      }}
    >
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  ${tw`px-4 py-2 my-3 border rounded-md`}
  ${tw`bg-transparent shadow`} 
  ${tw`text-sm font-medium tracking-widest uppercase text-brand-blue-1 border-brand-blue-1`}
  ${tw`transition hover:bg-brand-blue-1 hover:text-white hover:border-brand-blue-2`}
`;
