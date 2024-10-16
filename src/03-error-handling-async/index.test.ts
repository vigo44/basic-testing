// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue(44)).toBe(44);
    expect(await resolveValue(null)).toBeNull();
    const obj = { key: 'value' };
    expect(await resolveValue(obj)).toBe(obj);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('text_error')).toThrow(new Error('text_error'));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
  });
});
