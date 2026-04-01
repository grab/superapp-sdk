/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeNoContentSchema } from '../../core';

/**
 * Valibot schema for {@link DownloadFileRequest}.
 *
 * @public
 */
export const DownloadFileRequestSchema = v.object({
  fileUrl: v.pipe(v.string(), v.url()),
  fileName: v.pipe(v.string(), v.minLength(1)),
});

/**
 * Valibot schema for {@link DownloadFileResponse}.
 *
 * @public
 */
export const DownloadFileResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
