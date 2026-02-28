/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Extracts a human-readable error message from an unknown error value.
 *
 * @internal
 *
 * @param error - The error value (Error instance, string, or other).
 *
 * @returns The error message string. For `Error` instances, returns `message`; otherwise `String(error)`.
 *
 * @remarks
 * Use when handling `catch` blocks or unknown error types. Non-Error values are stringified.
 */
export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * Returns the error instance for logging when it is an Error, otherwise undefined.
 *
 * @internal
 *
 * @param error - The error value to check.
 *
 * @returns The same `Error` instance if input is an Error; otherwise `undefined`.
 *
 * @remarks
 * Use when passing errors to loggers that expect `Error | undefined`. Avoids stringifying
 * non-Error values for stack trace preservation.
 */
export function getErrorForLog(error: unknown): Error | undefined {
  return error instanceof Error ? error : undefined;
}
