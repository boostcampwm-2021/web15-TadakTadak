import React from 'react';
import useInput from '../../hooks/useInput';
import { Container, Title, Form, Input, Button } from './style';

const Login: React.FC = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    // Login request
  };

  return (
    <Container>
      <Title>로그인 화면</Title>
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
    </Container>
  );
};
export default Login;
