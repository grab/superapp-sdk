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
   * Returns a data stream emitting events on the video playback status.
   *
   * **Event Types:**
   * - `START_PLAYBACK`: Emitted when the video starts playing
   * - `STOP_PLAYBACK`: Emitted when the video stops playing
   * - `PROGRESS_PLAYBACK`: Emitted every 10 seconds
   *
   * @param request - Video data containing URLs and identifiers
   * @param data.content - Content URL for playback
   * @param data.certificate - DRM certificate URL
   * @param data.license - DRM licence URL
   * @param data.titleId - Playback item identifier
   * @returns Promise that resolves to a stream of playback status events. Each event contains:
   *   - `type`: Type of the event (START_PLAYBACK, STOP_PLAYBACK, PROGRESS_PLAYBACK)
   *   - `titleId`: Playback item identifier
   *   - `length`: Length of the video (in seconds)
   *   - `position`: The current position of the video (in seconds)
   *
   * @example
   * ```javascript
   * try {
   *   // This is for backward compatibility, since older app
   *   // versions do not support this syntax.
   *   mediaModule
   *     .playDRMContent({
   *       content: 'content-url-here',
   *       certificate: 'certificate-url-here',
   *       license: 'license-url-here',
   *       titleId: 'title-id-here'
   *     })
   *     .subscribe({
   *       next: ({ result, error, status_code }) => {
   *         if (!!result) {
   *           const { type, titleId, length, position } = result;
   *           // Do what we want with the data here.
   *         } else if (!!error) {
   *           // Handle error here.
   *         }
   *       },
   *       complete: () => {
   *         // Completion logic here when the stream stops.
   *       }
   *     });
   * } catch (e) {
   *   // Fallback to old way to ensure the video still plays.
   * }
   * ```
   *
   * @example
   * Response example:
   * ```json
   * {
   *   "status_code": 200,
   *   "result": {
   *     "type": "PROGRESS_PLAYBACK",
   *     "titleId": "2o23asdf1asd123",
   *     "length": 3600,
   *     "position": 1800
   *   }
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
