/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as bridgeSDK from '@grabjs/mobile-kit-bridge-sdk';

import { getErrorForLog, getErrorMessage } from '../../utils';
import { logger } from '../logger';

/**
 * Base class for all SDK modules. Handles common initialization logic for bridge SDK wrapping.
 *
 * @remarks
 * Each module extends BaseModule and delegates to the native host via the bridge SDK. On construction,
 * the class wraps the module on `window` (e.g., `WrappedContainerModule`), enabling invocation of native methods.
 *
 * **Duplicate initialization:** If the module is already wrapped, a warning is logged and construction returns early.
 *
 * **Environment requirements:** Requires `@grabjs/mobile-kit-bridge-sdk` with `wrapModule` available.
 * Must run inside a supported environment (e.g., Grab app webview).
 */
export class BaseModule {
  private readonly name: string;

  /**
   * Creates a new module instance and wraps it on the global window object.
   *
   * @param moduleName - The name of the module (e.g., "ContainerModule", "ProfileModule").
   * Used to create the wrapped global (e.g., `WrappedContainerModule`).
   *
   * @throws Error when the bridge SDK is not available or when wrapModule fails.
   */
  constructor(moduleName: string) {
    this.name = moduleName;

    if ((window as unknown as Record<string, unknown>)[`Wrapped${this.name}`]) {
      logger.warn(`${this.name} module is already initialized`, this.name);
      // Early return: skip wrapModule. The new instance remains valid because it delegates
      // to the existing window.WrappedX set by the first instance. No re-wrap needed.
      return;
    }

    if (!bridgeSDK || typeof bridgeSDK.wrapModule !== 'function') {
      const errorMessage =
        'Bridge SDK not available. Make sure you are running in a supported environment.';
      logger.error(errorMessage, this.name);
      throw new Error(errorMessage);
    }

    try {
      bridgeSDK.wrapModule(window, this.name);
      logger.debug(`${this.name} module initialized successfully`, this.name);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      logger.error(
        `Failed to initialize ${this.name}: ${errorMessage}`,
        this.name,
        getErrorForLog(error)
      );
      throw new Error(`Failed to initialize ${this.name}: ${errorMessage}`);
    }
  }
}
