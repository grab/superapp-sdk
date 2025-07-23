/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import bridgeSDK from '@grabjs/mobile-kit-bridge-sdk';

export class CameraModule {
  constructor() {
    bridgeSDK.wrapModule(window, 'CameraModule');
  }

  /**
   * Opens the camera to scan QR codes
   * @param {Object} [config] - Configuration object for QR code scanning
   * @param {string} [config.title] - Title to display in camera view
   * @returns {Promise<Object>} Promise that resolves to response object with status_code:
   *   - 200: Success with result.qrCode containing the scanned QR code
   *   - 204: No result (user cancelled or no QR code detected)
   *   - 403: Camera access denied with error message
   */
  scanQRCode(config = {}) {
    return window.WrappedCameraModule.invoke('scanQRCode', config);
  }
} 