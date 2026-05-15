/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeNoContentSchema, bridgeOkSchema } from '../../core';

/**
 * Valibot schema for {@link ScanQRCodeRequest}.
 *
 * @group Modules
 * @category Camera
 *
 * @public
 */
export const ScanQRCodeRequestSchema = v.object({ title: v.optional(v.string()) });

/**
 * Valibot schema for {@link ScanQRCodeResult}.
 *
 * @group Modules
 * @category Camera
 *
 * @public
 */
export const ScanQRCodeResultSchema = v.object({ qrCode: v.string() });

/**
 * Valibot schema for {@link ScanQRCodeResponse}.
 *
 * @group Modules
 * @category Camera
 *
 * @public
 */
export const ScanQRCodeResponseSchema = v.union([
  bridgeOkSchema(ScanQRCodeResultSchema),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(403),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
