/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import bridgeSDK from '@grabjs/mobile-kit-bridge-sdk';

export class FileModule {
  constructor() {
    bridgeSDK.wrapModule(window, 'FileModule');
  }

  /**
   * Downloads a file from a remote URL and saves it to the device
   * @param {string} fileUrl - The remote URL of the file to download
   * @param {string} fileName - The name of the file when saving it locally
   * @returns {Promise<Object>} Promise that resolves with response object containing:
   *   - status_code: 200 (Success), 204 (User cancelled), 401 (Unauthorized), 403 (Forbidden), 404 (Not found), 500 (Server error)
   *   - result: Success message when status_code is 200
   *   - message: Error message for non-success status codes
   *
   * @example
   * // Download an image
   * FileModule.downloadFile(
   *   "https://picsum.photos/200/300",
   *   "my_photo.jpg"
   * );
   *
   * @example
   * // Download a document
   * FileModule.downloadFile(
   *   "https://pdfobject.com/pdf/sample.pdf",
   *   "file.pdf"
   * );
   */
  downloadFile(fileUrl, fileName) {
    return window.WrappedFileModule.invoke('downloadFile', { fileUrl, fileName });
  }
}
