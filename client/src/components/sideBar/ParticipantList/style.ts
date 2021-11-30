import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.flexColumn};
`;

export const List = styled.ul`
  width: 100%;
  ${({ theme }) => theme.flexColumn};
  padding: ${({ theme }) => theme.paddings.sm};
`;

export const Participant = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.margins.sm};
`;

export const Avatar = styled.img`
  margin-right: ${({ theme }) => theme.margins.base};
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
`;

export const Nickname = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

export const DevField = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  ${({ theme }) => css`
    margin-left: ${theme.margins.base};
    padding: ${theme.paddings.sm};
    border-radius: ${theme.borderRadius.sm};
  `}
`;

export const Position = styled.div`
  margin-left: ${({ theme }) => theme.margins.xs};
`;

export const GetOutBtn = styled.div`
  ${({ theme }) => css`
    margin-left: ${theme.margins.base};
    padding: ${theme.paddings.xs};
    border-radius: ${theme.borderRadius.sm};
    :hover {
      background-color: ${theme.colors.primary};
    }
  `}
  cursor: pointer;
`;
