import { ENVS } from '@/constants';

// Components
import { getData, postData, putData, deleteData } from '..';

global.fetch = jest.fn();

describe('API functions', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should fetch data with query params', async () => {
    const mockResponse = { data: { id: 1, name: 'Test' } };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse.data,
    });

    const result = await getData('test-path', { q: 'test' });

    expect(fetch).toHaveBeenCalledWith(`${ENVS.API_URL}/test-path?q=test`, {});
    expect(result).toEqual(mockResponse);
  });

  it('should fetch data with query params env user', async () => {
    const mockResponse = { data: { id: 1, name: 'Test' } };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse.data,
    });

    const result = await getData('users', { q: 'test' });

    expect(fetch).toHaveBeenCalledWith(`${ENVS.API_AUTH_URL}/users?q=test`, {});
    expect(result).toEqual(mockResponse);
  });

  it('should post data and return the response', async () => {
    const mockResponse = { data: { id: 1, name: 'Test' } };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse.data,
    });

    const result = await postData('test-path', { name: 'Test' });

    expect(fetch).toHaveBeenCalledWith(`${ENVS.API_URL}/test-path`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test' }),
    });
    expect(result).toEqual(mockResponse.data);
  });

  it('should post data and return the response env user', async () => {
    const mockResponse = { data: { id: 1, name: 'Test' } };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse.data,
    });

    const result = await postData('users', { name: 'Test' });

    expect(fetch).toHaveBeenCalledWith(`${ENVS.API_AUTH_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test' }),
    });
    expect(result).toEqual(mockResponse.data);
  });

  it('should put data and return the response', async () => {
    const mockResponse = { data: { id: 1, name: 'Test Updated' } };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse.data,
    });

    const result = await putData('/test-path', { name: 'Test Updated' });

    expect(fetch).toHaveBeenCalledWith(`${ENVS.API_URL}/test-path`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test Updated' }),
    });
    expect(result).toEqual(mockResponse.data);
  });

  it('should put data and return the response env user', async () => {
    const mockResponse = { data: { id: 1, name: 'Test Updated' } };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse.data,
    });

    const result = await putData('users', { name: 'Test Updated' });

    expect(fetch).toHaveBeenCalledWith(`${ENVS.API_AUTH_URL}users`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test Updated' }),
    });
    expect(result).toEqual(mockResponse.data);
  });

  it('should delete data', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => {},
    });

    await deleteData('/test-path');

    expect(fetch).toHaveBeenCalledWith(`${ENVS.API_URL}/test-path`, {
      method: 'DELETE',
    });
  });

  it('should delete data env user', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => {},
    });

    await deleteData('users');

    expect(fetch).toHaveBeenCalledWith(`${ENVS.API_AUTH_URL}users`, {
      method: 'DELETE',
    });
  });

  it('should throw an error for non-OK responses', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: 'Unauthorized',
    });

    await expect(deleteData('test-path')).rejects.toThrow(
      'Error: Unauthorized',
    );
  });
});
