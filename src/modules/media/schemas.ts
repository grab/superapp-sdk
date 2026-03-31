/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import {
  bridgeErrorSchema,
  bridgeNoContentSchema,
  bridgeOkSchema,
  bridgeSuccessSchema,
} from '../../core';

/**
 * Valibot schema for {@link PlayDRMContentResponse}.
 *
 * @public
 */
export const PlayDRMContentResponseSchema = v.union([
  bridgeOkSchema,
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link DRMPlaybackEvent}.
 *
 * @public
 */
export const DRMPlaybackEventSchema = v.object({
  eventType: v.picklist(['started', 'paused', 'ended', 'error']),
  data: v.optional(v.record(v.string(), v.unknown())),
});

/**
 * @internal
 */
export const ObserveDRMPlaybackResponseSchema = v.union([
  bridgeSuccessSchema(DRMPlaybackEventSchema),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
