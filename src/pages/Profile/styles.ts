import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  padding: 24px;

  form {
    width: 400px;
  }
`;

export const AvatarInput = styled.div`
  margin: 0 32px;
  position: relative;
  align-self: center;
  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #e6e6e6;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: ${shade(0.2, '#e6e6e6')};
    }
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
  }
`;
