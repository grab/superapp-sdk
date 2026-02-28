/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuccessResponse, NoResultResponse, ErrorResponse, Invoke } from '../../core';

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
 * Method map for CameraModule
 */
export type CameraModuleMethods = {
  scanQRCode: { params: ScanQRCodeRequest; response: ScanQRCodeResponse };
};

declare global {
  interface Window {
    /**
     * Wrapped Camera Module interface for invoking native camera operations
     */
    WrappedCameraModule: {
      /**
       * Invokes a native camera module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: Invoke<CameraModuleMethods>;
    };
  }
}
