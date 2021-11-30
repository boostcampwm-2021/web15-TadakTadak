import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: end;
  ${({ theme }) => css`
    background-color: ${theme.colors.grey};
    padding: ${theme.paddings.lg};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
  `};
  :last-child {
    margin-top: ${({ theme }) => theme.margins.base};
  }
`;

export const Title = styled.h1`
  font-size: 10rem;
  color: ${({ theme }) => theme.colors.bgGreen};
`;

export const Canvas = styled.canvas`
  width: 650px;
  height: 450px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;
