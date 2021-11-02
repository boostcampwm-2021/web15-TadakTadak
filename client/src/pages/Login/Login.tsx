import React, { useState } from 'react';

const Login: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setPassword(e.target.value);

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
