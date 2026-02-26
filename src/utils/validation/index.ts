/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Validates that a value is a non-empty string
 * @param value - The value to validate
 * @param fieldName - The name of the field for error messages
 * @returns Error message if invalid, null if valid
 */
export function validateRequiredString(value: string, fieldName: string): string | null {
  if (!value || typeof value !== 'string' || value.trim() === '') {
    return `${fieldName} is required and must be a non-empty string`;
  }
  return null;
}
