import React from 'react';
import useInput from '../../hooks/useInput';

const Login: React.FC = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="email">Email</label>
        <input type="text" placeholder="Email" id="email" value={email} onChange={onChangeEmail} maxLength={50} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          maxLength={15}
          onChange={onChangePassword}
        />
        <input type="submit" value="제출" />
      </form>
    </div>
  );
};
export default Login;
