/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

/**
 * Type guard to check if an error has a message property.
 * Use this to safely narrow `unknown` errors in catch blocks.
 *
 * @param error - The error value (typically from a catch block)
 * @returns True if the error has a string message property
 *
 * @example
 * ```typescript
 * try {
 *   await riskyOperation();
 * } catch (error) {
 *   if (isErrorWithMessage(error)) {
 *     console.error(error.message); // TypeScript knows error has message
 *   }
 * }
 * ```
 *
 * @internal
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}
