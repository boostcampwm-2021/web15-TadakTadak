import styled from 'styled-components';

export const TadakWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const TadakContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: ${({ theme }) => theme.paddings.lg};
`;
