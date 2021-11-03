import React from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.paddings.sm};
  width: 16rem;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 1rem;
`;

export const GithubLoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => theme.paddings.sm};
  width: 16rem;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 1rem;
`;

export const JoinButton = styled.button`
  margin-top: ${({ theme }) => theme.margins.lg};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => theme.paddings.sm};
  width: 16rem;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 1rem;
`;

interface LoginProps {
  onClickModalToggle: React.MouseEventHandler<HTMLButtonElement>;
}

const LoginForm: React.FC<LoginProps> = ({ onClickModalToggle }) => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onClickGithubLogin = () => {
    // Github Login request
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    // Login request
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
      <JoinButton onClick={onClickModalToggle}>가입하기</JoinButton>
    </Container>
  );
};

export default LoginForm;
