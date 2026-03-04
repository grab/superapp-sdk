/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';

/**
 * Request parameters for scanning QR codes
 *
 * @public
 */
export type ScanQRCodeRequest = {
  /** Optional title shown in the camera view header. */
  title?: string;
};

/**
 * Response when scanning a QR code
 *
 * @public
 */
export type ScanQRCodeResponse = BridgeResponse<ScanQRCodeResult>;

/**
 * Result object containing the scanned QR code data
 *
 * @public
 */
export type ScanQRCodeResult = {
  /** The raw string content decoded from the scanned QR code. */
  qrCode: string;
};
