import styled, { css } from 'styled-components';
import { PROFILE } from '@utils/styleConstant';

export const AvatarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  margin-right: ${({ theme }) => theme.margins.base};
  width: ${PROFILE.avatarWidth};
  height: ${PROFILE.avatarHeight};
  border-radius: 50%;
  overflow: hidden;
`;

export const ButtonWrapper = styled.div`
  width: 10rem;
  display: flex;
  flex-direction: column;
`;

export const UploadBtn = styled.label`
  ${({ theme }) => theme.flexCenter}
  width:100%;
  background-color: ${({ theme }) => theme.colors.green};
  margin-top: ${({ theme }) => theme.margins.sm};
  padding: ${({ theme }) => theme.paddings.sm};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${PROFILE.btnBorderRadius};
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

export const DeleteBtn = styled(UploadBtn)`
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Legend = styled.legend`
  font-size: ${PROFILE.legendFontSize};
  color: ${({ theme }) => theme.colors.bgGreen};
`;

export const Info = styled.div`
  font-size: ${PROFILE.infoFontSize};
  color: ${({ theme }) => theme.colors.bgGreen};
  word-break: break-all;
`;

export const InfoSet = styled.fieldset`
  width: 100%;
  ${({ theme }) => css`
    ${theme.flexCenter};
    background-color: ${theme.colors.grey};
    padding: ${theme.paddings.sm};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
  `};
`;
