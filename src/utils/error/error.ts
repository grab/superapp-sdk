/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

/**
 * Safely extracts an error message from an unknown error value.
 * Handles cases where error might not be an Error instance.
 *
 * @param error - The error value (typically from a catch block)
 * @returns The error message string
 *
 * @internal
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

/**
 * Checks if an unknown error has a specific message.
 * Useful for error message comparisons in catch blocks.
 *
 * @param error - The error value (typically from a catch block)
 * @param message - The message to compare against
 * @returns True if the error is an Error with the specified message
 *
 * @internal
 */
export function errorHasMessage(error: unknown, message: string): boolean {
  return error instanceof Error && error.message === message;
}
