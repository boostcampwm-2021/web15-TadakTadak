import styled from 'styled-components';

export const MainContainer = styled.div`
  padding: ${({ theme }) => theme.paddings.lg};
`;

export const MainTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export const RoomListGrid = styled.div`
  padding: ${({ theme }) => theme.paddings.lg};
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 2rem;
`;
