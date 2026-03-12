/*!
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
   * @param request - Configuration for the QR code scanning, including the title to display.
   *
   * @returns The QR code scanning result, containing the scanned code on success or status information.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the camera module
   * const cameraModule = new CameraModule();
   *
   * // Scan the QR code
   * try {
   *   const response = await cameraModule.scanQRCode({ title: 'Scan Payment QR' });
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('QR Code scanned:', response.result.qrCode);
   *       break;
   *     case 204:
   *       console.log('User cancelled QR code scanning');
   *       break;
   *     case 400:
   *       console.log('Bad request:', response.error);
   *       break;
   *     case 403:
   *       console.log('Camera permission is not enabled for the Grab app');
   *       break;
   *     case 501:
   *       console.log('Not in Grab app:', response.error);
   *       break;
   *     default:
   *       console.log('Unexpected status code:', response);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   * @public
   */
  async scanQRCode(request: ScanQRCodeRequest): Promise<ScanQRCodeResponse> {
    return (await this.invoke('scanQRCode', request)) as ScanQRCodeResponse;
  }
}
