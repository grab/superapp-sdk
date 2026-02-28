/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Validates that a value is a non-empty string.
 *
 * @param value - The value to validate.
 * @param fieldName - The name of the field for error messages.
 *
 * @returns Error message if invalid, `null` if valid.
 *
 * @remarks
 * "Non-empty" means the string must exist and not be all whitespace after trim.
 */
export function validateRequiredString(value: string, fieldName: string): string | null {
  if (!value || value.trim() === '') {
    return `${fieldName} is required and must be a non-empty string`;
  }
  return null;
}

/**
 * Validates that a value is a valid URL string.
 *
 * @param value - The value to validate.
 * @param fieldName - The name of the field for error messages.
 *
 * @returns Error message if invalid, `null` if valid.
 *
 * @remarks
 * Uses the `URL` constructor for validation. Both absolute and relative URLs are accepted.
 */
export function validateUrl(value: string, fieldName: string): string | null {
  try {
    new URL(value);
    return null;
  } catch {
    return `${fieldName} must be a valid URL`;
  }
}

/**
 * Validates that a value is a non-null object.
 *
 * @param value - The value to validate.
 * @param fieldName - The name of the field for error messages.
 *
 * @returns Error message if invalid, `null` if valid.
 *
 * @remarks
 * Accepts any object (including arrays). Rejects `null`, `undefined`, and primitives.
 */
export function validateObject(value: unknown, fieldName: string): string | null {
  if (value === null || value === undefined) {
    return `${fieldName} is required`;
  }
  if (typeof value !== 'object') {
    return `${fieldName} must be an object`;
  }
  return null;
}

/**
 * Validates that a value is either undefined or a plain object.
 *
 * @param value - The value to validate.
 * @param fieldName - The name of the field for error messages.
 *
 * @returns Error message if invalid, `null` if valid.
 *
 * @remarks
 * Use for optional object parameters. `undefined` passes; `null` and primitives fail.
 */
export function validateOptionalObject(value: unknown, fieldName: string): string | null {
  if (value === undefined) {
    return null;
  }
  if (typeof value !== 'object' || value === null) {
    return `${fieldName} must be undefined or an object`;
  }
  return null;
}
