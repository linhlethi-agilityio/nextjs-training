import { ENVS } from '@/constants';
import { deleteData, getData, postData, putData } from '..';

describe.skip('API functions', () => {
  const mockResponseData = { id: 1, name: 'John Doe' };
  const mockPath = 'example';
  const mockOptions = { headers: { Authorization: 'Bearer token' } };

  beforeEach(() => {
    // Mocking fetch for all tests
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponseData),
    } as Response);
  });

  afterEach(() => {
    // Restore fetch after each test
    jest.restoreAllMocks();
  });

  it('getData should fetch data from the API', async () => {
    const result = await getData(mockPath, {}, mockOptions);
    const expectedUrl = `${ENVS.API_URL}/${mockPath}?`;

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      ...mockOptions,
    });
    expect(result.data).toEqual(mockResponseData);
  });

  it('postData should post data to the API', async () => {
    const mockBody = { username: 'john_doe', password: 'password' };

    const result = await postData(mockPath, mockBody, mockOptions);
    const expectedUrl = `${ENVS.API_URL}/${mockPath}`;

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      body: JSON.stringify(mockBody),
      ...mockOptions,
    });
    expect(result).toEqual(mockResponseData);
  });

  it('putData should put data to the API', async () => {
    const mockBody = { id: 1, name: 'Updated John Doe' };

    const result = await putData(mockPath, mockBody, mockOptions);
    const expectedUrl = `${ENVS.API_URL}${mockPath}`;

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'PUT',
      body: JSON.stringify(mockBody),
      ...mockOptions,
    });
    expect(result).toEqual(mockResponseData);
  });

  it('deleteData should delete data from the API', async () => {
    await deleteData(mockPath, mockOptions);
    const expectedUrl = `${ENVS.API_URL}${mockPath}`;

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'DELETE',
      ...mockOptions,
    });
  });
});
