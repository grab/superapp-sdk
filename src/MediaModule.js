/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from './ModuleBase';

export class MediaModule extends ModuleBase {
  constructor() {
    super('MediaModule');
  }

  playDRMContent(data) {
    return window.WrappedMediaModule.invoke('playDRMContent', { data });
  }
}
