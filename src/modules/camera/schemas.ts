/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import {
  sdkErrorResponseSchema,
  sdkNoContentResponseSchema,
  sdkOkResponseSchema,
} from '../../core';
import type { ScanQRCodeRequest, ScanQRCodeResponse, ScanQRCodeResult } from './types';

/**
 * Valibot schema for {@link ScanQRCodeRequest}.
 *
 * @group Modules
 * @category Camera
 *
 * @public
 */
export const ScanQRCodeRequestSchema: v.GenericSchema<ScanQRCodeRequest> = v.object({
  title: v.optional(v.string()),
});

/**
 * Valibot schema for {@link ScanQRCodeResult}.
 *
 * @group Modules
 * @category Camera
 *
 * @public
 */
export const ScanQRCodeResultSchema: v.GenericSchema<ScanQRCodeResult> = v.object({
  qrCode: v.string(),
});

/**
 * Valibot schema for {@link ScanQRCodeResponse}.
 *
 * @group Modules
 * @category Camera
 *
 * @public
 */
export const ScanQRCodeResponseSchema: v.GenericSchema<ScanQRCodeResponse> = v.union([
  sdkOkResponseSchema(ScanQRCodeResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
