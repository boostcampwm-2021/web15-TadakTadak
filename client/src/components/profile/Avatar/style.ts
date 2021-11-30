import styled from 'styled-components';
import { PROFILE } from '@utils/styleConstant';

export const AvatarContainer = styled.div`
  ${({ theme }) => theme.flexColumn};
`;
export const Avatar = styled.img`
  margin-right: ${({ theme }) => theme.margins.base};
  width: ${PROFILE.avatarWidth};
  height: ${PROFILE.avatarHeight};
  border-radius: 50%;
  overflow: hidden;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
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
