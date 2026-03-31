/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeNoContentSchema, bridgeSuccessSchema } from '../../core';

/**
 * Valibot schema for {@link ScanQRCodeRequest}.
 *
 * @public
 */
export const ScanQRCodeRequestSchema = v.object({ title: v.optional(v.string()) });

/**
 * Valibot schema for {@link ScanQRCodeResult}.
 *
 * @public
 */
export const ScanQRCodeResultSchema = v.object({ qrCode: v.string() });

/**
 * Valibot schema for {@link ScanQRCodeResponse}.
 *
 * @public
 */
export const ScanQRCodeResponseSchema = v.union([
  bridgeSuccessSchema(ScanQRCodeResultSchema),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(403),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
