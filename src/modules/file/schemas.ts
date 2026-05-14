/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { sdkErrorResponseSchema, sdkNoContentResponseSchema } from '../../core';
import type { DownloadFileRequest, DownloadFileResponse } from './types';

/**
 * Valibot schema for {@link DownloadFileRequest}.
 *
 * @internal
 */
export const DownloadFileRequestSchema: v.GenericSchema<DownloadFileRequest> = v.object({
  fileUrl: v.pipe(v.string(), v.url()),
  fileName: v.pipe(v.string(), v.minLength(1)),
});

/**
 * Valibot schema for {@link DownloadFileResponse}.
 *
 * @internal
 */
export const DownloadFileResponseSchema: v.GenericSchema<DownloadFileResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
