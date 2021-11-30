import styled from 'styled-components';

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.margins.xl};
`;
export const Avatar = styled.img`
  margin-right: ${({ theme }) => theme.margins.base};
  width: 30rem;
  height: 30rem;
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
  border-radius: 1rem;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DeleteBtn = styled.button`
  ${({ theme }) => theme.flexCenter}
  width:100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  margin-top: ${({ theme }) => theme.margins.sm};
  padding: ${({ theme }) => theme.paddings.sm};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
