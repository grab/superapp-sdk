/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import {
  ScanQRCodeRequestSchema,
  ScanQRCodeResponseSchema,
  ScanQRCodeResultSchema,
} from './schemas';

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
export type ScanQRCodeRequest = InferOutput<typeof ScanQRCodeRequestSchema>;

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
export type ScanQRCodeResult = InferOutput<typeof ScanQRCodeResultSchema>;

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
 * @public
 */
export type ScanQRCodeResponse = InferOutput<typeof ScanQRCodeResponseSchema>;
