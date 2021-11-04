import React, { useState } from 'react';
import Modal from '../../components/Modal';
import JoinForm from '../../components/JoinForm';
import LoginForm from '../../components/LoginForm';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const onClickModalToggle = () => setIsLogin(!isLogin);

  return (
    <Modal title={isLogin ? '로그인' : '회원가입'}>
      {isLogin ? (
        <LoginForm onClickModalToggle={onClickModalToggle} />
      ) : (
        <JoinForm onClickModalToggle={onClickModalToggle} />
      )}
    </Modal>
  );
};

export default Login;
