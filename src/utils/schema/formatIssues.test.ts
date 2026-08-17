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
  describe('without schema/value (issues only)', () => {
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
  });

  describe('with schema and value', () => {
    it('primitive mismatch — shows field types', () => {
      const schema = v.object({ status_code: v.number() });
      const value = { status_code: 'wrong' };
      const issues = getIssues(schema, value);
      expect(formatIssues(issues, schema, value)).toBe(
        'status_code: Expected number but received "wrong"; expected: { status_code: number }; received: { status_code: string }'
      );
    });

    it('object where primitive expected — shows nested shape', () => {
      const schema = v.object({ status_code: v.number() });
      const value = { status_code: { foo: 1 } };
      const issues = getIssues(schema, value);
      expect(formatIssues(issues, schema, value)).toBe(
        'status_code: Expected number but received Object; expected: { status_code: number }; received: { status_code: { foo: number } }'
      );
    });

    it('object/object union mismatch — previously useless, now actionable', () => {
      const schema = v.union([
        v.object({ type: v.literal('a') }),
        v.object({ type: v.literal('b') }),
      ]);
      const value = { type: 'c' };
      const issues = getIssues(schema, value);
      expect(formatIssues(issues, schema, value)).toBe(
        'Expected Object but received Object; expected: { type: "a" } | { type: "b" }; received: { type: string }'
      );
    });

    it('array item mismatch — shows array shape', () => {
      const schema = v.object({ items: v.array(v.string()) });
      const value = { items: [1, 2, 3] };
      const issues = getIssues(schema, value);
      expect(formatIssues(issues, schema, value)).toBe(
        'items.0: Expected string but received 1, items.1: Expected string but received 2, items.2: Expected string but received 3; expected: { items: string[] }; received: { items: number[] }'
      );
    });

    it('nested object mismatch', () => {
      const schema = v.object({ data: v.object({ id: v.string() }) });
      const value = { data: { id: { nested: true } } };
      const issues = getIssues(schema, value);
      expect(formatIssues(issues, schema, value)).toBe(
        'data.id: Expected string but received Object; expected: { data: { id: string } }; received: { data: { id: { nested: boolean } } }'
      );
    });

    it('multiple issues', () => {
      const schema = v.object({ a: v.number(), b: v.string() });
      const value = { a: 'x', b: { c: 1 } };
      const issues = getIssues(schema, value);
      expect(formatIssues(issues, schema, value)).toBe(
        'a: Expected number but received "x", b: Expected string but received Object; expected: { a: number, b: string }; received: { a: string, b: { c: number } }'
      );
    });

    it('missing key', () => {
      const schema = v.object({ status_code: v.number() });
      const value = {};
      const issues = getIssues(schema, value);
      expect(formatIssues(issues, schema, value)).toBe(
        'status_code: Invalid key: Expected "status_code" but received undefined; expected: { status_code: number }; received: {}'
      );
    });

    it('optional field', () => {
      const schema = v.object({ name: v.optional(v.string()) });
      const value = { name: 42 };
      const issues = getIssues(schema, value);
      expect(formatIssues(issues, schema, value)).toBe(
        'name: Expected string but received 42; expected: { name: string? }; received: { name: number }'
      );
    });

    it('picklist mismatch', () => {
      const schema = v.object({ env: v.picklist(['staging', 'production']) });
      const value = { env: 'local' };
      const issues = getIssues(schema, value);
      expect(formatIssues(issues, schema, value)).toBe(
        'env: Expected ("staging" | "production") but received "local"; expected: { env: ("staging" | "production") }; received: { env: string }'
      );
    });
  });
});
