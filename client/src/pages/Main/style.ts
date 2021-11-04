import styled from 'styled-components';

export const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const MainContainer = styled.div`
  padding: ${({ theme }) => theme.paddings.lg};
  height: 100%;
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
