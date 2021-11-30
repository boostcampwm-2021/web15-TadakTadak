import { HTTPResponse } from '@src/types';
import { getOptions, postOptions, patchOptions, deleteOptions, BodyType } from './options';
import fetcher from './fetcher';
import { getUrl } from './apiUtils';

export async function fetchGet<T>(url: string, query?: string): Promise<HTTPResponse<T>> {
  const requestUrl = getUrl(`${url}?${query}`);
  const response = await fetcher<T>(requestUrl, getOptions());
  return response;
}

export async function fetchPost<T>(url: string, body: BodyType = {}): Promise<HTTPResponse<T>> {
  const requestUrl = getUrl(url);
  const response = await fetcher<T>(requestUrl, postOptions(body));
  return response;
}

export async function fetchPatch<T>(url: string, body: BodyType = {}): Promise<HTTPResponse<T>> {
  const requestUrl = getUrl(url);
  const response = await fetcher<T>(requestUrl, patchOptions(body));
  return response;
}

export function fetchDelete(url: string): void {
  const requestUrl = getUrl(url);
  fetcher(requestUrl, deleteOptions());
}

export async function fetchDeleteImage<T>(url: string): Promise<HTTPResponse<T>> {
  const requestUrl = getUrl(url);
  const response = await fetcher<T>(requestUrl, deleteOptions());
  return response;
}
