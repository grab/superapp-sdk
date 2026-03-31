/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema } from '../../core';

/**
 * Valibot schema for {@link RedirectToSystemWebViewRequest}.
 *
 * @public
 */
export const RedirectToSystemWebViewRequestSchema = v.object({
  url: v.pipe(v.string(), v.url()),
});

/**
 * Valibot schema for {@link RedirectToSystemWebViewResponse}.
 *
 * @public
 */
export const RedirectToSystemWebViewResponseSchema = v.union([
  v.object({ status_code: v.literal(200) }),
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
