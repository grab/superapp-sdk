/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StorageModule } from './StorageModule';

export default StorageModule;

export type {
  GetBooleanErrorResponse,
  GetBooleanNoResultResponse,
  // GetBoolean
  GetBooleanResponse,
  GetBooleanSuccessResponse,
  GetDoubleErrorResponse,
  GetDoubleNoResultResponse,
  // GetDouble
  GetDoubleResponse,
  GetDoubleSuccessResponse,
  GetIntErrorResponse,
  GetIntNoResultResponse,
  // GetInt
  GetIntResponse,
  GetIntSuccessResponse,
  GetStringErrorResponse,
  GetStringNoResultResponse,
  // GetString
  GetStringResponse,
  GetStringSuccessResponse,
  RemoveAllErrorResponse,
  // RemoveAll
  RemoveAllResponse,
  RemoveAllSuccessResponse,
  RemoveErrorResponse,
  // Remove
  RemoveResponse,
  RemoveSuccessResponse,
  SetErrorResponse,
  // SetXXX
  SetResponse,
  SetSuccessResponse,
} from './types';
