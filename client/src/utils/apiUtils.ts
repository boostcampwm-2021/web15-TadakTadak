import 'dotenv/config';

const baseUrl = process.env.REACT_APP_SERVER_URL ?? '';

type BodyType = {
  [key: string]: string | number | null;
};

export interface HTTPResponse<T> {
  isOk: boolean;
  errorData?: {
    message: string;
    statusCode: number;
  };
  data?: T;
}

function getUrl(url: string): string {
  return baseUrl + url;
}

export function queryObjToString<T>(queryObj: T): string {
  return Object.entries(queryObj)
    .map((e) => e.join('='))
    .join('&');
}

function getOptions(): RequestInit {
  return {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  };
}

function postOptions(body: BodyType): RequestInit {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  };
}

export async function fetcher<T>(url: string, options: RequestInit): Promise<HTTPResponse<T>> {
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

export async function fetchGet<T>(url: string, query?: string): Promise<HTTPResponse<T>> {
  const requestUrl = getUrl(`${url}?${query}`);
  const response = await fetcher<T>(requestUrl, getOptions());
  return response;
}

export async function fetchPost<T>(url: string, body: BodyType): Promise<HTTPResponse<T>> {
  const requestUrl = getUrl(`${url}`);
  const response = await fetcher<T>(requestUrl, postOptions(body));
  return response;
}
