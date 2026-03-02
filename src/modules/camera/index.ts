/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CameraModule } from './CameraModule';

export default CameraModule;

export type {
  ScanQRCodeCancelledResponse,
  ScanQRCodeErrorResponse,
  // ScanQRCode
  ScanQRCodeRequest,
  ScanQRCodeResponse,
  ScanQRCodeResult,
  ScanQRCodeSuccessResponse,
} from './types';
