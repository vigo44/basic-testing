// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const fakeAxiosClient = {
    get: async () => ({
      data: 'Hello world',
    }),
  } as unknown as AxiosInstance;

  test('should create instance with provided base url', async () => {
    const spyCreate = jest
      .spyOn(axios, 'create')
      .mockReturnValueOnce(fakeAxiosClient);
    await throttledGetDataFromApi('/ids');
    expect(spyCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios, 'create').mockReturnValueOnce(fakeAxiosClient);
    const spyGet = jest.spyOn(fakeAxiosClient, 'get');
    jest.advanceTimersByTime(5000);
    await throttledGetDataFromApi('/ids');
    expect(spyGet).toHaveBeenCalledWith('/ids');
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'create').mockReturnValueOnce(fakeAxiosClient);
    jest.advanceTimersByTime(5000);
    expect(await throttledGetDataFromApi('/ids')).toBe('Hello world');
  });
});
