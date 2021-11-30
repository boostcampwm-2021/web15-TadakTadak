import styled, { css } from 'styled-components';

export const CamperListWrapper = styled.div`
  position: relative;
`;

export const CamperListContainer = styled.div`
  position: fixed;
  padding: ${({ theme }) => theme.paddings.lg};
  ${({ theme }) => css`
    ${theme.flexCenter};
    bottom: 12rem;
    left: 29rem;
    right: 0;
  `};
`;

export const CamperWrapper = styled.div`
  margin: ${({ theme }) => theme.margins.base};
  ${({ theme }) => theme.flexColumn}
  align-items: center;
`;

export const CamperInfoDiv = styled.div`
  width: 100%;
  ${({ theme }) => theme.flexCenter}
  margin-top: ${({ theme }) => theme.margins.sm};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.grey};
`;

export const CamperAvatarList = styled.div`
  ${({ theme }) => css`
    ${theme.flexCenter};
    border-radius: ${theme.borderRadius.sm};
  `};
`;
