import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: any): void => cookies.set(name, value, { ...option });
export const getCookie = (name: string): Cookies => cookies.get(name);
