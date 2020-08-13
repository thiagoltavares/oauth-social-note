import styled, { css } from 'styled-components';
import { darken } from 'polished';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${darken(0.1, '#fff')};
  border-radius: 10px;
  border: 2px solid ${darken(0.1, '#fff')};
  padding: 16px;
  width: 100%;
  color: #999;

  display: flex;
  justify-content: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: #3f51b5;
      border-color: #3f51b5;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #3f51b5;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #232129;
    font-size: 16px;

    &::placeholder {
      color: #999;
    }
  }
  svg {
    margin-right: 16px;
  }
`;
