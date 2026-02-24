/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from './ModuleBase';

export class LocationModule extends ModuleBase {
  constructor() {
    super('LocationModule');
  }

  getCoordinate() {
    return window.WrappedLocationModule.invoke('getCoordinate');
  }
  
  observeLocationChange() {
    return window.WrappedLocationModule.invoke('observeLocationChange');
  }

  getCountryCode() {
    return window.WrappedLocationModule.invoke('getCountryCode');
  }
}
