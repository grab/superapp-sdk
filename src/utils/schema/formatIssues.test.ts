/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';
import { describe, expect, it } from 'vitest';

import { formatIssues } from './formatIssues';

function getIssues(schema: v.GenericSchema, value: unknown) {
  const result = v.safeParse(schema, value);
  if (result.success) throw new Error('Expected parse to fail');
  return result.issues;
}

describe('formatIssues', () => {
  it('should include path and message for a primitive mismatch', () => {
    const schema = v.object({ status_code: v.number() });
    const issues = getIssues(schema, { status_code: 'wrong' });
    expect(formatIssues(issues)).toBe(
      'status_code: Invalid type: Expected number but received "wrong"'
    );
  });

  it('should format issue with no path', () => {
    const schema = v.number();
    const issues = getIssues(schema, 'wrong');
    expect(formatIssues(issues)).toBe('Invalid type: Expected number but received "wrong"');
  });

  it('should join multiple issues with comma', () => {
    const schema = v.object({ a: v.number(), b: v.string() });
    const issues = getIssues(schema, { a: 'x', b: 123 });
    expect(formatIssues(issues)).toBe(
      'a: Invalid type: Expected number but received "x", b: Invalid type: Expected string but received 123'
    );
  });

  it('should include Invalid key prefix', () => {
    const schema = v.object({ status_code: v.number() });
    const issues = getIssues(schema, {});
    expect(formatIssues(issues)).toBe(
      'status_code: Invalid key: Expected "status_code" but received undefined'
    );
  });

  it('should include Invalid length prefix', () => {
    const schema = v.object({ n: v.pipe(v.string(), v.minLength(1)) });
    const issues = getIssues(schema, { n: '' });
    expect(formatIssues(issues)).toBe('n: Invalid length: Expected >=1 but received 0');
  });

  it('variant mismatch — reports exact field failure on matched branch', () => {
    const schema = v.variant('status_code', [
      v.object({ status_code: v.literal(200), result: v.string() }),
      v.object({ status_code: v.literal(204) }),
      v.object({ status_code: v.literal(400), error: v.string() }),
    ]);
    const issues = getIssues(schema, { status_code: 200, result: 123 });
    expect(formatIssues(issues)).toBe('result: Invalid type: Expected string but received 123');
  });

  it('variant mismatch — unknown discriminator reports expected values', () => {
    const schema = v.variant('status_code', [
      v.object({ status_code: v.literal(200), result: v.string() }),
      v.object({ status_code: v.literal(400), error: v.string() }),
    ]);
    const issues = getIssues(schema, { status_code: 999 });
    expect(formatIssues(issues)).toBe(
      'status_code: Invalid type: Expected (200 | 400) but received 999'
    );
  });
});
