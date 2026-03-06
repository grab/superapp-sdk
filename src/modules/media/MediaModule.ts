/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { DRMContentConfig, PlayDRMContentResponse, ObserveDRMPlaybackResponse } from './types';

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
   * @param data - The DRM content configuration.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Playback initiated (streaming)
   * - `204`: Invalid parameters
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { MediaModule, isResponseOk, isResponseNoContent } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { MediaModule, isResponseOk, isResponseNoContent } = window.SuperAppSDK;
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
   *   if (isResponseOk(response)) {
   *     console.log('Playback initiated');
   *   } else if (isResponseNoContent(response)) {
   *     console.log('Invalid parameters');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  playDRMContent(data: DRMContentConfig): Promise<PlayDRMContentResponse> {
    return this.wrappedModule.invoke('playDRMContent', { data });
  }

  /**
   * Observes DRM-protected media content playback events.
   *
   * @param data - The DRM content configuration.
   *
   * @returns A `DataStream` that emits playback events as the media plays.
   * Emits `200` responses with video player events.
   * Use `subscribe()` to listen for events.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { MediaModule, isResponseOk } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { MediaModule, isResponseOk } = window.SuperAppSDK;
   *
   * // Initialize the media module
   * const mediaModule = new MediaModule();
   *
   * // Observe DRM content playback
   * const subscription = mediaModule.observePlayDRMContent({
   *   // DRM content configuration
   * }).subscribe({
   *   next: (response) => {
   *     if (isResponseOk(response)) {
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
    return this.wrappedModule.invoke('observePlayDRMContent', {
      data,
    }) as ObserveDRMPlaybackResponse;
  }
}
