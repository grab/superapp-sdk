/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import {
  type SDKErrorResponse,
  type SDKNoContentResponse,
  type SDKOkResponse,
  SDKStream,
} from '../../core';

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
 * @group Modules
 * @category Media
 *
 * @public
 */
export type DRMContentConfig = Record<string, unknown>;

/**
 * Result payload returned when DRM content playback starts successfully.
 *
 * @group Modules
 * @category Media
 *
 * @public
 */
export type PlayDRMContentResult = DRMPlaybackEvent;

/**
 * DRM playback event type values emitted by the native player.
 *
 * @group Modules
 * @category Media
 *
 * @public
 */
export type DRMPlaybackEventType =
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

/**
 * Result object for DRM playback events.
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
 * @group Modules
 * @category Media
 *
 * @public
 */
export interface DRMPlaybackEvent {
  type: DRMPlaybackEventType;
  titleId: string;
  position: number;
  length: number;
}

/**
 * Response returned by {@link MediaModule.playDRMContent}.
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
 * Result emitted on the DRM playback observation stream.
 *
 * @group Modules
 * @category Media
 *
 * @public
 */
export type ObserveDRMPlaybackResult =
  | SDKOkResponse<DRMPlaybackEvent>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Response returned by {@link MediaModule.observePlayDRMContent}.
 *
 * @group Modules
 * @category Media
 *
 * @public
 */
export type ObserveDRMPlaybackResponse = SDKStream<ObserveDRMPlaybackResult>;
