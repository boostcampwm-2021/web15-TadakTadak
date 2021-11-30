export type BodyType = {
  [key: string]: string | number | null;
};

export function simpleOptions(method: string): RequestInit {
  return {
    method,
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  };
}

export function getOptions(): RequestInit {
  return simpleOptions('GET');
}

export function postOptions(body: BodyType): RequestInit {
  return Object.keys(body).length
    ? {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      }
    : simpleOptions('POST');
}

export function patchOptions(body: BodyType): RequestInit {
  return Object.keys(body).length
    ? {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      }
    : simpleOptions('PATCH');
}

export function deleteOptions(): RequestInit {
  return simpleOptions('DELETE');
}
