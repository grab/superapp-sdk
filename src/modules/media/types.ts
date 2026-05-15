/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse, SDKStream } from '../../core';

/**
 * DRM content configuration for playback.
 *
 * @group Modules
 * @category Media
 *
 * @public
 */
export type DRMContentConfig = Record<string, unknown>;

/**
 * Result object for DRM content playback initiation.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Media
 *
 * @public
 */
export type PlayDRMContentResult = DRMPlaybackEvent;

/**
 * Response when initiating DRM content playback.
 *
 * @group Modules
 * @category Media
 *
 * @public
 */
export type PlayDRMContentResponse =
  | SDKOkResponse<PlayDRMContentResult>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Result object for DRM playback events.
 *
 * @group Modules
 * @category Media
 *
 * @public
 */
export type DRMPlaybackEvent = {
  /** Length value. */
  length: number;
  /** Playback position in milliseconds. */
  position: number;
  /** Title id value. */
  titleId: string;
  /** Playback event type. */
  type:
    | 'START_PLAYBACK'
    | 'PROGRESS_PLAYBACK'
    | 'START_SEEK'
    | 'STOP_SEEK'
    | 'STOP_PLAYBACK'
    | 'CLOSE_PLAYBACK'
    | 'PAUSE_PLAYBACK'
    | 'RESUME_PLAYBACK'
    | 'FAST_FORWARD_PLAYBACK'
    | 'REWIND_PLAYBACK'
    | 'ERROR_PLAYBACK'
    | 'CHANGE_VOLUME';
};

/**
 * Response stream for observing DRM playback events.
 *
 * @group Modules
 * @category Media
 *
 * @public
 */
export type ObserveDRMPlaybackResponse = SDKStream<
  SDKOkResponse<DRMPlaybackEvent> | SDKErrorResponse<500> | SDKErrorResponse<501>
>;
