/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { DataStream } from '../../core/stream';
import { ConstrainedBridgeResponse } from '../../core/response/types';

/**
 * DRM content configuration for playback.
 *
 * @remarks
 * Configuration object containing DRM license information, content URLs, and playback settings.
 * The exact structure depends on the DRM provider (e.g., FairPlay, Widevine).
 *
 * @public
 */
export type DRMContentConfig = Record<string, unknown>;

/**
 * Result object for DRM content playback initiation.
 * This operation returns no data on success.
 *
 * @public
 */
export type PlayDRMContentResult = void;

/**
 * Response when initiating DRM content playback.
 *
 * @public
 */
export type PlayDRMContentResponse = ConstrainedBridgeResponse<PlayDRMContentResult, 200 | 204>;

/**
 * Result object for DRM playback events.
 *
 * @public
 */
export type DRMPlaybackEvent = {
  /** The type of playback event (e.g., 'started', 'paused', 'ended', 'error'). */
  eventType: string;
  /** Additional event data as key-value pairs. */
  data?: Record<string, unknown>;
};

/**
 * Response stream for observing DRM playback events.
 *
 * @public
 */
export type ObserveDRMPlaybackResponse = DataStream<DRMPlaybackEvent>;
