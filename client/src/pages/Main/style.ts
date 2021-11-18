import styled from 'styled-components';

export const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const MainContainer = styled.div`
  padding: ${({ theme }) => theme.paddings.xl};
  width: 100%;
  height: 100%;
`;
