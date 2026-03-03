/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { ScanQRCodeRequest, ScanQRCodeResponse, ScanQRCodeResult } from './types';

/**
 * JSBridge module for accessing the device camera.
 *
 * @remarks
 * Provides access to native camera functionality including QR code scanning.
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
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
   * @param request - Configuration for the scan.
   *
   * @returns Resolves with the scanned QR code content on success, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * With title
   * ```typescript
   * const response = await cameraModule.scanQRCode({ title: 'Scan Payment QR' });
   * ```
   *
   * @example
   * Without title
   * ```typescript
   * const response = await cameraModule.scanQRCode({});
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await cameraModule.scanQRCode(params);
   *   switch (status_code) {
   *     case 200:
   *       console.log('QR Code scanned:', result.qrCode);
   *       break;
   *     case 204:
   *       console.log('User cancelled scanning');
   *       break;
   *     default:
   *       console.log(`Could not scan QR code${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not scan QR code${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  scanQRCode(request: ScanQRCodeRequest): Promise<ScanQRCodeResponse> {
    return window.WrappedCameraModule!.invoke<ScanQRCodeResult>('scanQRCode', request);
  }
}
