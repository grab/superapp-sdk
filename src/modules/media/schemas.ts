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
import type { DRMPlaybackEvent, ObserveDRMPlaybackResult, PlayDRMContentResponse } from './types';

/**
 * Valibot schema for {@link DRMPlaybackEvent}.
 *
 * @internal
 */
export const DRMPlaybackEventSchema: v.GenericSchema<DRMPlaybackEvent> = v.object({
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
 * @internal
 */
export const PlayDRMContentResponseSchema: v.GenericSchema<PlayDRMContentResponse> = v.union([
  sdkOkResponseSchema(DRMPlaybackEventSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * @internal
 */
export const ObserveDRMPlaybackResponseSchema: v.GenericSchema<ObserveDRMPlaybackResult> = v.union(
  [
    sdkOkResponseSchema(DRMPlaybackEventSchema),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]
);
