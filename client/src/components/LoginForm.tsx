import React from 'react';
import styled from 'styled-components';
import useInput from '@hooks/useInput';
import { postLogin } from '@utils/apis';
import { useUserFns } from '@contexts/userContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const Button = styled.button`
  ${({ theme }) => theme.flexCenter}
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.paddings.sm};
  width: 16rem;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 1rem;
`;

const GithubLoginButton = styled.button`
  ${({ theme }) => theme.flexCenter}
  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => theme.paddings.sm};
  width: 16rem;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 1rem;
`;

const ModalToggleSpan = styled.span`
  margin-top: ${({ theme }) => theme.margins.lg};
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface LoginProps {
  onClickModalToggle: React.MouseEventHandler<HTMLButtonElement>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginProps> = ({ onClickModalToggle, setModal }) => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const logUserIn = useUserFns();

  const onClickGithubLogin = () => {
    // Github Login request
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    const { status, data } = await postLogin(email, password);
    if (status === 201) {
      logUserIn(data);
      setModal(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmitForm}>
        <Input type="text" placeholder="Email" id="email" value={email} onChange={onChangeEmail} maxLength={50} />
        <Input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          maxLength={15}
          onChange={onChangePassword}
        />
        <Button>로그인</Button>
      </Form>
      <GithubLoginButton onClick={onClickGithubLogin}>Github 로그인</GithubLoginButton>
      <ModalToggleSpan onClick={onClickModalToggle}>회원가입 하러 가기</ModalToggleSpan>
    </Container>
  );
};

export default LoginForm;
