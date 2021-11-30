import React from 'react';
import { Container, Input, Button, ModalToggleSpan } from './style';
import Form from '@src/components/form/Form';
import { useUserFns } from '@contexts/userContext';
import { useToast } from '@src/hooks/useToast';
import useInput from '@hooks/useInput';
import { postLogin } from '@src/apis';
import { INPUT, TOAST_MESSAGE, PLACEHOLDER_TXT } from '@utils/constant';
import { isEmail, isPassword } from '@utils/utils';
import { FORM } from '@utils/styleConstant';

interface LoginProps {
  onClickModalToggle: React.MouseEventHandler<HTMLButtonElement>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ onClickModalToggle, setModal }: LoginProps): JSX.Element => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { logUserIn } = useUserFns();
  const toast = useToast();

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return toast('error', TOAST_MESSAGE.inputEmpty);
    if (!isEmail(email)) return toast('error', TOAST_MESSAGE.invalidFormatEmail);
    if (!isPassword(password)) return toast('error', TOAST_MESSAGE.invalidFormatPwd);
    const requestBody = { email, password };
    const { isOk, data } = await postLogin(requestBody);
    if (isOk && data) {
      logUserIn(data);
      setModal(false);
      return toast('success', TOAST_MESSAGE.loginSuccess);
    }
    toast('error', TOAST_MESSAGE.loginConfirm);
  };

  return (
    <Container>
      <Form onSubmit={onSubmitForm} width={FORM.loginWidth} height={FORM.loginHeight}>
        <Input
          type="text"
          placeholder={PLACEHOLDER_TXT.email}
          value={email}
          onChange={onChangeEmail}
          maxLength={INPUT.emailMaxLen}
        />
        <Input
          type="password"
          placeholder={PLACEHOLDER_TXT.password}
          value={password}
          minLength={INPUT.pwdMinLen}
          maxLength={INPUT.pwdMaxLen}
          onChange={onChangePassword}
        />
        <Button>로그인</Button>
      </Form>
      <ModalToggleSpan onClick={onClickModalToggle}>회원가입 하러 가기</ModalToggleSpan>
    </Container>
  );
};

export default LoginForm;
