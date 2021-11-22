import styled, { css } from 'styled-components';
import { useState } from 'react';
import InfoForm from './InfoForm';
import { useUser, useUserFns } from '@contexts/userContext';
import ModifyForm from './ModifyForm';
import axios from 'axios';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  ${({ theme }) => css`
    background-color: ${theme.colors.grey};
    padding: ${theme.paddings.lg};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
  `};
`;

const UserAvatar = styled.img`
  margin-right: ${({ theme }) => theme.margins.base};

  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainTitle = styled.h1`
  font-size: 10rem;
  color: ${({ theme }) => theme.colors.bgGreen};
`;

const UploadSpan = styled.label`
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

const DeleteSpan = styled.span`
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
function UserInfo(): JSX.Element {
  const [isModify, setIsModify] = useState(false);
  const onClickModifyToggle = () => setIsModify(!isModify);
  const user = useUser();
  const { logUserIn } = useUserFns();

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line
    const fileList = e.target.files;

    if (!fileList) return;
    const formData = new FormData();
    // eslint-disable-next-line

    formData.append('image', fileList[0]);
    const { data } = await axios.post(`/api/user/image`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (data) {
      logUserIn(data);
    }
  };

  return (
    <div>
      <MainTitle>마이 프로필</MainTitle>
      <Wrapper>
        {isModify ? (
          <ModifyForm onClickModifyToggle={onClickModifyToggle} setIsModify={setIsModify} />
        ) : (
          <InfoForm onClickModifyToggle={onClickModifyToggle} />
        )}
        <ImageWrapper>
          <UserAvatar src={user.imageUrl}></UserAvatar>
          <ButtonWrapper>
            <UploadSpan htmlFor="upload">업로드</UploadSpan>
            <input type="file" onChange={handleFileInput} id="upload" style={{ display: 'none' }}></input>
            <DeleteSpan>삭제</DeleteSpan>
          </ButtonWrapper>
        </ImageWrapper>
      </Wrapper>
    </div>
  );
}

export default UserInfo;
