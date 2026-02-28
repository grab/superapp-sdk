/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuccessResponse, NoResultResponse, ErrorResponse } from '../../core';

/**
 * Result object containing the scanned QR code data
 */
export type ScanQRCodeResult = {
  /** The QR code content that was scanned */
  qrCode: string;
};

/**
 * Success response when QR code is successfully scanned
 */
export type ScanQRCodeSuccessResponse = SuccessResponse<ScanQRCodeResult>;

/**
 * Empty response when user cancels the QR code scanning operation
 */
export type ScanQRCodeCancelledResponse = NoResultResponse & {
  /**
   * Status code: `204` - User cancelled the QR code scanning operation
   */
  status_code: 204;
};

/**
 * Error response when QR code scanning fails
 */
export type ScanQRCodeErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid request parameters
   * - `403`: Camera permission denied or not available
   * - `500`: Internal error during QR code scanning
   */
  status_code: 400 | 403 | 500;
};

/**
 * Response when scanning a QR code
 */
export type ScanQRCodeResponse =
  | ScanQRCodeSuccessResponse
  | ScanQRCodeCancelledResponse
  | ScanQRCodeErrorResponse;

/**
 * Request parameters for scanning QR codes
 */
export type ScanQRCodeRequest = {
  /** Title to display in the camera view (optional) */
  title?: string;
};

/**
 * Concrete interface for the native Camera module bridge.
 *
 * @remarks
 * Explicit method signature avoids generic conditional type resolution issues
 * that can trigger @typescript-eslint/no-unsafe-* in consuming modules.
 */
export interface WrappedCameraModule {
  invoke(method: 'scanQRCode', params: ScanQRCodeRequest): Promise<ScanQRCodeResponse>;
}

declare global {
  interface Window {
    WrappedCameraModule: WrappedCameraModule;
  }
}
