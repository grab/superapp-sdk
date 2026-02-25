/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as bridgeSDK from '@grabjs/mobile-kit-bridge-sdk';

/**
 * Base class for all SDK modules
 * Handles common initialization logic for bridge SDK wrapping
 */
export class ModuleBase {
  name: string;

  constructor(moduleName: string) {
    this.name = moduleName;

    if ((window as unknown as Record<string, unknown>)[`Wrapped${this.name}`]) {
      console.warn(`[@grabjs/superapp-sdk] ${this.name} module is already initialized`);
      return;
    }

    if (!bridgeSDK || typeof bridgeSDK.wrapModule !== 'function') {
      console.error(
        `[@grabjs/superapp-sdk] Bridge SDK not available. Make sure you are running in a supported environment.`
      );
      throw new Error(
        'Bridge SDK not available. Make sure you are running in a supported environment.'
      );
    }
    try {
      bridgeSDK.wrapModule(window, this.name);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[@grabjs/superapp-sdk] Failed to initialize ${this.name}: ${errorMessage}`);
      throw new Error(`Failed to initialize ${this.name}: ${errorMessage}`);
    }
  }
}
