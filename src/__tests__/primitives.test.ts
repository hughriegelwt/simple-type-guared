import unknownMatchesTemplate from '../';

interface ObjectType<T> {
  test: T;
}

describe('primitive type tests', () => {
  test('type guard recognizes object with string key/value - truthy', () => {
    const result = unknownMatchesTemplate<ObjectType<string>>(
      { test: 'hello' },
      {
        test: 'string',
      }
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes object with string key/value - falsy', () => {
    const result = unknownMatchesTemplate<ObjectType<string>>(
      { test: true },
      {
        test: 'string',
      }
    );
    expect(result).toBe(false);
  });

  test('type guard recognizes object with number key/value - truthy', () => {
    const result = unknownMatchesTemplate<ObjectType<number>>(
      { test: 4 },
      {
        test: 'number',
      }
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes object with string key/value - falsy', () => {
    const result = unknownMatchesTemplate<ObjectType<number>>(
      { test: true },
      {
        test: 'number',
      }
    );
    expect(result).toBe(false);
  });

  test('type guard recognizes object with numbooleanber key/value - truthy', () => {
    const result = unknownMatchesTemplate<ObjectType<boolean>>(
      { test: true },
      {
        test: 'boolean',
      }
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes object with boolean key/value - falsy', () => {
    const result = unknownMatchesTemplate<ObjectType<boolean>>(
      { test: 'true' },
      {
        test: 'boolean',
      }
    );
    expect(result).toBe(false);
  });
});
