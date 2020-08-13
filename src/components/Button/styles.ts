import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #3f51b5;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: bold;
  margin-top: 16px;
  transition: background-color 0.2;

  &:hover {
    background: ${shade(0.2, '#3f51b5')};
  }
`;
