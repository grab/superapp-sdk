/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { VideoData, PlayDRMContentResponse } from './type';

export class MediaModule extends ModuleBase {
  constructor() {
    super('MediaModule');
  }

  /**
   * Play DRM protected content
   * @param data - Video data containing content URL, certificate, license, and title ID
   * @returns Promise that resolves to playback status events
   */
  playDRMContent(data: VideoData): Promise<PlayDRMContentResponse> {
    return window.WrappedMediaModule.invoke('playDRMContent', { data });
  }
}

export { PlaybackEventType } from './type';
export type { VideoData, PlaybackStatusResult, PlayDRMContentResponse } from './type';
