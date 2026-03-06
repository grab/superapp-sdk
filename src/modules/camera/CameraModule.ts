/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { ScanQRCodeRequest, ScanQRCodeResponse } from './types';

/**
 * JSBridge module for accessing the device camera.
 *
 * @group Modules
 *
 * @remarks
 * Provides access to native camera functionality including QR code scanning.
 * This code must run on the Grab SuperApp's webview to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { CameraModule } from '@grabjs/superapp-sdk';
 * const cameraModule = new CameraModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const cameraModule = new SuperAppSDK.CameraModule();
 * </script>
 * ```
 *
 * @public
 */
export class CameraModule extends BaseModule {
  constructor() {
    super('CameraModule');
  }

  /**
   * Opens the native camera to scan a QR code.
   *
   * @param request - Configuration for the QR code scan.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Successfully scanned QR code
   * - `204`: User cancelled the QR code scanning
   * - `400`: Bad request
   * - `403`: Camera permission is not enabled for the Grab app
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { CameraModule, isResponseOk, isResponseNoContent, isResponseError, isResponseForbidden, isResponseClientError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { CameraModule, isResponseOk, isResponseNoContent, isResponseError, isResponseForbidden, isResponseClientError } = window.SuperAppSDK;
   *
   * // Initialize the camera module
   * const cameraModule = new CameraModule();
   *
   * // Scan the QR code
   * try {
   *   const response = await cameraModule.scanQRCode({ title: 'Scan Payment QR' });
   *   if (isResponseError(response)) {
   *     if (isResponseForbidden(response)) {
   *       console.log('User has not granted camera permission for the Grab app');
   *     } else if (isResponseClientError(response)) {
   *       console.log('Client error:', response.status_code, response.error);
   *     }
   *   } else {
   *     if (isResponseOk(response)) {
   *       console.log('QR Code scanned:', response.result.qrCode);
   *     } else if (isResponseNoContent(response)) {
   *       console.log('User cancelled QR code scanning');
   *     }
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   * @public
   */
  scanQRCode(request: ScanQRCodeRequest): Promise<ScanQRCodeResponse> {
    return this.wrappedModule.invoke('scanQRCode', request);
  }
}
