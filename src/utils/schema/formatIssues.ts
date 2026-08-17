/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { BaseIssue, GenericSchema } from 'valibot';

/**
 * Returns a compact type-shape string for a valibot schema.
 *
 * @returns A compact type-shape string.
 * @internal
 */
function describeSchema(schema: GenericSchema, depth = 0): string {
  if (depth > 3) return '...';
  const s = schema as Record<string, unknown>;
  switch (s.type) {
    case 'object': {
      const entries = s.entries as Record<string, GenericSchema>;
      return `{ ${Object.entries(entries)
        .map(([k, v]) => `${k}: ${describeSchema(v, depth + 1)}`)
        .join(', ')} }`;
    }
    case 'array':
      return `${describeSchema(s.item as GenericSchema, depth + 1)}[]`;
    case 'union':
    case 'variant':
      return (s.options as GenericSchema[]).map((o) => describeSchema(o, depth + 1)).join(' | ');
    case 'optional':
    case 'nullish':
      return `${describeSchema(s.wrapped as GenericSchema, depth + 1)}?`;
    case 'record':
      return `Record<${describeSchema(s.key as GenericSchema, depth + 1)}, ${describeSchema(s.value as GenericSchema, depth + 1)}>`;
    case 'literal':
    case 'picklist':
      return s.expects as string;
    default:
      return (s.expects as string | undefined) ?? (s.type as string);
  }
}

/**
 * Returns a compact type-shape string for an actual runtime value.
 *
 * @returns A compact type-shape string.
 * @internal
 */
function describeValue(value: unknown, depth = 0): string {
  if (depth > 3) return '...';
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return `${describeValue(value[0], depth + 1)}[]`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    return `{ ${entries.map(([k, v]) => `${k}: ${describeValue(v, depth + 1)}`).join(', ')} }`;
  }
  return typeof value;
}

/**
 * Formats valibot issues into a human-readable error string.
 * When `schema` and `value` are provided, appends compact expected/received shape summaries.
 *
 * @returns A comma-separated string of issue messages, prefixed with their dot-notation path when available,
 * followed by expected and received shape descriptions.
 * @internal
 */
export function formatIssues(
  issues: [BaseIssue<unknown>, ...BaseIssue<unknown>[]],
  schema?: GenericSchema,
  value?: unknown
): string {
  const issueStr = issues
    .map((issue) => {
      const path = issue.path?.map((p) => String(p.key)).join('.');
      const message = issue.message.replace(/^Invalid \w+: /, '');
      return path ? `${path}: ${message}` : message;
    })
    .join(', ');

  if (schema !== undefined && value !== undefined) {
    return `${issueStr}; expected: ${describeSchema(schema)}; received: ${describeValue(value)}`;
  }

  return issueStr;
}
