import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const ProfileContainer = styled.div`
  padding: ${({ theme }) => theme.paddings.xl};
  width: 100%;
  height: 100%;
`;
