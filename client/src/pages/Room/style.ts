import styled from 'styled-components';

export const RoomWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const RoomContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: ${({ theme }) => theme.paddings.lg};
`;
