export const postJoin = async (email: string, nickname: string, password: string) => {
  const response = await fetch('/api/auth/join', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, nickname, password }),
  });
  if (response.ok) {
    return true;
  }
  return false;
};

export const postLogin = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const { status } = response;
  let data;
  if (response.ok) {
    data = await response.json();
  }
  console.log(status, data);
  return { status, data };
};
