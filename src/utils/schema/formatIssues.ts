/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { BaseIssue } from 'valibot';

/**
 * Formats valibot issues into a human-readable error string.
 * Strips the redundant `Invalid type:` prefix — other prefixes such as
 * `Invalid length:`, `Invalid URL:`, and `Invalid key:` are preserved.
 *
 * @returns A newline-separated string of issue messages prefixed with their dot-notation path.
 * @internal
 */
export function formatIssues(issues: [BaseIssue<unknown>, ...BaseIssue<unknown>[]]): string {
  return issues
    .map((issue) => {
      const path = issue.path?.map((p) => String(p.key)).join('.');
      const message = issue.message.replace(/^Invalid type: /, '');
      return path ? `${path}: ${message}` : message;
    })
    .join('\n');
}
