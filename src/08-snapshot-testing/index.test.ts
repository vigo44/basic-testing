// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([1, 3, 5, 2, 4])).toStrictEqual({
      value: 1,
      next: {
        value: 3,
        next: {
          value: 5,
          next: {
            value: 2,
            next: { value: 4, next: { value: null, next: null } },
          },
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([1, 3, 5, 2, 4])).toMatchSnapshot();
  });
});
