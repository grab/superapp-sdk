/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Request parameters for scanning QR codes.
 *
 * @group Modules
 * @category Camera
 *
 * @public
 */
export type ScanQRCodeRequest = {
  /** Title text to display on the QR code scanning UI (for example, `"Scan Payment QR"`). */
  title?: string;
};

/**
 * Result object containing the scanned QR code data.
 *
 * @group Modules
 * @category Camera
 *
 * @public
 */
export type ScanQRCodeResult = {
  /** QR code value returned by the scanner (for example, `"https://example.com/payment/123"`). */
  qrCode: string;
};

/**
 * Response when scanning a QR code.
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
