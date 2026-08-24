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
  it('variant mismatch — reports exact field failure on matched branch', () => {
    const schema = v.variant('status_code', [
      v.object({ status_code: v.literal(200), result: v.string() }),
      v.object({ status_code: v.literal(204) }),
      v.object({ status_code: v.literal(400), error: v.string() }),
    ]);
    const issues = getIssues(schema, { status_code: 200, result: 123 });
    expect(formatIssues(issues)).toBe('\n- result: Invalid type: Expected string but received 123');
  });

  it('variant mismatch — unknown discriminator reports expected values', () => {
    const schema = v.variant('status_code', [
      v.object({ status_code: v.literal(200), result: v.string() }),
      v.object({ status_code: v.literal(400), error: v.string() }),
    ]);
    const issues = getIssues(schema, { status_code: 999 });
    expect(formatIssues(issues)).toBe(
      '\n- status_code: Invalid type: Expected (200 | 400) but received 999'
    );
  });
});
