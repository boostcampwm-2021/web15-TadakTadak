import { Avatar, AvatarContainer, ButtonWrapper, UploadBtn, DeleteBtn, Legend, Info, InfoSet } from './style';
import { useUser, useUserFns } from '@contexts/userContext';
import { useToast } from '@hooks/useToast';
import { deleteImage, postAvatar } from '@src/apis';
import { TOAST_MESSAGE, LEGEND_TEXT } from '@utils/constant';

const ProfileAvatar = (): JSX.Element => {
  const user = useUser();
  const { changeUserInfo } = useUserFns();
  const toast = useToast();

  const onChangeFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || !fileList[0]) return;
    const formData = new FormData();
    formData.append('image', fileList[0]);
    const { isOk, data } = await postAvatar(formData);
    if (isOk && data) {
      changeUserInfo(data);
      toast('success', TOAST_MESSAGE.updateImgSuccess);
    }
  };

  const onClickDeleteBtn = async () => {
    const { data } = await deleteImage();
    if (data) {
      if (data === true) return;
      changeUserInfo(data);
      toast('success', TOAST_MESSAGE.deleteImgSuccess);
    }
  };

  return (
    <AvatarContainer>
      <InfoSet>
        <Legend>{LEGEND_TEXT.avatar}</Legend>
        <Avatar src={user.imageUrl}></Avatar>
        <ButtonWrapper>
          <UploadBtn htmlFor="upload">업로드</UploadBtn>
          <input type="file" onChange={onChangeFileInput} id="upload" style={{ display: 'none' }}></input>
          <DeleteBtn onClick={onClickDeleteBtn}>삭제</DeleteBtn>
        </ButtonWrapper>
      </InfoSet>
    </AvatarContainer>
  );
};

export default ProfileAvatar;
