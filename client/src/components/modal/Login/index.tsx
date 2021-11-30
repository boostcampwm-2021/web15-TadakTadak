import React, { useState } from 'react';
import LoginForm from '@components/form/Login';
import JoinForm from '@components/form/Join';
import Modal from '@components/modal/Modal';
import { MODAL_NAME } from '@utils/constant';

interface LoginProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ modal, setModal }: LoginProps): JSX.Element => {
  const [isLogin, setIsLogin] = useState(true);
  const onClickModalToggle = () => setIsLogin(!isLogin);

  return (
    <>
      {modal && (
        <Modal title={isLogin ? MODAL_NAME.login : MODAL_NAME.join} setModal={setModal}>
          {isLogin ? (
            <LoginForm onClickModalToggle={onClickModalToggle} setModal={setModal} />
          ) : (
            <JoinForm onClickModalToggle={onClickModalToggle} setIsLogin={setIsLogin} />
          )}
        </Modal>
      )}
    </>
  );
};

export default Login;
