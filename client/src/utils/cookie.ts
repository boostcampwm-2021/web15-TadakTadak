import { Cookies } from 'react-cookie';

type CookieOption = {
  [Key: string]: string;
};

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: CookieOption): void =>
  cookies.set(name, value, { ...option });
export const getCookie = (name: string): Cookies => cookies.get(name);
