/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';

/**
 * JSBridge module for playing DRM-protected media content.
 *
 * @group Modules
 *
 * @remarks
 * Provides access to the native media player with DRM support for secure content playback.
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
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

  playDRMContent(data) {
    return window.WrappedMediaModule!.invoke('playDRMContent', { data });
  }

  observePlayDRMContent(data) {
    return window.WrappedMediaModule!.invoke('observePlayDRMContent', { data });
  }
}
