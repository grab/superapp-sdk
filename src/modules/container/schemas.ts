/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import {
  bridgeErrorSchema,
  bridgeNoContentSchema,
  bridgeOkSchema,
  bridgeSuccessSchema,
} from '../../core';

/**
 * Valibot schema for {@link SetBackgroundColorResponse}.
 *
 * @public
 */
export const SetBackgroundColorResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link SetTitleResponse}.
 *
 * @public
 */
export const SetTitleResponseSchema = v.union([
  bridgeOkSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link HideBackButtonResponse}.
 *
 * @public
 */
export const HideBackButtonResponseSchema = v.union([
  bridgeOkSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link ShowBackButtonResponse}.
 *
 * @public
 */
export const ShowBackButtonResponseSchema = HideBackButtonResponseSchema;
/**
 * Valibot schema for {@link HideRefreshButtonResponse}.
 *
 * @public
 */
export const HideRefreshButtonResponseSchema = HideBackButtonResponseSchema;
/**
 * Valibot schema for {@link ShowRefreshButtonResponse}.
 *
 * @public
 */
export const ShowRefreshButtonResponseSchema = HideBackButtonResponseSchema;
/**
 * Valibot schema for {@link CloseResponse}.
 *
 * @public
 */
export const CloseResponseSchema = HideBackButtonResponseSchema;
/**
 * Valibot schema for {@link OnContentLoadedResponse}.
 *
 * @public
 */
export const OnContentLoadedResponseSchema = HideBackButtonResponseSchema;
/**
 * Valibot schema for {@link ShowLoaderResponse}.
 *
 * @public
 */
export const ShowLoaderResponseSchema = HideBackButtonResponseSchema;
/**
 * Valibot schema for {@link HideLoaderResponse}.
 *
 * @public
 */
export const HideLoaderResponseSchema = HideBackButtonResponseSchema;

/**
 * Valibot schema for {@link OpenExternalLinkResponse}.
 *
 * @public
 */
export const OpenExternalLinkResponseSchema = v.union([
  bridgeOkSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link OnCtaTapResponse}.
 *
 * @public
 */
export const OnCtaTapResponseSchema = v.union([
  bridgeOkSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link SendAnalyticsEventRequest}.
 *
 * @public
 */
export const SendAnalyticsEventRequestSchema = v.object({
  state: v.pipe(v.string(), v.minLength(1)),
  name: v.pipe(v.string(), v.minLength(1)),
  data: v.optional(v.record(v.string(), v.unknown())),
});

/**
 * Valibot schema for {@link SendAnalyticsEventResponse}.
 *
 * @public
 */
export const SendAnalyticsEventResponseSchema = v.union([
  bridgeOkSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link IsConnectedResult}.
 *
 * @public
 */
export const IsConnectedResultSchema = v.object({ connected: v.boolean() });

/**
 * Valibot schema for {@link IsConnectedResponse}.
 *
 * @public
 */
export const IsConnectedResponseSchema = v.union([
  bridgeSuccessSchema(IsConnectedResultSchema),
  bridgeErrorSchema(404),
]);

/**
 * Valibot schema for {@link GetSessionParamsResult}.
 *
 * @public
 */
export const GetSessionParamsResultSchema = v.object({ result: v.string() });

/**
 * Valibot schema for {@link GetSessionParamsResponse}.
 *
 * @public
 */
export const GetSessionParamsResponseSchema = v.union([
  bridgeSuccessSchema(GetSessionParamsResultSchema),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
