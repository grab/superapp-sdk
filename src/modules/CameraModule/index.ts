/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { ScanQRCodeRequest, ScanQRCodeResponse } from './type';

/**
 * The CameraModule provides functionality to open the device camera for QR code scanning and retrieve the scan results.
 *
 * Camera permissions and lifecycle (opening/closing) are handled automatically by the native iOS app,
 * so no additional management is required from the JavaScript side.
 *
 * @example
 * ```javascript
 * import { CameraModule } from '@grabjs/superapp-sdk';
 *
 * const cameraModule = new CameraModule();
 * ```
 */
class CameraModule extends ModuleBase {
  constructor() {
    super('CameraModule');
  }

  /**
   * Opens the camera to scan QR codes with optional configuration.
   *
   * The camera method returns an object with different structures based on the result:
   * - **Success Response (Status Code 200)**:
   *   ```javascript
   *   {
   *     "status_code": 200,
   *     "result": {
   *       "qrCode": "scanned_qr_code_string" // The QR code content
   *     }
   *   }
   *   ```
   * - **No Result Response (Status Code 204)**: User cancelled or no QR code detected
   *   ```javascript
   *   {
   *     "status_code": 204
   *     // No result property
   *     // No error property
   *   }
   *   ```
   * - **Error Response (Status Code 403)**: Camera access denied
   *   ```javascript
   *   {
   *     "status_code": 403,
   *     "error": "Camera access denied"
   *     // No result property
   *   }
   *   ```
   *
   * **Status Codes:**
   * - `200`: Successfully scanned a QR code
   * - `204`: No result (user cancelled)
   * - `403`: Camera access denied
   *
   * @param request - Configuration object for QR code scanning (optional)
   * @param request.title - Title to display in camera view (optional)
   * @returns Promise that resolves to response object
   *
   * @example
   * ```javascript
   * cameraModule.scanQRCode({ title: 'Scan Payment QR' })
   *   .then((response) => {
   *     switch (response.status_code) {
   *       case 200:
   *         // Success - QR code scanned
   *         console.log('QR Code scanned:', response.result.qrCode);
   *         break;
   *       case 204:
   *         // No result - user cancelled
   *         console.log('No result - user cancelled');
   *         break;
   *       case 403:
   *         // Permission denied
   *         console.log('Camera access denied:', response.error);
   *         break;
   *       default:
   *         // Handle other potential status codes
   *         console.log('Error:', response.error);
   *     }
   *   });
   * ```
   */
  scanQRCode(request: ScanQRCodeRequest): Promise<ScanQRCodeResponse> {
    return window.WrappedCameraModule.invoke('scanQRCode', request);
  }
}

export default CameraModule;

export type {
  // ScanQRCode
  ScanQRCodeRequest,
  ScanQRCodeResponse,
  ScanQRCodeResult,
} from './type';
