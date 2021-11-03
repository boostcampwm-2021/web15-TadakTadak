import React from 'react';
import useInput from '../../hooks/useInput';
import { Container, Form, Input, Button, GithubLoginButton } from './style';
import Modal from '../../components/Modal';

const Login: React.FC = () => {
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
    <Modal title="로그인">
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
      </Container>
    </Modal>
  );
};

export default Login;
