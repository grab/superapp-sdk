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

  it('should append JSON when the offending value is an object', () => {
    const schema = v.object({ status_code: v.number() });
    const issues = getIssues(schema, { status_code: { foo: 1 } });
    expect(formatIssues(issues)).toBe(
      'status_code: Invalid type: Expected number but received Object ({"foo":1})'
    );
  });

  it('should append JSON when the offending value is an array', () => {
    const schema = v.object({ items: v.string() });
    const issues = getIssues(schema, { items: [1, 2, 3] });
    expect(formatIssues(issues)).toBe(
      'items: Invalid type: Expected string but received Array ([1,2,3])'
    );
  });

  it('should append JSON for a nested object path', () => {
    const schema = v.object({ data: v.object({ id: v.string() }) });
    const issues = getIssues(schema, { data: { id: { nested: true } } });
    expect(formatIssues(issues)).toBe(
      'data.id: Invalid type: Expected string but received Object ({"nested":true})'
    );
  });

  it('should not append anything for null input', () => {
    const schema = v.object({ status_code: v.number() });
    const issues = getIssues(schema, { status_code: null });
    expect(formatIssues(issues)).toBe(
      'status_code: Invalid type: Expected number but received null'
    );
  });

  it('should not append anything for undefined input (missing key)', () => {
    const schema = v.object({ status_code: v.number() });
    const issues = getIssues(schema, {});
    expect(formatIssues(issues)).toBe(
      'status_code: Invalid key: Expected "status_code" but received undefined'
    );
  });

  it('should append JSON for a top-level object with no path', () => {
    const schema = v.number();
    const issues = getIssues(schema, { foo: 1 });
    expect(formatIssues(issues)).toBe(
      'Invalid type: Expected number but received Object ({"foo":1})'
    );
  });

  it('should not append anything for a top-level primitive with no path', () => {
    const schema = v.object({ status_code: v.number() });
    const issues = getIssues(schema, 'not-an-object');
    expect(formatIssues(issues)).toBe('Invalid type: Expected Object but received "not-an-object"');
  });

  it('should join multiple issues with comma', () => {
    const schema = v.object({ a: v.number(), b: v.string() });
    const issues = getIssues(schema, { a: 'x', b: { c: 1 } });
    expect(formatIssues(issues)).toBe(
      'a: Invalid type: Expected number but received "x", b: Invalid type: Expected string but received Object ({"c":1})'
    );
  });
});
