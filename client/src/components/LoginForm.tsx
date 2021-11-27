import React from 'react';
import styled from 'styled-components';
import { postLogin } from '@src/apis';
import { TOAST_TIME, INPUT, TOAST_MESSAGE } from '@utils/constant';
import { FORM } from '@utils/styleConstant';
import Form from './common/Form';
import useInput from '@hooks/useInput';
import { useUserFns } from '@contexts/userContext';
import { useToast } from '@src/hooks/useToast';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${FORM.loginWidth}rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 20%;
`;

const Input = styled.input`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const Button = styled.button`
  ${({ theme }) => theme.flexCenter}
  background-color: ${({ theme }) => theme.colors.green};
  padding: ${({ theme }) => theme.paddings.sm};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
`;

const ModalToggleSpan = styled.span`
  width: 100%;
  margin-top: ${({ theme }) => theme.margins.lg};
  color: ${({ theme }) => theme.colors.blue};
  text-align: center;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface LoginProps {
  onClickModalToggle: React.MouseEventHandler<HTMLButtonElement>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ onClickModalToggle, setModal }: LoginProps): JSX.Element => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { logUserIn } = useUserFns();
  const toast = useToast(TOAST_TIME);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast('error', TOAST_MESSAGE.inputEmpty);
      return;
    }
    const requestBody = { email, password };
    const { isOk, data } = await postLogin(requestBody);
    if (isOk && data) {
      logUserIn(data);
      setModal(false);
      toast('success', TOAST_MESSAGE.loginSuccess);
      return;
    }
    toast('error', TOAST_MESSAGE.loginConfirm);
  };

  return (
    <Container>
      <Form onSubmit={onSubmitForm} width={FORM.loginWidth} height={FORM.loginHeight}>
        <Input
          type="text"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChangeEmail}
          maxLength={INPUT.emailMaxLen}
        />
        <Input
          type="password"
          placeholder="Password"
          id="password"
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
