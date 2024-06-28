import axios, { AxiosRequestConfig } from 'axios';

// Constants
import { ENVS } from '@/constants';

// Fetches data from the URL using a GET request.
const getData = async <T>(
  url: string,
  params: AxiosRequestConfig,
): Promise<T> => {
  const response = await axios.get(`${ENVS.API_URL}/${url}`, { ...params });

  return response.data;
};

// Sends a POST request to URL with data provided as an argument.
const postData = async <T>(url: string, { arg }: { arg: T }): Promise<T> => {
  const response = await axios.post<T>(`${ENVS.API_URL}/${url}`, arg);

  return response.data;
};

// Sends a PUT request to the URL with data provided as an argument.
const putData = async <T>(url: string, { arg }: { arg: T }): Promise<T> => {
  const response = await axios.put<T>(`${ENVS.API_URL}/${url}`, arg);

  return response.data;
};

// Sends a DELETE request to the URL
const deleteData = async <T>(url: string): Promise<T> => {
  const response = await axios.delete<T>(`${ENVS.API_URL}/${url}`);

  return response.data;
};

const api = { getData, postData, putData, deleteData };

export { api };
