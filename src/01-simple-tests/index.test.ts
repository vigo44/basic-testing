// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 11, b: 22, action: Action.Add })).toBe(33);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 100, b: 35, action: Action.Subtract })).toBe(
      65,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 19, b: -17, action: Action.Multiply })).toBe(
      -323,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 30, b: 6, action: Action.Divide })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 10, action: Action.Exponentiate })).toBe(
      1024,
    );
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({ a: 100, b: 200, action: ' some_action' }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'arg1', b: 10, action: Action.Add }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: 10, b: null, action: Action.Exponentiate }),
    ).toBeNull();
  });
});
