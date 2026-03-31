/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import { BridgeStream } from '../../core';
import { DRMPlaybackEventSchema, PlayDRMContentResponseSchema } from './schemas';

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
 * @public
 */
export type PlayDRMContentResponse = InferOutput<typeof PlayDRMContentResponseSchema>;

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
export type DRMPlaybackEvent = InferOutput<typeof DRMPlaybackEventSchema>;

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
export type ObserveDRMPlaybackResponse = BridgeStream<
  | { status_code: 200; result: DRMPlaybackEvent }
  | { status_code: 500; error: string }
  | { status_code: 501; error: string }
>;
