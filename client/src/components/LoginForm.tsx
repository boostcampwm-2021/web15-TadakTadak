import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import useInput from '@hooks/useInput';
import { postLogin } from '@utils/apis';
import { useUserFns } from '@contexts/userContext';
import { FaGithub } from 'react-icons/fa';
import InfoMessage from './InfoMessage';

const FORM_WIDTH = 30;
const FORM_HEIGHT = 20;
const DELAY = 3;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${FORM_WIDTH}rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-evenly;
  width: ${FORM_WIDTH}rem;
  height: ${FORM_HEIGHT}rem;
  ${({ theme }) => css`
    background-color: ${theme.colors.grey};
    padding: ${theme.paddings.lg};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
  `};
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

const GithubLoginButton = styled.button`
  ${({ theme }) => theme.flexCenter}
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.paddings.sm};
  border-radius: 1rem;
  & :first-child {
    margin-right: ${({ theme }) => theme.margins.base};
  }
`;

const ModalToggleSpan = styled.span`
  width: 100%;
  padding: ${({ theme }) => theme.paddings.lg};
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

const LoginForm: React.FC<LoginProps> = ({ onClickModalToggle, setModal }) => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { logUserIn } = useUserFns();
  const [message, setMessage] = useState('');

  const showMessage = (msg: string) => setMessage(msg);
  const onClickGithubLogin = () => {
    // Github Login request
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      showMessage('모두 입력해주세요');
      return;
    }
    const { isOk, data } = await postLogin(email, password);
    if (isOk && data) {
      logUserIn(data);
      setModal(false);
      return;
    }
    showMessage('이메일 및 비밀번호를 확인해주세요');
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), DELAY * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  return (
    <Container>
      <Form onSubmit={onSubmitForm}>
        <Input
          type="text"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChangeEmail}
          maxLength={50}
          autoComplete="new-password"
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
        <GithubLoginButton onClick={onClickGithubLogin}>
          <FaGithub fill="#fff" />
          Github 로그인
        </GithubLoginButton>
        {message && <InfoMessage message={message} />}
      </Form>
      <ModalToggleSpan onClick={onClickModalToggle}>회원가입 하러 가기</ModalToggleSpan>
    </Container>
  );
};

export default LoginForm;
