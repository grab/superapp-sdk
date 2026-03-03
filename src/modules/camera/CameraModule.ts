/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';

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
   * Opens the camera to scan QR codes
   *
   * @param config - Configuration object for QR code scanning
   * @returns - Promise that resolves to response object with status_code:
   *
   * - 200: Success with result.qrCode containing the scanned QR code
   * - 204: No result (user cancelled or no QR code detected)
   * - 403: Camera access denied with error message
   */
  scanQRCode(config = {}) {
    return window.WrappedCameraModule!.invoke('scanQRCode', config);
  }
}
