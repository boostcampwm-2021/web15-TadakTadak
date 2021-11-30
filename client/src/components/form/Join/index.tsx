import React, { useState } from 'react';
import { Container, Input, Button, ModalToggleSpan } from './style';
import Select from '@components/common/Select';
import Form from '../Form';
import { useDevField } from '@contexts/devFieldContext';
import { useToast } from '@src/hooks/useToast';
import useInput from '@hooks/useInput';
import { postJoin } from '@src/apis';
import { INPUT, TOAST_MESSAGE, PLACEHOLDER_TXT, SELECT_TEXT } from '@utils/constant';
import { isEmail, isPassword, isNickname } from '@utils/utils';
import { FORM } from '@utils/styleConstant';

interface JoinProps {
  onClickModalToggle: React.MouseEventHandler<HTMLButtonElement>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinForm = ({ onClickModalToggle, setIsLogin }: JoinProps): JSX.Element => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [devField, setDevField] = useState('');
  const devFieldOptions = useDevField();
  const toast = useToast();

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !nickname || !password) {
      return toast('error', TOAST_MESSAGE.inputEmpty);
    }
    if (!isEmail(email)) {
      toast('error', TOAST_MESSAGE.invalidFormatEmail);
      return;
    }
    if (!isNickname(nickname)) {
      toast('error', TOAST_MESSAGE.invalidFormatNickname);
      return;
    }
    if (!isPassword(password)) {
      toast('error', TOAST_MESSAGE.invalidFormatPwd);
      return;
    }
    if (!devField) {
      toast('error', TOAST_MESSAGE.emptyDevField);
      return;
    }
    const requestBody = { email, nickname, password, devField: +devField };
    const { isOk } = await postJoin(requestBody);
    if (!isOk) {
      return toast('error', TOAST_MESSAGE.alreadyEmail);
    }
    setIsLogin(true);
    toast('success', TOAST_MESSAGE.joinSuccess);
  };

  const handleDevFieldSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    setDevField((e.target[e.target.selectedIndex] as HTMLOptionElement).value);

  return (
    <Container>
      <Form onSubmit={onSubmitForm} width={FORM.joinWidth} height={FORM.joinHeight}>
        <Input
          type="text"
          placeholder={PLACEHOLDER_TXT.email}
          value={email}
          onChange={onChangeEmail}
          maxLength={INPUT.emailMaxLen}
          autoComplete="new-password"
        />
        <Input
          type="text"
          placeholder={PLACEHOLDER_TXT.nickname}
          value={nickname}
          onChange={onChangeNickname}
          maxLength={INPUT.nicknameMaxLen}
          autoComplete="new-password"
        />
        <Input
          type="password"
          placeholder={PLACEHOLDER_TXT.password}
          value={password}
          minLength={INPUT.pwdMinLen}
          maxLength={INPUT.pwdMaxLen}
          onChange={onChangePassword}
        />
        <Select name={SELECT_TEXT.devField} options={devFieldOptions} onChange={handleDevFieldSelectChange} />
        <Button>회원가입</Button>
      </Form>
      <ModalToggleSpan onClick={onClickModalToggle}>로그인 하러 가기</ModalToggleSpan>
    </Container>
  );
};

export default JoinForm;
