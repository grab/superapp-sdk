/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { CoordinateResponse, CountryCodeResponse } from './type';

export class LocationModule extends ModuleBase {
  constructor() {
    super('LocationModule');
  }

  /**
   * Get current user coordinate
   * @returns Promise that resolves to coordinate response with latitude and longitude
   */
  getCoordinate(): Promise<CoordinateResponse> {
    return window.WrappedLocationModule.invoke('getCoordinate');
  }

  /**
   * Stream current user coordinates
   * @returns Promise that resolves to coordinate response with latitude and longitude
   */
  observeLocationChange(): Promise<CoordinateResponse> {
    return window.WrappedLocationModule.invoke('observeLocationChange');
  }

  /**
   * Get current user country code
   * @returns Promise that resolves to country code response
   */
  getCountryCode(): Promise<CountryCodeResponse> {
    return window.WrappedLocationModule.invoke('getCountryCode');
  }
}

export type {
  CoordinateResult,
  CoordinateResponse,
  CountryCodeResult,
  CountryCodeResponse,
} from './type';
