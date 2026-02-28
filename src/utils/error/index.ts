/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Extracts a human-readable error message from an unknown error value.
 */
export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * Returns the error instance for logging when it is an Error, otherwise undefined.
 */
export function getErrorForLog(error: unknown): Error | undefined {
  return error instanceof Error ? error : undefined;
}
