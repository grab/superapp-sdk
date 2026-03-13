/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response';

/**
 * Request parameters for scanning QR codes.
 *
 * @example
 * **Request with custom title:**
 * ```typescript
 * { title: 'Scan Payment QR' }
 * ```
 *
 * @example
 * **Minimal request (uses default title):**
 * ```typescript
 * {}
 * ```
 *
 * @public
 */
export type ScanQRCodeRequest = {
  /** Optional title shown in the camera view header. */
  title?: string;
};

/**
 * Result object containing the scanned QR code data.
 *
 * @example
 * ```typescript
 * { qrCode: 'https://example.com/payment/123' }
 * ```
 *
 * @public
 */
export type ScanQRCodeResult = {
  /** The raw string content decoded from the scanned QR code. */
  qrCode: string;
};

/**
 * Response when scanning a QR code.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Successfully scanned QR code. The `result` contains the scanned QR code data.
 * - `204`: User cancelled the QR code scanning. No result data is returned.
 * - `400`: Bad request - invalid request parameters.
 * - `403`: Camera permission is not enabled for the Grab app.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { qrCode: 'https://example.com/payment/123' }
 * }
 * ```
 *
 * @example
 * **Cancelled response (204):**
 * ```typescript
 * { status_code: 204 }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Invalid request parameters'
 * }
 * ```
 *
 * @example
 * **Permission denied response (403):**
 * ```typescript
 * {
 *   status_code: 403,
 *   error: 'Camera permission is not enabled for the Grab app'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @example
 * **Internal server error response (500):**
 * ```typescript
 * {
 *   status_code: 500,
 *   error: 'Internal server error'
 * }
 * ```
 *
 * @public
 */
export type ScanQRCodeResponse = ConstrainedBridgeResponse<
  ScanQRCodeResult,
  200 | 204 | 400 | 403 | 500 | 501
>;
