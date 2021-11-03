import React from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.paddings.sm};
  width: 16rem;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 1rem;
`;

const GithubLoginButton = styled.button`
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

const LoginButton = styled.button`
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

interface JoinProps {
  onClickModalToggle: React.MouseEventHandler<HTMLButtonElement>;
}

const JoinForm: React.FC<JoinProps> = ({ onClickModalToggle }) => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onClickGithubJoin = () => {
    // Github Join request
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !nickname || !password) {
      return;
    }
    // Join request
  };

  return (
    <Container>
      <Form onSubmit={onSubmitForm}>
        <Input type="text" placeholder="Email" id="email" value={email} onChange={onChangeEmail} maxLength={50} />
        <Input
          type="text"
          placeholder="Nickname"
          id="nickname"
          value={nickname}
          onChange={onChangeNickname}
          maxLength={50}
        />
        <Input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          maxLength={15}
          onChange={onChangePassword}
        />
        <Button>회원가입</Button>
      </Form>
      <GithubLoginButton onClick={onClickGithubJoin}>Github 회원가입</GithubLoginButton>
      <LoginButton onClick={onClickModalToggle}>로그인하기</LoginButton>
    </Container>
  );
};

export default JoinForm;
