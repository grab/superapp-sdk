/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as bridgeSDK from '@grabjs/mobile-kit-bridge-sdk';
import { logger } from '../logger';

/**
 * Base class for all SDK modules
 * Handles common initialization logic for bridge SDK wrapping
 */
export class BaseModule {
  private readonly name: string;

  constructor(moduleName: string) {
    this.name = moduleName;

    if ((window as unknown as Record<string, unknown>)[`Wrapped${this.name}`]) {
      logger.warn(`${this.name} module is already initialized`, this.name);
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
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error(
        `Failed to initialize ${this.name}: ${errorMessage}`,
        this.name,
        error instanceof Error ? error : undefined
      );
      throw new Error(`Failed to initialize ${this.name}: ${errorMessage}`);
    }
  }
}
