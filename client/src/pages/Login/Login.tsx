/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import useInput from '../../hooks/useInput';
import {
  Container,
  Title,
  Form,
  Input,
  Button,
  GithubLoginButton,
  ModalContainer,
  ModalBackground,
  ModalWrapper,
} from './style';

const Login: React.FC = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [modal, setModal] = useState(true);

  const onClickModalBackground = () => setModal(false);

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
    <>
      {modal ? (
        <ModalContainer>
          <ModalBackground onClick={onClickModalBackground}>
            <ModalWrapper onClick={(e) => e.stopPropagation()}>
              <Container>
                <Title>로그인</Title>
                <Form onSubmit={onSubmitForm}>
                  <Input
                    type="text"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={onChangeEmail}
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
                  <Button>로그인</Button>
                </Form>
                <GithubLoginButton onClick={onClickGithubLogin}>Github 로그인</GithubLoginButton>
              </Container>
            </ModalWrapper>
          </ModalBackground>
        </ModalContainer>
      ) : (
        <div>로그아웃 모달 제거</div>
      )}
    </>
  );
};

export default Login;
