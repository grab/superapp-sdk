/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseModule } from '../../core';
import { ScanQRCodeRequest, ScanQRCodeResponse } from './types';

/**
 * Provides programmatic access to the device camera through the native host application.
 *
 * @remarks
 * All camera operations, including permission management and hardware lifecycle control,
 * are delegated to the native platform. This module serves as a bridge for invoking
 * camera-related functionality from the JavaScript execution context.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { CameraModule } from '@grabjs/superapp-sdk';
 *
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
 */
class CameraModule extends BaseModule {
  constructor() {
    super('CameraModule');
  }

  /**
   * Opens the camera to scan a QR code.
   *
   * @param request - Request parameters for scanning a QR code.
   *
   * @returns Promise that resolves with the QR code scan response.
   *
   * @example
   * With title
   * ```typescript
   * try {
   *   const response = await cameraModule.scanQRCode({ title: 'Scan Payment QR' });
   *   if (response.status_code === 200) {
   *     console.log('QR Code:', response.result.qrCode);
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Without title
   * ```typescript
   * try {
   *   const response = await cameraModule.scanQRCode({});
   *   if (response.status_code === 200) {
   *     console.log('QR Code:', response.result.qrCode);
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const response = await cameraModule.scanQRCode({ title: 'Scan Payment QR' });
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('QR Code scanned:', response.result.qrCode);
   *       break;
   *     case 204:
   *       console.log('User cancelled scanning');
   *       break;
   *     case 400:
   *       console.error('Invalid request:', response.error);
   *       break;
   *     case 403:
   *       console.error('Camera access denied:', response.error);
   *       break;
   *     case 500:
   *       console.error('Scanning error:', response.error);
   *       break;
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  scanQRCode(request: ScanQRCodeRequest): Promise<ScanQRCodeResponse> {
    return window.WrappedCameraModule.invoke('scanQRCode', request);
  }
}

export default CameraModule;
