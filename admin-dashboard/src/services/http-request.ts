import { ENVS } from '@/constants';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

const fetchData = async <T>(
  path: string,
  options: RequestInit,
): Promise<{ data: T; countItems?: number }> => {
  const response = await fetch(path, options);
  const data = await handleResponse<T>(response);

  return { data };
};

export const getData = async <T>(
  path: string,
  queryParams?: Record<string, string | number | boolean>,
  configOptions?: RequestInit,
): Promise<{ data: T; countItems?: number }> => {
  const params = new URLSearchParams(queryParams as Record<string, string>);

  const url = `${ENVS.API_URL}/${path}?${params}`;

  return fetchData<T>(url, configOptions || {});
};

export const postData = async <T>(
  path: string,
  body: object,
  configOptions?: RequestInit,
): Promise<T> => {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...configOptions,
  };

  return fetchData<T>(`${ENVS.API_URL}${path}`, options).then(
    (res) => res.data,
  );
};

export const putData = async <T>(
  path: string,
  body: object,
  configOptions?: RequestInit,
): Promise<T> => {
  const options: RequestInit = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...configOptions,
  };

  return fetchData<T>(`${ENVS.API_URL}${path}`, options).then(
    (res) => res.data,
  );
};

export const deleteData = async (
  path: string,
  configOptions?: RequestInit,
): Promise<void> => {
  const options: RequestInit = {
    method: 'DELETE',
    ...configOptions,
  };

  await fetch(`${ENVS.API_URL}${path}`, options).then(handleResponse);
};

const api = { getData, postData, putData, deleteData };

export { api };
