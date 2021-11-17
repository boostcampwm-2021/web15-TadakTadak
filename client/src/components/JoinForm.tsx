import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import useInput from '@hooks/useInput';
import { postJoin } from '@utils/apis';
import { FaGithub } from 'react-icons/fa';
import InfoMessage from './InfoMessage';

const FORM_WIDTH = 30;
const FORM_HEIGHT = 25;
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
  width: 16rem;
  border-radius: 1rem;
`;

const GithubLoginButton = styled.button`
  ${({ theme }) => theme.flexCenter}
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.paddings.sm};
  width: 16rem;
  border-radius: 1rem;
  & :first-child {
    margin-right: ${({ theme }) => theme.margins.base};
  }
`;

const ModalToggleSpan = styled.span`
  display: block;
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

interface JoinProps {
  onClickModalToggle: React.MouseEventHandler<HTMLButtonElement>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinForm = ({ onClickModalToggle, setIsLogin }: JoinProps): JSX.Element => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [message, setMessage] = useState('');

  const showMessage = (msg: string) => setMessage(msg);

  const onClickGithubJoin = () => {
    // Github Join request
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !nickname || !password) {
      showMessage('모두 입력해주세요');
      return;
    }
    const requestBody = { email, nickname, password };
    const { isOk, errorData } = await postJoin(requestBody);
    if (!isOk) {
      showMessage(errorData?.message ?? '알수 없는 오류가 발생했습니다.');
      return;
    }
    setIsLogin(true);
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
          type="text"
          placeholder="Nickname"
          id="nickname"
          value={nickname}
          onChange={onChangeNickname}
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
        <Button>회원가입</Button>
        <GithubLoginButton onClick={onClickGithubJoin}>
          <FaGithub fill="#fff" />
          Github 회원가입
        </GithubLoginButton>
        {message && <InfoMessage message={message} />}
      </Form>
      <ModalToggleSpan onClick={onClickModalToggle}>로그인 하러 가기</ModalToggleSpan>
    </Container>
  );
};

export default JoinForm;
