import styled from 'styled-components';

export const VideosContainer = styled.div`
  ${({ theme }) => theme.flexCenter}
  height: 100%;
`;

export const VideoCardWrapper = styled.div`
  ${({ theme }) => theme.flexColumn}
`;

export const UserInfoDiv = styled.div`
  width: 100%;
  ${({ theme }) => theme.flexCenter}
  margin-top: ${({ theme }) => theme.margins.sm};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export const VideosGrid = styled.div`
  padding: ${({ theme }) => theme.paddings.lg};
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 2rem;
`;
