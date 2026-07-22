/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { ScanQRCodeRequestSchema, ScanQRCodeResponseSchema } from './schemas';
import { ScanQRCodeRequest, ScanQRCodeResponse } from './types';

/**
 * SDK module for accessing the device camera via `JSBridge`.
 *
 * @group Modules
 * @category Camera
 * @skillReference Device & Sensors
 *
 * @remarks
 * Provides access to native camera functionality including QR code scanning.
 * This code must run on the Grab SuperApp's WebView to function correctly.
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
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
   * @param request - Configuration for the QR code scanning.
   *
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): Successfully scanned QR code. The `result` contains {@link ScanQRCodeResult}.
   * - `204` (No Content): User cancelled the QR code scanning.
   * - `400` (Bad Request): Invalid request parameters.
   * - `403` (Forbidden): Camera permission is not enabled for the Grab app.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
   * ```typescript
   * import { CameraModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the camera module
   * const camera = new CameraModule();
   *
   * // Scan a QR code
   * const response = await camera.scanQRCode({ title: 'Scan Payment QR' });
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
   * } else if (isError(response)) {
   *   switch (response.status_code) {
   *     case 403:
   *       console.log('Camera permission not enabled');
   *       // Advise user to enable camera permission in device settings
   *       break;
   *     default:
   *       console.error(`Error ${response.status_code}: ${response.error}`);
   *   }
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   * @public
   */
  async scanQRCode(request: ScanQRCodeRequest = {}): Promise<ScanQRCodeResponse> {
    const requestError = this.validate(ScanQRCodeRequestSchema, request);
    if (requestError) return { status_code: 400, error: requestError };

    const response = (await this.invoke({
      method: 'scanQRCode',
      params: request,
    })) as ScanQRCodeResponse;

    const responseError = this.validate(ScanQRCodeResponseSchema, response);
    if (responseError)
      this.logger.warn('scanQRCode', `Unexpected response shape: ${responseError}`);

    return response;
  }
}
