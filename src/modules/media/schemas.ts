/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeNoContentSchema, bridgeOkSchema } from '../../core';

/**
 * Valibot schema for {@link DRMPlaybackEvent}.
 *
 * @public
 */
export const DRMPlaybackEventSchema = v.object({
  type: v.picklist([
    'START_PLAYBACK',
    'PROGRESS_PLAYBACK',
    'START_SEEK',
    'STOP_SEEK',
    'STOP_PLAYBACK',
    'CLOSE_PLAYBACK',
    'PAUSE_PLAYBACK',
    'RESUME_PLAYBACK',
    'FAST_FORWARD_PLAYBACK',
    'REWIND_PLAYBACK',
    'ERROR_PLAYBACK',
    'CHANGE_VOLUME',
  ]),
  titleId: v.string(),
  position: v.number(),
  length: v.number(),
});

/**
 * Valibot schema for {@link PlayDRMContentResponse}.
 *
 * @public
 */
export const PlayDRMContentResponseSchema = v.union([
  bridgeOkSchema(DRMPlaybackEventSchema),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * @public
 */
export const ObserveDRMPlaybackResponseSchema = v.union([
  bridgeOkSchema(DRMPlaybackEventSchema),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
