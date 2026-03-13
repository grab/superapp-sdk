/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { describe, expect, it } from 'vitest';

import { isErrorWithMessage } from './error';

describe('isErrorWithMessage', () => {
  it.each([
    { description: 'Error instance', value: new Error('test') },
    { description: 'TypeError instance', value: new TypeError('test') },
    { description: 'plain object with string message', value: { message: 'test' } },
  ])('should return true for $description', ({ value }) => {
    expect(isErrorWithMessage(value)).toBe(true);
  });

  it.each([
    { description: 'string', value: 'plain string' },
    { description: 'number', value: 404 },
    { description: 'boolean', value: true },
    { description: 'null', value: null },
    { description: 'undefined', value: undefined },
    { description: 'object without message', value: { foo: 'bar' } },
    { description: 'object with non-string message', value: { message: 123 } },
  ])('should return false for $description', ({ value }) => {
    expect(isErrorWithMessage(value)).toBe(false);
  });

  it('should narrow type when used in if statement', () => {
    const error: unknown = new Error('Test message');

    if (isErrorWithMessage(error)) {
      expect(error.message).toBe('Test message'); // TypeScript knows this is safe
    } else {
      throw new Error('Expected type guard to narrow correctly');
    }
  });
});
