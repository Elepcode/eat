import { test, expect } from 'bun:test';
import { greet } from './index';

test('greet returns correct message', () => {
  const result = greet('World');
  expect(result).toBe('Hello, World! Welcome to Eat.');
});
