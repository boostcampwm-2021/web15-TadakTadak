export const isEmail = (email: string): boolean => {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regExp.test(email);
};

export const isNickname = (nickname: string): boolean => {
  const regExp = /^(?=.*[a-zA-Z가-힣])[-a-zA-Z가-힣0-9_.]{2,10}$/;
  return regExp.test(nickname);
};

export const isPassword = (password: string): boolean => {
  const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
  return regExp.test(password);
};
