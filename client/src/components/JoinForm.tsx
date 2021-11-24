import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useInput from '@hooks/useInput';
import { postJoin } from '@src/apis';
import { FaGithub } from 'react-icons/fa';
import InfoMessage from './InfoMessage';
import Select from './common/Select';
import Form from './common/Form';
import { useDevField } from '@contexts/devFieldContext';
import { FORM, INPUT } from '@utils/constant';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${FORM.JOIN_WIDTH}rem;
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
  const [devField, setDevField] = useState('');
  const devFieldOptions = useDevField();

  const showMessage = (msg: string) => setMessage(msg);

  const onClickGithubJoin = () => {
    // Github Join request
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !nickname || !password || !devField) {
      return showMessage('모두 입력해주세요');
    }
    const requestBody = { email, nickname, password, devField: +devField };
    const isOk = await postJoin(requestBody);
    if (!isOk) {
      return showMessage('이미 등록되어 있는 이메일입니다.');
    }
    setIsLogin(true);
  };

  const handleDevFieldSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    setDevField((e.target[e.target.selectedIndex] as HTMLOptionElement).value);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), FORM.DELAY * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  return (
    <Container>
      <Form onSubmit={onSubmitForm} width={FORM.JOIN_WIDTH} height={FORM.JOIN_HEIGHT}>
        <Input
          type="text"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChangeEmail}
          maxLength={INPUT.EMAIL_MAX_LENGTH}
          autoComplete="new-password"
        />
        <Input
          type="text"
          placeholder="Nickname"
          id="nickname"
          value={nickname}
          onChange={onChangeNickname}
          maxLength={INPUT.NICKNAME_MAX_LENGTH}
          autoComplete="new-password"
        />
        <Input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          minLength={INPUT.PASSWORD_MIN_LENGTH}
          maxLength={INPUT.PASSWORD_MAX_LENGTH}
          onChange={onChangePassword}
        />
        <Select name={'개발 필드'} options={devFieldOptions} onChange={handleDevFieldSelectChange} />
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
