import { HTTPResponse } from '@src/types';

export default async function fetcher<T>(url: string, options: RequestInit): Promise<HTTPResponse<T>> {
  try {
    const response = await fetch(url, options);
    const { statusCode, data, message } = await response.json();
    if (response.ok) {
      const res = { isOk: true, data };
      return res;
    }
    return {
      isOk: false,
      errorData: {
        message,
        statusCode,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return {
      isOk: false,
      errorData: {
        message: e.message,
        statusCode: e.statusCode,
      },
    };
  }
}
