/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { PlayDRMContentResponseSchema } from './schemas';
import { DRMContentConfig, ObserveDRMPlaybackResponse, PlayDRMContentResponse } from './types';

/**
 * Module for playing DRM-protected media content via JSBridge.
 *
 * @group Modules
 * @category Media
 *
 * @remarks
 * Provides access to the native media player with DRM support for secure content playback.
 * This code must run on the Grab SuperApp's WebView to function correctly.
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
 * <script>
 *   const media = new SuperAppSDK.MediaModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class MediaModule extends BaseModule {
  constructor() {
    super('MediaModule');
  }

  /**
   * Plays DRM-protected media content in the native media player.
   *
   * @requiredOAuthScope mobile.media
   *
   * @param data - DRM playback configuration sent to the native player (provider-specific record; see `DRMContentConfig` type for example shapes).
   * Request fields:
   * - Keys and values follow the native DRM contract (commonly include `licenseUrl`, `contentUrl`, `contentId` / `assetId`, `certificateUrl`, `headers`, etc.).
   *
   * @returns A response with one of the following status codes:
   * - `200`: OK - native player returned an initial playback event. The `result` is {@link PlayDRMContentResult}.
   * - `204`: No content - request succeeded.
   * - `400`: Bad request - invalid or rejected DRM configuration.
   * - `424`: Failed dependency - for example a DRM or platform prerequisite could not be satisfied.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @remarks
   * Requires proper DRM content configuration including license URL and content metadata.
   * For playback events and status updates, use {@link MediaModule.observePlayDRMContent}.
   *
   * @example
   * ```typescript
   * import { MediaModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the media module
   * const media = new MediaModule();
   *
   * // Play DRM-protected content in the native player
   * const response = await media.playDRMContent({
   *   // DRM content configuration
   * });
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Playback initiated');
   *       break;
   *     case 204:
   *       console.log('Invalid parameters');
   *       break;
   *   }
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async playDRMContent(data: DRMContentConfig): Promise<PlayDRMContentResponse> {
    const response = (await this.invoke({
      method: 'playDRMContent',
      params: { data },
    })) as PlayDRMContentResponse;

    const responseError = this.validate(PlayDRMContentResponseSchema, response);
    if (responseError)
      this.logger.warn('playDRMContent', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Observes DRM-protected media content playback events.
   *
   * @requiredOAuthScope mobile.media
   *
   * @param data - Same DRM configuration shape as `playDRMContent`; forwarded to the native player for the observation stream.
   * Request fields:
   * - Same provider-specific keys as for `playDRMContent` (see `DRMContentConfig`).
   *
   * @returns Emits playback events as the media plays.
   * Use `subscribe()` to listen for updates, or `await` to get the first value only.
   *
   * Stream results can have the following status codes:
   * - `200`: OK - playback event received successfully. The `result` is {@link DRMPlaybackEvent}.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @remarks
   * Subscribe to this stream to receive real-time playback events such as progress,
   * completion, and errors. Remember to call `unsubscribe()` when done to free resources.
   *
   * @example
   * ```typescript
   * import { MediaModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the media module
   * const media = new MediaModule();
   *
   * // Subscribe to DRM playback events
   * const subscription = media.observePlayDRMContent({
   *   // DRM content configuration
   * }).subscribe({
   *   next: (response) => {
   *     if (isSuccess(response)) {
   *       console.log('Playback event:', response.result);
   *     } else if (isError(response)) {
   *       console.error(`Error ${response.status_code}: ${response.error}`);
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
    return this.invokeStream({
      method: 'observePlayDRMContent',
      params: { data },
    }) as ObserveDRMPlaybackResponse;
  }
}
