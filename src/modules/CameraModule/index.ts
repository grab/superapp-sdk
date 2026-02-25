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
   * @remarks
   * Camera permissions and lifecycle are handled automatically by the native app.
   *
   * **Status Codes:**
   * - `200`: Successfully scanned a QR code
   * - `204`: No result (user cancelled or no QR code detected)
   * - `403`: Camera access denied
   *
   * @param request - Configuration object for QR code scanning.
   *   - `title`: Title to display in camera view (optional)
   *
   * @returns Promise that resolves to {@link ScanQRCodeResponse} with the scanned QR code data.
   *
   * @example
   * ```javascript
   * // Basic usage with custom title
   * cameraModule.scanQRCode({ title: 'Scan Payment QR' })
   *   .then((response) => {
   *     switch (response.status_code) {
   *       case 200:
   *         // Success - QR code scanned
   *         console.log('QR Code scanned:', response.result.qrCode);
   *         break;
   *       case 204:
   *         // No result - user cancelled
   *         console.log('User cancelled scanning');
   *         break;
   *       case 403:
   *         // Permission denied
   *         console.error('Camera access denied:', response.error);
   *         break;
   *     }
   *   });
   *
   * // Without title
   * cameraModule.scanQRCode({})
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200 && result) {
   *       console.log('Scanned QR code:', result.qrCode);
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
