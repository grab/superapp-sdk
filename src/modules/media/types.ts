/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse, BridgeStream } from '../../core';

/**
 * DRM content configuration for playback.
 *
 * @remarks
 * Configuration object containing DRM license information, content URLs, and playback settings.
 * The exact structure depends on the DRM provider (e.g., FairPlay, Widevine).
 *
 * @example
 * **Widevine DRM configuration:**
 * ```typescript
 * {
 *   contentId: 'movie-123',
 *   licenseUrl: 'https://license.example.com/widevine',
 *   contentUrl: 'https://cdn.example.com/video.mp4',
 *   headers: { 'Authorization': 'Bearer token123' }
 * }
 * ```
 *
 * @example
 * **FairPlay DRM configuration:**
 * ```typescript
 * {
 *   assetId: 'content-456',
 *   certificateUrl: 'https://fairplay.example.com/cert',
 *   licenseUrl: 'https://fairplay.example.com/license',
 *   contentUrl: 'https://cdn.example.com/video.m3u8'
 * }
 * ```
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
 * @remarks
 * This response can have the following status codes:
 * - `200`: Playback initiated successfully (streaming content).
 * - `204`: Invalid parameters - the DRM configuration is malformed or missing required fields.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Invalid parameters response (204):**
 * ```typescript
 * { status_code: 204 }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @example
 * **Internal server error response (500):**
 * ```typescript
 * {
 *   status_code: 500,
 *   error: 'Internal server error'
 * }
 * ```
 *
 * @public
 */
export type PlayDRMContentResponse = BridgeResponse<200 | 204 | 500 | 501, PlayDRMContentResult>;

/**
 * Result object for DRM playback events.
 *
 * @example
 * **Playback started event:**
 * ```typescript
 * { eventType: 'started' }
 * ```
 *
 * @example
 * **Playback paused event:**
 * ```typescript
 * { eventType: 'paused' }
 * ```
 *
 * @example
 * **Playback error event:**
 * ```typescript
 * {
 *   eventType: 'error',
 *   data: { errorCode: 'DRM_LICENSE_ERROR', message: 'License expired' }
 * }
 * ```
 *
 * @public
 */
export type DRMPlaybackEvent = {
  /** The type of playback event. */
  eventType: 'started' | 'paused' | 'ended' | 'error';
  /** Additional event data as key-value pairs. */
  data?: Record<string, unknown>;
};

/**
 * Response stream for observing DRM playback events.
 *
 * @remarks
 * This is a `BridgeStream` that can be:
 * - Subscribed to via `.subscribe()` for continuous updates
 * - Awaited via `await` to get the first value only
 *
 * The stream can emit status codes 200 (event data), 500 (server error), or 501 (not implemented).
 *
 * @public
 */
export type ObserveDRMPlaybackResponse = BridgeStream<200 | 500 | 501, DRMPlaybackEvent>;
