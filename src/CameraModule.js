/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import bridgeSDK from '@grabjs/mobile-kit-bridge-sdk';

export const CameraResultType = {
  QR_CODE: 'QR_CODE',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  CANCELLED: 'CANCELLED',
};

export class CameraModule {
  constructor() {
    bridgeSDK.wrapModule(window, 'CameraModule');
  }

  /**
   * Opens the camera with specific configuration
   * @param {Object} config - Camera configuration
   * @param {string} config.title - Title to display in camera view
   * @returns {Promise} Promise that resolves with the QR code result
   */
  openCameraWithConfig(config = {}) {
    const validationError = this._validateCameraConfig(config);
    if (validationError) {
      return {
        then: (callback) => callback({ status_code: 400, error: validationError }),
      };
    }
    return window.WrappedCameraModule.invoke('openCameraWithConfig', {
      title: config.title || 'Scan QR Code',
    });
  }

  _validateCameraConfig(config) {
    if (config != null && typeof config !== 'object') {
      return 'config must be undefined or an object';
    }

    if (config && config.title != null && typeof config.title !== 'string') {
      return 'title must be a string';
    }

    return null;
  }
} 