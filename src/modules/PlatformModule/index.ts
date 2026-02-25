/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { BackResponse } from './type';

export class PlatformModule extends ModuleBase {
  constructor() {
    super('PlatformModule');
  }

  /**
   * Navigate back to the host application
   * @returns Promise that resolves when navigation completes
   */
  back(): Promise<BackResponse> {
    return window.WrappedPlatformModule.invoke('back');
  }
}

export type { BackResponse } from './type';
