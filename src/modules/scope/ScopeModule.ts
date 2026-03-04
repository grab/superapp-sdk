/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';

/**
 * JSBridge module for checking and refreshing API access permissions.
 *
 * @group Modules
 *
 * @remarks
 * Manages OAuth scope permissions to determine which JSBridge modules and methods the MiniApp has access to.
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { ScopeModule } from '@grabjs/superapp-sdk';
 * const scope = new ScopeModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const scope = new SuperAppSDK.ScopeModule();
 * </script>
 * ```
 *
 * @public
 */
export class ScopeModule extends BaseModule {
  constructor() {
    super('ScopeModule');
  }

  hasAccessTo(module, method) {
    return this.wrappedModule.invoke('hasAccessTo', { module, method });
  }
  reloadScopes() {
    return this.wrappedModule.invoke('reloadScopes');
  }
}
