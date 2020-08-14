import styled, { keyframes } from 'styled-components';
import { Form } from '@unform/web';

import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;
`;

const shadeAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  animation: ${shadeAnimation} 2s;
  max-width: 450px;
  width: 100%;

  > a {
    color: #3f51b5;
    font-size: 19px;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    svg {
      margin-right: 16px;
    }
    &:hover {
      color: ${shade(0.2, '#3f51b5')};
    }
  }
`;

export const SigUpForm = styled(Form)`
  width: 100%;
`;
