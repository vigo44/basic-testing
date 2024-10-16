// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 100, b: 35, action: Action.Subtract, expected: 65 },
  { a: 19, b: -17, action: Action.Multiply, expected: -323 },
  { a: 30, b: 6, action: Action.Divide, expected: 5 },
  { a: 2, b: 10, action: Action.Exponentiate, expected: 1024 },
  { a: 100, b: 200, action: ' some_action', expected: null },
  { a: 'arg1', b: 10, action: Action.Add, expected: null },
  { a: 10, b: null, action: Action.Exponentiate, expected: null },
  // continue cases for other actions
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for result $action ($a $b)',
    ({ a, b, action, expected }) => {
      if (expected === null) {
        expect(simpleCalculator({ a, b, action })).toBeNull();
      } else {
        expect(simpleCalculator({ a, b, action })).toBe(expected);
      }
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
