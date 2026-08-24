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
  it('primitive mismatch — strips Invalid type prefix', () => {
    const schema = v.object({ status_code: v.number() });
    const issues = getIssues(schema, { status_code: 'wrong' });
    expect(formatIssues(issues)).toBe('status_code: Expected number but received "wrong"');
  });

  it('missing key — preserves Invalid key prefix', () => {
    const schema = v.object({ status_code: v.number() });
    const issues = getIssues(schema, {});
    expect(formatIssues(issues)).toBe(
      'status_code: Invalid key: Expected "status_code" but received undefined'
    );
  });

  it('invalid length — preserves Invalid length prefix', () => {
    const schema = v.object({ n: v.pipe(v.string(), v.minLength(1)) });
    const issues = getIssues(schema, { n: '' });
    expect(formatIssues(issues)).toBe('n: Invalid length: Expected >=1 but received 0');
  });

  it('multiple issues — joined with newline', () => {
    const schema = v.object({ a: v.number(), b: v.string() });
    const issues = getIssues(schema, { a: 'x', b: 123 });
    expect(formatIssues(issues)).toBe(
      'a: Expected number but received "x"\nb: Expected string but received 123'
    );
  });

  it('nested object mismatch', () => {
    const schema = v.object({ data: v.object({ id: v.string() }) });
    const issues = getIssues(schema, { data: { id: 123 } });
    expect(formatIssues(issues)).toBe('data.id: Expected string but received 123');
  });

  it('no path top-level mismatch', () => {
    const schema = v.number();
    const issues = getIssues(schema, 'wrong');
    expect(formatIssues(issues)).toBe('Expected number but received "wrong"');
  });

  it('variant mismatch — reports exact field failure on matched branch', () => {
    const schema = v.variant('status_code', [
      v.object({ status_code: v.literal(200), result: v.string() }),
      v.object({ status_code: v.literal(204) }),
      v.object({ status_code: v.literal(400), error: v.string() }),
    ]);
    const issues = getIssues(schema, { status_code: 200, result: 123 });
    expect(formatIssues(issues)).toBe('result: Expected string but received 123');
  });

  it('variant mismatch — unknown discriminator reports expected values', () => {
    const schema = v.variant('status_code', [
      v.object({ status_code: v.literal(200), result: v.string() }),
      v.object({ status_code: v.literal(400), error: v.string() }),
    ]);
    const issues = getIssues(schema, { status_code: 999 });
    expect(formatIssues(issues)).toBe('status_code: Expected (200 | 400) but received 999');
  });
});
