/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeNoContentSchema, bridgeOkSchema } from '../../core';

/**
 * Internal valibot schema for the raw bridge response from setBackgroundColor.
 * Used to validate the response from the native bridge before transformation.
 *
 * @internal
 */
export const RawSetBackgroundColorResponseSchema = v.union([
  bridgeOkSchema(v.boolean()),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

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
 * Internal valibot schema for the raw bridge response from setTitle.
 * Used to validate the response from the native bridge before transformation.
 *
 * @internal
 */
export const RawSetTitleResponseSchema = v.union([
  bridgeOkSchema(v.boolean()),
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
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Internal valibot schema for the raw bridge response from hideBackButton.
 * Used to validate the response from the native bridge before transformation.
 *
 * @internal
 */
export const RawHideBackButtonResponseSchema = v.union([
  bridgeOkSchema(v.boolean()),
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link HideBackButtonResponse}.
 *
 * @public
 */
export const HideBackButtonResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Internal valibot schema for the raw bridge response from showBackButton.
 * Used to validate the response from the native bridge before transformation.
 *
 * @internal
 */
export const RawShowBackButtonResponseSchema = v.union([
  bridgeOkSchema(v.boolean()),
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link ShowBackButtonResponse}.
 *
 * @public
 */
export const ShowBackButtonResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Internal valibot schema for the raw bridge response from hideRefreshButton.
 * Used to validate the response from the native bridge before transformation.
 *
 * @internal
 */
export const RawHideRefreshButtonResponseSchema = v.union([
  bridgeOkSchema(v.boolean()),
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link HideRefreshButtonResponse}.
 *
 * @public
 */
export const HideRefreshButtonResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Internal valibot schema for the raw bridge response from showRefreshButton.
 * Used to validate the response from the native bridge before transformation.
 *
 * @internal
 */
export const RawShowRefreshButtonResponseSchema = v.union([
  bridgeOkSchema(v.boolean()),
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link ShowRefreshButtonResponse}.
 *
 * @public
 */
export const ShowRefreshButtonResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Internal valibot schema for the raw bridge response from close.
 * Used to validate the response from the native bridge before transformation.
 *
 * @internal
 */
export const RawCloseResponseSchema = v.union([
  bridgeOkSchema(v.boolean()),
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link CloseResponse}.
 *
 * @public
 */
export const CloseResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link OnContentLoadedResponse}.
 *
 * @public
 */
export const OnContentLoadedResponseSchema = v.union([
  bridgeOkSchema(v.boolean()),
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Internal valibot schema for the raw bridge response from showLoader.
 * Used to validate the response from the native bridge before transformation.
 *
 * @internal
 */
export const RawShowLoaderResponseSchema = v.union([
  bridgeOkSchema(v.boolean()),
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link ShowLoaderResponse}.
 *
 * @public
 */
export const ShowLoaderResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Internal valibot schema for the raw bridge response from hideLoader.
 * Used to validate the response from the native bridge before transformation.
 *
 * @internal
 */
export const RawHideLoaderResponseSchema = v.union([
  bridgeOkSchema(v.boolean()),
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link HideLoaderResponse}.
 *
 * @public
 */
export const HideLoaderResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Internal valibot schema for the raw bridge response from openExternalLink.
 * Used to validate the response from the native bridge before transformation.
 *
 * @internal
 */
export const RawOpenExternalLinkResponseSchema = v.union([
  bridgeOkSchema(v.boolean()),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link OpenExternalLinkResponse}.
 *
 * @public
 */
export const OpenExternalLinkResponseSchema = v.union([
  bridgeNoContentSchema,
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
  bridgeOkSchema(v.boolean()),
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
 * Internal valibot schema for the raw bridge response from sendAnalyticsEvent.
 * Used to validate the response from the native bridge before transformation.
 *
 * @internal
 */
export const RawSendAnalyticsEventResponseSchema = v.union([
  bridgeOkSchema(v.boolean()),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link SendAnalyticsEventResponse}.
 *
 * @public
 */
export const SendAnalyticsEventResponseSchema = v.union([
  bridgeNoContentSchema,
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
  bridgeOkSchema(IsConnectedResultSchema),
  bridgeErrorSchema(404),
]);

/**
 * Valibot schema for {@link GetSessionParamsResult}.
 *
 * @public
 */
export const GetSessionParamsResultSchema = v.string();

/**
 * Valibot schema for {@link GetSessionParamsResponse}.
 *
 * @public
 */
export const GetSessionParamsResponseSchema = v.union([
  bridgeOkSchema(GetSessionParamsResultSchema),
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
