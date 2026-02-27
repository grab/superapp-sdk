/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LocationModule from './LocationModule';

export default LocationModule;

export type {
  // GetCoordinate
  GetCoordinateResponse,
  GetCoordinateSuccessResponse,
  GetCoordinateErrorResponse,
  GetCoordinateResult,

  // GetCountryCode
  GetCountryCodeResponse,
  GetCountryCodeSuccessResponse,
  GetCountryCodeNoResultResponse,
  GetCountryCodeErrorResponse,
  GetCountryCodeResult,
} from './types';
