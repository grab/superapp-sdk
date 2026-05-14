/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { sdkErrorResponseSchema, sdkOkResponseSchema } from '../../core';
import type { RedirectToSystemWebViewRequest, RedirectToSystemWebViewResponse } from './types';

/**
 * Valibot schema for {@link RedirectToSystemWebViewRequest}.
 *
 * @internal
 */
export const RedirectToSystemWebViewRequestSchema: v.GenericSchema<RedirectToSystemWebViewRequest> =
  v.object({
    url: v.pipe(v.string(), v.url()),
  });

/**
 * Valibot schema for {@link RedirectToSystemWebViewResponse}.
 *
 * @internal
 */
export const RedirectToSystemWebViewResponseSchema: v.GenericSchema<RedirectToSystemWebViewResponse> =
  v.union([
    sdkOkResponseSchema(v.string()),
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(424),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]);
