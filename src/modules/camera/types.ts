/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Request parameters for scanning a QR code.
 *
 * @example
 * **Request with custom title:**
 * ```typescript
 * { title: 'Scan Payment QR' }
 * ```
 *
 * @example
 * **Request with no title:**
 * ```typescript
 * {}
 * ```
 *
 * @group Modules
 * @category Camera
 *
 * @public
 */
export interface ScanQRCodeRequest {
  /**
   * Title shown above the QR scanner.
   */
  title?: string;
}

/**
 * Result returned on a successful QR code scan.
 *
 * @group Modules
 * @category Camera
 *
 * @public
 */
export interface ScanQRCodeResult {
  /** Raw payload decoded from the scanned QR code (e.g. URL or arbitrary string). */
  qrCode: string;
}

/**
 * Response returned by {@link CameraModule.scanQRCode}.
 *
 * @group Modules
 * @category Camera
 *
 * @public
 */
export type ScanQRCodeResponse =
  | SDKOkResponse<ScanQRCodeResult>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<403>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
