/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { PlayDRMContentRequest, PlayDRMContentResponse } from './type';

/**
 * The MediaModule provides functionality to open a media player for DRM-protected content.
 *
 * @example
 * ```javascript
 * import { MediaModule } from '@grabjs/superapp-sdk';
 *
 * const mediaModule = new MediaModule();
 * ```
 */
class MediaModule extends ModuleBase {
  constructor() {
    super('MediaModule');
  }

  /**
   * Play DRM-protected content in the native media player.
   *
   * @remarks
   * This method returns a data stream that emits events about the video playback status.
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
   * @param request - Video data containing URLs and identifiers.
   *   - `content`: Content URL for playback
   *   - `certificate`: DRM certificate URL
   *   - `license`: DRM licence URL
   *   - `titleId`: Playback item identifier
   *
   * @returns Promise that resolves to a stream of {@link PlayDRMContentResponse} with playback status events.
   *
   * @see {@link PlaybackEventType}
   *
   * @example
   * ```javascript
   * // Subscribe to playback events
   * try {
   *   mediaModule
   *     .playDRMContent({
   *       content: 'https://example.com/content.mpd',
   *       certificate: 'https://example.com/cert.cer',
   *       license: 'https://example.com/license',
   *       titleId: 'video-123'
   *     })
   *     .subscribe({
   *       next: ({ result, error, status_code }) => {
   *         if (result) {
   *           const { type, titleId, length, position } = result;
   *           
   *           if (type === 'START_PLAYBACK') {
   *             console.log('Video started:', titleId);
   *           } else if (type === 'PROGRESS_PLAYBACK') {
   *             console.log(`Progress: ${position}s / ${length}s`);
   *             updateProgressBar(position, length);
   *           } else if (type === 'STOP_PLAYBACK') {
   *             console.log('Video stopped');
   *           }
   *         } else if (error) {
   *           console.error('Playback error:', error);
   *         }
   *       },
   *       complete: () => {
   *         console.log('Playback stream completed');
   *       }
   *     });
   * } catch (e) {
   *   // Fallback for older app versions that don't support this method
   *   console.error('DRM playback not supported:', e);
   * }
   * ```
   */
  playDRMContent(request: PlayDRMContentRequest): Promise<PlayDRMContentResponse> {
    return window.WrappedMediaModule.invoke('playDRMContent', { data: request });
  }
}

export default MediaModule;

export type {
  // PlayDRMContent
  PlayDRMContentRequest,
  PlayDRMContentResponse,
  PlaybackStatusResult,
  PlaybackEventType,
} from './type';
