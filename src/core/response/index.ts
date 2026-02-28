/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ErrorResponse } from '../module/types';

/**
 * Creates a validation error response (status_code 400).
 *
 *
 * @param error - The validation error message.
 *
 * @returns An ErrorResponse object for invalid request parameters.
 *
 * @remarks
 * Use when validation fails to return a consistent 400 response shape.
 */
export function createValidationErrorResponse(error: string): ErrorResponse {
  return { status_code: 400, error };
}
