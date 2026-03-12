/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { wrapModule } from '@grabjs/mobile-kit-bridge-sdk';

import { WrappedModule } from '../../types/global';
import { getErrorMessage } from '../../utils/error';
import { isRunningInGrabApp } from '../../utils/user-agent';
import { BridgeResponse } from '../response/types';
import { DataStream } from '../stream';

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
    return (window as unknown as Record<string, WrappedModule>)[`Wrapped${this.name}`];
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
      throw new Error(`Failed to initialize ${this.name}: ${getErrorMessage(error)}`, {
        cause: error,
      });
    }
  }

  /**
   * Invokes a JSBridge method with automatic environment checking.
   *
   * @remarks
   * This method checks if the code is running in the Grab app before invoking the JSBridge.
   * If not running in the Grab app, it returns a 501 (Not Implemented) response.
   * For methods that need to work outside the Grab app, use `this.wrappedModule.invoke()` directly.
   *
   * @param method - The name of the JSBridge method to invoke.
   * @param params - The parameters to pass to the method.
   * @returns A promise resolving to the JSBridge response, or a 501 error if not in Grab app.
   *
   * @internal
   */
  invoke<T>(method: string, params?: unknown): Promise<BridgeResponse<T>> | DataStream<T> {
    try {
      if (!isRunningInGrabApp()) {
        return Promise.resolve({
          status_code: 501,
          error: 'Not implemented: This method requires the Grab app environment',
        });
      }
      return this.wrappedModule.invoke(method, params);
    } catch {
      return Promise.resolve({
        status_code: 500,
        error: `Failed to invoke method`,
      });
    }
  }
}
