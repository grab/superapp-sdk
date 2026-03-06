/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { wrapModule } from '@grabjs/mobile-kit-bridge-sdk';
import { WrappedModule } from '../../types/global';

/**
 * Base class for all JSBridge modules.
 *
 * @remarks
 * On construction, the class wraps the JSBridge module on `window` (e.g., `WrappedContainerModule`).
 * This code must run on the Grab SuperApp's webview to function correctly.
 *
 * @public
 */
export class BaseModule {
  /**
   * The module name used to identify the JSBridge module.
   */
  private readonly name: string;

  /**
   * Returns the wrapped JSBridge module from the global `window` object.
   *
   * @returns The wrapped module instance with native method bindings.
   *
   * @internal
   */
  protected get wrappedModule(): WrappedModule {
    return window[`Wrapped${this.name}`] as WrappedModule;
  }

  /**
   * Creates a new module instance and wraps it on the global `window` object.
   *
   * @param moduleName - The name of the module (e.g., "ContainerModule", "ProfileModule").
   * @throws Error when the bridge SDK fails to wrap the module.
   */
  constructor(moduleName: string) {
    this.name = moduleName;

    if (this.wrappedModule) {
      // Module is already initialized
      return;
    }

    try {
      wrapModule(window, this.name);
    } catch (error) {
      throw new Error(`Failed to initialize ${this.name}: ${error.message}`, { cause: error });
    }
  }
}
