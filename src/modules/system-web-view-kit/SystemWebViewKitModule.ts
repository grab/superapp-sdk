/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';

/**
 * JSBridge module for opening URLs in the device's system browser.
 *
 * @remarks
 * Allows MiniApps to redirect users to external content using the native system webview.
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { SystemWebViewKitModule } from '@grabjs/superapp-sdk';
 * const webViewKit = new SystemWebViewKitModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const webViewKit = new SuperAppSDK.SystemWebViewKitModule();
 * </script>
 * ```
 *
 * @public
 */
export class SystemWebViewKitModule extends BaseModule {
  constructor() {
    super('SystemWebViewKitModule');
  }

  redirectToSystemWebView(payload) {
    return window.WrappedSystemWebViewKitModule!.invoke('redirectToSystemWebView', payload);
  }
}
