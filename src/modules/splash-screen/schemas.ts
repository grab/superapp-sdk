/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { sdkErrorResponseSchema, sdkNoContentResponseSchema } from '../../core';
import type { DismissSplashScreenResponse } from './types';

/**
 * Valibot schema for {@link DismissSplashScreenResponse}.
 *
 * @group Modules
 * @category Splash Screen
 *
 * @public
 */
export const DismissSplashScreenResponseSchema: v.GenericSchema<DismissSplashScreenResponse> =
  v.union([
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(403),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]);
