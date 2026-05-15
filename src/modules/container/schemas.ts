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

/**
 * Internal valibot schema for the raw `JSBridge` response from `setBackgroundColor`.
 * Used to validate the response from `JSBridge` before transformation.
 *
 * @internal
 */
export const RawSetBackgroundColorResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link SetBackgroundColorResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const SetBackgroundColorResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the raw `JSBridge` response from `setTitle`.
 * Used to validate the response from `JSBridge` before transformation.
 *
 * @internal
 */
export const RawSetTitleResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link SetTitleResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const SetTitleResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the raw `JSBridge` response from `hideBackButton`.
 * Used to validate the response from `JSBridge` before transformation.
 *
 * @internal
 */
export const RawHideBackButtonResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link HideBackButtonResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const HideBackButtonResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the raw `JSBridge` response from `showBackButton`.
 * Used to validate the response from `JSBridge` before transformation.
 *
 * @internal
 */
export const RawShowBackButtonResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link ShowBackButtonResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const ShowBackButtonResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the raw `JSBridge` response from `hideRefreshButton`.
 * Used to validate the response from `JSBridge` before transformation.
 *
 * @internal
 */
export const RawHideRefreshButtonResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link HideRefreshButtonResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const HideRefreshButtonResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the raw `JSBridge` response from `showRefreshButton`.
 * Used to validate the response from `JSBridge` before transformation.
 *
 * @internal
 */
export const RawShowRefreshButtonResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link ShowRefreshButtonResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const ShowRefreshButtonResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the raw `JSBridge` response from `close`.
 * Used to validate the response from `JSBridge` before transformation.
 *
 * @internal
 */
export const RawCloseResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link CloseResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const CloseResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link OnContentLoadedResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const OnContentLoadedResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the raw `JSBridge` response from `showLoader`.
 * Used to validate the response from `JSBridge` before transformation.
 *
 * @internal
 */
export const RawShowLoaderResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link ShowLoaderResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const ShowLoaderResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the raw `JSBridge` response from `hideLoader`.
 * Used to validate the response from `JSBridge` before transformation.
 *
 * @internal
 */
export const RawHideLoaderResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link HideLoaderResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const HideLoaderResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the raw `JSBridge` response from `openExternalLink`.
 * Used to validate the response from `JSBridge` before transformation.
 *
 * @internal
 */
export const RawOpenExternalLinkResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link OpenExternalLinkResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const OpenExternalLinkResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link OnCtaTapResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const OnCtaTapResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link SendAnalyticsEventRequest}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const SendAnalyticsEventRequestSchema = v.object({
  state: v.pipe(v.string(), v.minLength(1)),
  name: v.pipe(v.string(), v.minLength(1)),
  data: v.optional(v.record(v.string(), v.unknown())),
});

/**
 * Internal valibot schema for the raw `JSBridge` response from `sendAnalyticsEvent`.
 * Used to validate the response from `JSBridge` before transformation.
 *
 * @internal
 */
export const RawSendAnalyticsEventResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link SendAnalyticsEventResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const SendAnalyticsEventResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link IsConnectedResult}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const IsConnectedResultSchema = v.object({ connected: v.boolean() });

/**
 * Valibot schema for {@link IsConnectedResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const IsConnectedResponseSchema = v.union([
  sdkOkResponseSchema(IsConnectedResultSchema),
  sdkErrorResponseSchema(404),
]);

/**
 * Valibot schema for {@link GetSessionParamsResult}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const GetSessionParamsResultSchema = v.string();

/**
 * Valibot schema for {@link GetSessionParamsResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const GetSessionParamsResponseSchema = v.union([
  sdkOkResponseSchema(GetSessionParamsResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
