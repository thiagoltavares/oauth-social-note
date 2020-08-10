import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackground from '../../assets/sign-in-background.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  animation: ${appearFromLeft} 1s;
  max-width: 450px;
  width: 100%;

  > a {
    color: rgb(203, 63, 34);
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
      color: ${shade(0.2, 'rgb(203, 63, 34)')};
    }
  }
`;

export const Background = styled.section`
  flex: 1;
  background: url(${signInBackground}) no-repeat center;
  background-size: cover;
`;
