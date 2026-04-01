/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { BaseIssue } from 'valibot';

/**
 * Formats valibot issues into a human-readable error string.
 *
 * @returns A comma-separated string of issue messages, prefixed with their dot-notation path when available.
 * @internal
 */
export function formatIssues(issues: [BaseIssue<unknown>, ...BaseIssue<unknown>[]]): string {
  return issues
    .map((issue) => {
      const path = issue.path?.map((p) => String(p.key)).join('.');
      return path ? `${path}: ${issue.message}` : issue.message;
    })
    .join(', ');
}
