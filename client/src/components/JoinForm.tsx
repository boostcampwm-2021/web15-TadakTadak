import React, { useState } from 'react';
import styled from 'styled-components';
import useInput from '@hooks/useInput';
import { postJoin } from '@src/apis';
import Select from './common/Select';
import Form from './common/Form';
import { useDevField } from '@contexts/devFieldContext';
import { INPUT, TOAST_TIME } from '@utils/constant';
import { FORM } from '@utils/styleConstant';
import { useToast } from '@src/hooks/useToast';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${FORM.joinWidth};
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
  const [devField, setDevField] = useState('');
  const devFieldOptions = useDevField();
  const toast = useToast(TOAST_TIME);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !nickname || !password || !devField) {
      return toast('error', '모두 입력해주세요.');
    }
    const requestBody = { email, nickname, password, devField: +devField };
    const { isOk } = await postJoin(requestBody);
    if (!isOk) {
      return toast('error', '이미 등록되어 있는 이메일입니다.');
    }
    setIsLogin(true);
    toast('success', '회원가입에 성공하였습니다.');
  };

  const handleDevFieldSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    setDevField((e.target[e.target.selectedIndex] as HTMLOptionElement).value);

  return (
    <Container>
      <Form onSubmit={onSubmitForm} width={FORM.joinWidth} height={FORM.joinHeight}>
        <Input
          type="text"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChangeEmail}
          maxLength={INPUT.emailMaxLen}
          autoComplete="new-password"
        />
        <Input
          type="text"
          placeholder="Nickname"
          id="nickname"
          value={nickname}
          onChange={onChangeNickname}
          maxLength={INPUT.nicknameMaxLen}
          autoComplete="new-password"
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
        <Select name={'개발 필드'} options={devFieldOptions} onChange={handleDevFieldSelectChange} />
        <Button>회원가입</Button>
      </Form>
      <ModalToggleSpan onClick={onClickModalToggle}>로그인 하러 가기</ModalToggleSpan>
    </Container>
  );
};

export default JoinForm;
