import React, { useState } from 'react';
import { Wrapper, InfoWrapper, Legend, Info, InfoSet, ModifyBtn, CancelBtn, Input, ButtonWrapper } from './style';
import Select from '../../common/Select';
import { useUser, useUserFns } from '@contexts/userContext';
import { useDevField } from '@contexts/devFieldContext';
import { useToast } from '@hooks/useToast';
import useInput from '@hooks/useInput';
import { patchUpdate } from '@src/apis';
import { INPUT, TOAST_MESSAGE } from '@utils/constant';

interface InfoProps {
  onnClickCancelBtn: React.MouseEventHandler<HTMLButtonElement>;
  setIsModify: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModifyInfoCard = ({ onnClickCancelBtn, setIsModify }: InfoProps): JSX.Element => {
  const user = useUser();
  const { logUserIn } = useUserFns();
  const [nickname, onChangeNickname] = useInput(user.nickname ?? '');
  const [devField, setDevField] = useState(user.devField?.id);
  const devFieldOptions = useDevField();
  const toast = useToast();

  const handleDevFieldSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    setDevField(+(e.target[e.target.selectedIndex] as HTMLOptionElement).value);

  const onClickModifyBtn = async () => {
    if (nickname === user.nickname && user.devField?.id === devField) {
      setIsModify(false);
      return toast('success', TOAST_MESSAGE.nothingChange);
    }
    const originalName = user.nickname ?? '';
    const requestBody = { originalName, nickname, devField: devField === 0 ? user.devField?.id : devField };
    const { data } = await patchUpdate(requestBody);
    if (data) {
      logUserIn(data);
      setIsModify(false);
      return toast('success', TOAST_MESSAGE.updateSuccess);
    }
  };
  return (
    <Wrapper>
      <InfoWrapper>
        <InfoSet>
          <Legend>{`이메일`}</Legend>
          <Info>{user.email}</Info>
        </InfoSet>
        <InfoSet>
          <Legend>{`닉네임`}</Legend>
          <Input type="text" value={nickname} onChange={onChangeNickname} maxLength={INPUT.nicknameMaxLen}></Input>
        </InfoSet>
        <InfoSet>
          <Legend>{`관심 분야`}</Legend>
          <Select name={'개발 필드'} options={devFieldOptions} onChange={handleDevFieldSelectChange} />
        </InfoSet>
      </InfoWrapper>
      <ButtonWrapper>
        <ModifyBtn onClick={onClickModifyBtn}>수정하기</ModifyBtn>
        <CancelBtn onClick={onnClickCancelBtn}>취소</CancelBtn>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default ModifyInfoCard;
