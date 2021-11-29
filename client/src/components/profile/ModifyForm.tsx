import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useUser, useUserFns } from '@contexts/userContext';
import Select from '../common/Select';
import useInput from '@src/hooks/useInput';
import { patchUpdate } from '@src/apis';
import { useDevField } from '@src/contexts/devFieldContext';
import { TOAST_TIME, TOAST_MESSAGE } from '@utils/constant';
import { useToast } from '@src/hooks/useToast';

interface InfoProps {
  onClickModifyToggle: React.MouseEventHandler<HTMLButtonElement>;
  setIsModify: React.Dispatch<React.SetStateAction<boolean>>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 45rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3px;
`;
const Legend = styled.legend`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.bgGreen};
`;

const Info = styled.div`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.bgGreen};
  width: 40rem;
`;

const InfoSet = styled.fieldset`
  ${({ theme }) => css`
    background-color: ${theme.colors.grey};
    padding: ${theme.paddings.lg};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
  `};
`;

const ModifySpan = styled.span`
  ${({ theme }) => theme.flexCenter}
  width:100%;
  background-color: ${({ theme }) => theme.colors.green};
  padding: ${({ theme }) => theme.paddings.sm};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CancelSpan = styled.span`
  ${({ theme }) => theme.flexCenter}
  width:100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.paddings.sm};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Input = styled.input`
  font-size: 5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ModifyForm = ({ onClickModifyToggle, setIsModify }: InfoProps): JSX.Element => {
  const user = useUser();
  const { logUserIn } = useUserFns();
  const [nickname, onChangeNickname] = useInput(user.nickname ?? '');
  const [devField, setDevField] = useState(user.devField?.id);
  const devFieldOptions = useDevField();
  const toast = useToast(TOAST_TIME);

  const handleDevFieldSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    setDevField(+(e.target[e.target.selectedIndex] as HTMLOptionElement).value);

  const onSubmit = async () => {
    if (nickname === user.nickname && user.devField?.id === devField) {
      setIsModify(false);
      toast('success', TOAST_MESSAGE.nothingChange);
      return;
    }

    const originalName = user.nickname ?? '';
    const requestBody = { originalName, nickname, devField: devField === 0 ? user.devField?.id : devField };

    const { data } = await patchUpdate(requestBody);
    if (data) {
      logUserIn(data);
      setIsModify(false);
      toast('success', TOAST_MESSAGE.updateSuccess);
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
          <Input type="text" value={nickname} onChange={onChangeNickname}></Input>
        </InfoSet>

        <InfoSet>
          <Legend>{`관심 분야`}</Legend>
          <Select name={'개발 필드'} options={devFieldOptions} onChange={handleDevFieldSelectChange} />
        </InfoSet>
      </InfoWrapper>
      <ButtonWrapper>
        <ModifySpan onClick={onSubmit}>수정하기</ModifySpan>
        <CancelSpan onClick={onClickModifyToggle}>취소</CancelSpan>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default ModifyForm;
