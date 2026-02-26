/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import StorageModule from './StorageModule';

export default StorageModule;

export type {
  // SetXXX
  SetResponse,
  SetSuccessResponse,
  SetErrorResponse,

  // GetBoolean
  GetBooleanResponse,
  GetBooleanSuccessResponse,
  GetBooleanNoResultResponse,
  GetBooleanErrorResponse,

  // GetInt
  GetIntResponse,
  GetIntSuccessResponse,
  GetIntNoResultResponse,
  GetIntErrorResponse,

  // GetString
  GetStringResponse,
  GetStringSuccessResponse,
  GetStringNoResultResponse,
  GetStringErrorResponse,

  // GetDouble
  GetDoubleResponse,
  GetDoubleSuccessResponse,
  GetDoubleNoResultResponse,
  GetDoubleErrorResponse,

  // Remove
  RemoveResponse,
  RemoveSuccessResponse,
  RemoveErrorResponse,

  // RemoveAll
  RemoveAllResponse,
  RemoveAllSuccessResponse,
  RemoveAllErrorResponse,
} from './types';
