/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseModule } from '../../core';
import type { PlayDRMContentRequest, PlayDRMContentResponse } from './types';

/**
 * Provides functionality to open a media player for DRM-protected content.
 *
 * @remarks
 * The MediaModule enables miniapps to play Digital Rights Management (DRM) protected video
 * content through the Grab app's native media player. Playback events are streamed back to
 * provide real-time status updates.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { MediaModule } from '@grabjs/superapp-sdk';
 *
 * const mediaModule = new MediaModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const mediaModule = new SuperAppSDK.MediaModule();
 * </script>
 * ```
 */
export class MediaModule extends BaseModule {
  constructor() {
    super('MediaModule');
  }

  /**
   * Play DRM-protected content in the native media player.
   *
   * @remarks
   * This method initiates DRM content playback and returns the initial response.
   *
   * **Event Types:** (see {@link PlaybackEventType})
   * - `START_PLAYBACK`: Emitted when the video starts playing
   * - `STOP_PLAYBACK`: Emitted when the video stops playing
   * - `PROGRESS_PLAYBACK`: Emitted every 10 seconds during playback
   *
   * **Event Data:**
   * - `type`: Type of the event ({@link PlaybackEventType})
   * - `titleId`: Playback item identifier
   * - `length`: Length of the video (in seconds)
   * - `position`: The current position of the video (in seconds)
   *
   * @param request - Video data for DRM content playback.
   *
   * @returns Promise that resolves to {@link PlayDRMContentResponse}.
   *
   * @see {@link PlaybackEventType}
   *
   * @example
   * Basic usage:
   * ```typescript
   * try {
   *   const response = await mediaModule.playDRMContent({
   *     content: 'https://example.com/content.mpd',
   *     certificate: 'https://example.com/cert.cer',
   *     license: 'https://example.com/license',
   *     titleId: 'video-123'
   *   });
   *   if (response.status_code === 200) {
   *     const { type, position, length } = response.result;
   *     console.log(`Playback event: ${type} at ${position}s / ${length}s`);
   *   }
   * } catch (error) {
   *   console.error('DRM playback not supported:', error);
   * }
   * ```
   *
   * @example
   * Handling the response:
   * ```typescript
   * try {
   *   const response = await mediaModule.playDRMContent({
   *     content: 'https://example.com/content.mpd',
   *     certificate: 'https://example.com/cert.cer',
   *     license: 'https://example.com/license',
   *     titleId: 'video-123'
   *   });
   *
   *   switch (response.status_code) {
   *     case 200:
   *       const { type, titleId, length, position } = response.result;
   *       if (type === 'START_PLAYBACK') {
   *         console.log('Video started:', titleId);
   *       } else if (type === 'PROGRESS_PLAYBACK') {
   *         console.log(`Progress: ${position}s / ${length}s`);
   *         updateProgressBar(position, length);
   *       } else if (type === 'STOP_PLAYBACK') {
   *         console.log('Video stopped');
   *       }
   *       break;
   *     case 400:
   *       console.error('Invalid request:', response.error);
   *       break;
   *     case 403:
   *       console.error('DRM permission denied:', response.error);
   *       break;
   *     case 500:
   *       console.error('Playback error:', response.error);
   *       break;
   *   }
   * } catch (error) {
   *   console.error('DRM playback not supported:', error);
   * }
   * ```
   */
  playDRMContent(request: PlayDRMContentRequest): Promise<PlayDRMContentResponse> {
    return window.WrappedMediaModule.invoke('playDRMContent', { data: request });
  }
}
