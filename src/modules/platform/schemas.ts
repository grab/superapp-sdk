/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { sdkErrorResponseSchema, sdkNoContentResponseSchema } from '../../core';

/**
 * Valibot schema for {@link BackResponse}.
 *
 * @group Modules
 * @category Platform
 *
 * @public
 */
export const BackResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
