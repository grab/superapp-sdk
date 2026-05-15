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
 * @remarks
 * This response can have the following status codes:
 * - `200`: Playback initiated successfully (streaming content).
 * - `204`: Invalid parameters - the DRM configuration is malformed or missing required fields.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * @example
 * **Playback started event:**
 * ```typescript
 * {
 *   type: 'START_PLAYBACK',
 *   titleId: 'movie-123',
 *   position: 0,
 *   length: 3600
 * }
 * ```
 *
 * @example
 * **Playback progress event:**
 * ```typescript
 * {
 *   type: 'PROGRESS_PLAYBACK',
 *   titleId: 'movie-123',
 *   position: 120,
 *   length: 3600
 * }
 * ```
 *
 * @example
 * **Playback error event:**
 * ```typescript
 * {
 *   type: 'ERROR_PLAYBACK',
 *   titleId: 'movie-123',
 *   position: 300,
 *   length: 3600
 * }
 * ```
 *
 * @public
 */
export type DRMPlaybackEvent = {
  length: number;
  position: number;
  titleId: string;
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
 * @remarks
 * This is an `SDKStream` that can be:
 * - Subscribed to via `.subscribe()` for continuous updates
 * - Awaited via `await` to get the first value only
 *
 * The stream can emit status codes `200` (event data), `500` (server error), or `501` (not implemented).
 *
 * @public
 */
export type ObserveDRMPlaybackResponse = SDKStream<
  SDKOkResponse<DRMPlaybackEvent> | SDKErrorResponse<500> | SDKErrorResponse<501>
>;
