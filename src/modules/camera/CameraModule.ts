/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
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
 * @noInheritDoc
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
   * @example
   * **Simple usage**
   * ```typescript
   * import { CameraModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the camera module
   * const cameraModule = new CameraModule();
   *
   * // Scan the QR code
   * const response = await cameraModule.scanQRCode({ title: 'Scan Payment QR' });
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('QR code scanned:', response.result.qrCode);
   *       break;
   *     case 204:
   *       console.log('User cancelled QR code scanning');
   *       break;
   *   }
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   * @public
   */
  async scanQRCode(request: ScanQRCodeRequest): Promise<ScanQRCodeResponse> {
    return (await this.invoke({
      method: 'scanQRCode',
      params: request,
    })) as ScanQRCodeResponse;
  }
}
