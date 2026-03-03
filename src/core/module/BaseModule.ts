/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { wrapModule } from '@grabjs/mobile-kit-bridge-sdk';

/**
 * Base class for all JSBridge modules.
 *
 * @remarks
 * On construction, the class wraps the module on `window` (e.g., `WrappedContainerModule`), enabling invocation of native methods.
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
 *
 * @public
 */
export class BaseModule {
  private readonly name: string;

  /**
   * Creates a new module instance and wraps it on the global `window` object.
   *
   * @param moduleName - The name of the module (e.g., "ContainerModule", "ProfileModule").
   * @throws Error when the bridge SDK fails to wrap the module.
   */
  constructor(moduleName: string) {
    this.name = moduleName;

    if (window[`Wrapped${this.name}`]) {
      // Module is already initialized
      return;
    }

    try {
      wrapModule(window, this.name);
    } catch (error) {
      throw new Error(`Failed to initialize ${this.name}: ${error.message}`);
    }
  }
}
