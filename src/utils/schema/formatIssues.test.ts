/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';
import { describe, expect, it } from 'vitest';

import { describeSchema, describeValue, formatIssues } from './formatIssues';

function getIssues(schema: v.GenericSchema, value: unknown) {
  const result = v.safeParse(schema, value);
  if (result.success) throw new Error('Expected parse to fail');
  return result.issues;
}

describe('formatIssues', () => {
  it('should include path and message for a primitive mismatch', () => {
    const schema = v.object({ status_code: v.number() });
    const issues = getIssues(schema, { status_code: 'wrong' });
    expect(formatIssues(issues)).toBe('status_code: Expected number but received "wrong"');
  });

  it('should join multiple issues with comma', () => {
    const schema = v.object({ a: v.number(), b: v.string() });
    const issues = getIssues(schema, { a: 'x', b: { c: 1 } });
    expect(formatIssues(issues)).toBe(
      'a: Expected number but received "x", b: Expected string but received Object'
    );
  });

  it('should format issue with no path', () => {
    const schema = v.number();
    const issues = getIssues(schema, { foo: 1 });
    expect(formatIssues(issues)).toBe('Expected number but received Object');
  });

  it('should preserve non-type prefixes', () => {
    const schema = v.object({ n: v.pipe(v.string(), v.minLength(1)) });
    const issues = getIssues(schema, { n: '' });
    expect(formatIssues(issues)).toBe('n: Invalid length: Expected >=1 but received 0');
  });
});

describe('describeSchema', () => {
  it('primitive types', () => {
    expect(describeSchema(v.number())).toBe('number');
    expect(describeSchema(v.string())).toBe('string');
    expect(describeSchema(v.boolean())).toBe('boolean');
  });

  it('object', () => {
    expect(describeSchema(v.object({ a: v.number(), b: v.string() }))).toBe(
      '{ a: number, b: string }'
    );
  });

  it('array', () => {
    expect(describeSchema(v.array(v.string()))).toBe('string[]');
  });

  it('union', () => {
    expect(
      describeSchema(
        v.union([v.object({ type: v.literal('a') }), v.object({ type: v.literal('b') })])
      )
    ).toBe('{ type: "a" } | { type: "b" }');
  });

  it('optional', () => {
    expect(describeSchema(v.optional(v.string()))).toBe('string?');
  });

  it('picklist', () => {
    expect(describeSchema(v.picklist(['staging', 'production']))).toBe(
      '("staging" | "production")'
    );
  });

  it('record', () => {
    expect(describeSchema(v.record(v.string(), v.unknown()))).toBe('Record<string, unknown>');
  });
});

describe('describeValue', () => {
  it('primitives', () => {
    expect(describeValue('hello')).toBe('string');
    expect(describeValue(42)).toBe('number');
    expect(describeValue(true)).toBe('boolean');
    expect(describeValue(null)).toBe('null');
    expect(describeValue(undefined)).toBe('undefined');
  });

  it('object', () => {
    expect(describeValue({ a: 1, b: 'x' })).toBe('{ a: number, b: string }');
  });

  it('empty object', () => {
    expect(describeValue({})).toBe('{}');
  });

  it('array', () => {
    expect(describeValue([1, 2, 3])).toBe('number[]');
  });

  it('empty array', () => {
    expect(describeValue([])).toBe('[]');
  });

  it('nested object', () => {
    expect(describeValue({ a: { b: 1 } })).toBe('{ a: { b: number } }');
  });
});
