import React, { useState } from 'react';
import Modal from './Modal';
import JoinForm from './JoinForm';
import LoginForm from './LoginForm';

interface LoginProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ modal, setModal }) => {
  const [isLogin, setIsLogin] = useState(true);
  const onClickModalToggle = () => setIsLogin(!isLogin);
  return (
    <>
      {modal && (
        <Modal title={isLogin ? '로그인' : '회원가입'} setModal={setModal}>
          {isLogin ? (
            <LoginForm onClickModalToggle={onClickModalToggle} />
          ) : (
            <JoinForm onClickModalToggle={onClickModalToggle} />
          )}
        </Modal>
      )}
    </>
  );
};

export default Login;
