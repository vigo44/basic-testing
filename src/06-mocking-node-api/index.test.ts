import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 5000);
    expect(setTimeout).toHaveBeenCalledWith(callback, 5000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 5000);
    jest.advanceTimersByTime(4999);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 5000);
    expect(setInterval).toHaveBeenCalledWith(callback, 5000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 5000);
    jest.advanceTimersByTime(4999);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(4999);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  jest.mock('fs');
  jest.mock('fs/promises');

  test('should call join with pathToFile', async () => {
    const pathSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('./text.txt');
    expect(pathSpy).toBeCalledWith(__dirname, './text.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    expect(await readFileAsynchronously('./text.txt')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValueOnce(Buffer.from('Hello world'));
    expect(await readFileAsynchronously('./text.txt')).toBe('Hello world');
  });
});
