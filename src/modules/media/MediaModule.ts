/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { DRMContentConfig, ObserveDRMPlaybackResponse, PlayDRMContentResponse } from './types';

/**
 * JSBridge module for playing DRM-protected media content.
 *
 * @group Modules
 *
 * @remarks
 * Provides access to the native media player with DRM support for secure content playback.
 * This code must run on the Grab SuperApp's webview to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { MediaModule } from '@grabjs/superapp-sdk';
 * const media = new MediaModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const media = new SuperAppSDK.MediaModule();
 * </script>
 * ```
 *
 * @public
 */
export class MediaModule extends BaseModule {
  constructor() {
    super('MediaModule');
  }

  /**
   * Plays DRM-protected media content in the native media player.
   *
   * @param data - Configuration for the DRM content including license URL and content metadata.
   *
   * @returns The playback initiation result, indicating if the DRM content started playing.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { MediaModule } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { MediaModule } = window.SuperAppSDK;
   *
   * // Initialize the media module
   * const mediaModule = new MediaModule();
   *
   * // Play DRM content
   * try {
   *   const response = await mediaModule.playDRMContent({
   *     // DRM content configuration
   *   });
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Playback initiated');
   *       break;
   *     case 204:
   *       console.log('Invalid parameters');
   *       break;
   *     case 501:
   *       console.log('Not in Grab app:', response.error);
   *       break;
   *     default:
   *       console.log('Unexpected status code:', response);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  playDRMContent(data: DRMContentConfig): PlayDRMContentResponse {
    return this.invoke('playDRMContent', { data });
  }

  /**
   * Observes DRM-protected media content playback events.
   *
   * @param data - Configuration for the DRM content to observe.
   *
   * @returns A stream that emits playback events as the media plays.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { MediaModule } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { MediaModule } = window.SuperAppSDK;
   *
   * // Initialize the media module
   * const mediaModule = new MediaModule();
   *
   * // Observe DRM content playback
   * const subscription = mediaModule.observePlayDRMContent({
   *   // DRM content configuration
   * }).subscribe({
   *   next: (response) => {
   *     if (response.status_code === 200) {
   *       console.log('Playback event:', response.result);
   *     }
   *   },
   *   complete: () => console.log('Playback completed')
   * });
   *
   * // Later, to stop receiving events:
   * subscription.unsubscribe();
   * ```
   *
   * @public
   */
  observePlayDRMContent(data: DRMContentConfig): ObserveDRMPlaybackResponse {
    // Streaming methods need direct access to wrappedModule
    return this.wrappedModule.invoke('observePlayDRMContent', {
      data,
    }) as ObserveDRMPlaybackResponse;
  }
}
