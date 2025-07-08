/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import bridgeSDK from '@grabjs/mobile-kit-bridge-sdk';

export const CameraResultCode = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  CANCELLED: 'CANCELLED',
};

export class CameraModule {
  constructor() {
    bridgeSDK.wrapModule(window, 'CameraModule');
  }

  /**
   * Opens the camera to scan QR codes
   * @param {string} [title] - Title to display in camera view
   * @returns {Object} Object with the scanned QR code result string
   */
  scanQRCode(title) {
    return window.WrappedCameraModule.invoke('scanQRCode', {
      title,
    });
  }
} 