/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import {
  sdkErrorResponseSchema,
  sdkNoContentResponseSchema,
  sdkOkResponseSchema,
} from '../../core';
import type { OpenSharePanelRequest, OpenSharePanelResponse, OpenSharePanelResult } from './types';

const MAX_CONTENT_UTF16_CODE_UNITS = 2_000;
const MAX_TRIGGER_SOURCE_CHARACTERS = 64;
const MAX_REQUEST_UTF8_BYTES = 8 * 1_024;

const isNotBlank = (value: string): boolean => value.trim().length > 0;

/** Valibot schema for {@link OpenSharePanelRequest}. */
export const OpenSharePanelRequestSchema: v.GenericSchema<OpenSharePanelRequest> = v.pipe(
  v.strictObject({
    content: v.pipe(
      v.string(),
      v.check(isNotBlank, 'Content must not be blank'),
      v.maxLength(
        MAX_CONTENT_UTF16_CODE_UNITS,
        `Content must not exceed ${MAX_CONTENT_UTF16_CODE_UNITS} UTF-16 code units`
      )
    ),
    triggerSource: v.optional(
      v.pipe(
        v.string(),
        v.maxLength(MAX_TRIGGER_SOURCE_CHARACTERS),
        v.regex(
          /^[a-z0-9_]+$/,
          'Trigger source must contain only lower-case letters, digits, and _'
        )
      )
    ),
    enableIndividualRecipients: v.optional(v.boolean()),
    enableGroupRecipients: v.optional(v.boolean()),
  }),
  v.check(
    (request) =>
      new TextEncoder().encode(JSON.stringify(request)).byteLength <= MAX_REQUEST_UTF8_BYTES,
    `Serialized request must not exceed ${MAX_REQUEST_UTF8_BYTES} UTF-8 bytes`
  )
);

/** Valibot schema for {@link OpenSharePanelResult}. */
export const OpenSharePanelResultSchema: v.GenericSchema<OpenSharePanelResult> = v.variant(
  'outcome',
  [
    v.strictObject({ outcome: v.literal('target_selected') }),
    v.strictObject({ outcome: v.literal('recipients_selected') }),
  ]
);

/** Valibot schema for {@link OpenSharePanelResponse}. */
export const OpenSharePanelResponseSchema: v.GenericSchema<OpenSharePanelResponse> = v.variant(
  'status_code',
  [
    sdkOkResponseSchema(OpenSharePanelResultSchema),
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(403),
    sdkErrorResponseSchema(424),
    sdkErrorResponseSchema(426),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]
);
