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
import type {
  CloseResponse,
  GetSessionParamsResponse,
  GetSessionParamsResult,
  HideBackButtonResponse,
  HideHeaderResponse,
  HideLoaderResponse,
  HideRefreshButtonResponse,
  IsConnectedResponse,
  IsConnectedResult,
  OnContentLoadedResponse,
  OnCtaTapResponse,
  OpenExternalLinkResponse,
  RawCloseResponse,
  RawHideBackButtonResponse,
  RawHideLoaderResponse,
  RawHideRefreshButtonResponse,
  RawOpenExternalLinkResponse,
  RawSendAnalyticsEventResponse,
  RawSetBackgroundColorResponse,
  RawSetTitleResponse,
  RawShowBackButtonResponse,
  RawShowLoaderResponse,
  RawShowRefreshButtonResponse,
  SendAnalyticsEventRequest,
  SendAnalyticsEventResponse,
  SetBackgroundColorResponse,
  SetTitleResponse,
  ShowBackButtonResponse,
  ShowHeaderResponse,
  ShowLoaderResponse,
  ShowRefreshButtonResponse,
} from './types';

/**
 * Internal valibot schema for the raw `JSBridge` response from `setBackgroundColor`.
 * Used to validate the response from `JSBridge` before transformation.
 *
 * @internal
 */
export const RawSetBackgroundColorResponseSchema: v.GenericSchema<RawSetBackgroundColorResponse> =
  v.union([
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
export const SetBackgroundColorResponseSchema: v.GenericSchema<SetBackgroundColorResponse> =
  v.union([
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
export const RawSetTitleResponseSchema: v.GenericSchema<RawSetTitleResponse> = v.union([
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
export const SetTitleResponseSchema: v.GenericSchema<SetTitleResponse> = v.union([
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
export const RawHideBackButtonResponseSchema: v.GenericSchema<RawHideBackButtonResponse> = v.union([
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
export const HideBackButtonResponseSchema: v.GenericSchema<HideBackButtonResponse> = v.union([
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
export const RawShowBackButtonResponseSchema: v.GenericSchema<RawShowBackButtonResponse> = v.union([
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
export const ShowBackButtonResponseSchema: v.GenericSchema<ShowBackButtonResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link HideHeaderResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const HideHeaderResponseSchema: v.GenericSchema<HideHeaderResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link ShowHeaderResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const ShowHeaderResponseSchema: v.GenericSchema<ShowHeaderResponse> = v.union([
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
export const RawHideRefreshButtonResponseSchema: v.GenericSchema<RawHideRefreshButtonResponse> =
  v.union([
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
export const HideRefreshButtonResponseSchema: v.GenericSchema<HideRefreshButtonResponse> = v.union([
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
export const RawShowRefreshButtonResponseSchema: v.GenericSchema<RawShowRefreshButtonResponse> =
  v.union([
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
export const ShowRefreshButtonResponseSchema: v.GenericSchema<ShowRefreshButtonResponse> = v.union([
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
export const RawCloseResponseSchema: v.GenericSchema<RawCloseResponse> = v.union([
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
export const CloseResponseSchema: v.GenericSchema<CloseResponse> = v.union([
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
export const OnContentLoadedResponseSchema: v.GenericSchema<OnContentLoadedResponse> = v.union([
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
export const RawShowLoaderResponseSchema: v.GenericSchema<RawShowLoaderResponse> = v.union([
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
export const ShowLoaderResponseSchema: v.GenericSchema<ShowLoaderResponse> = v.union([
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
export const RawHideLoaderResponseSchema: v.GenericSchema<RawHideLoaderResponse> = v.union([
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
export const HideLoaderResponseSchema: v.GenericSchema<HideLoaderResponse> = v.union([
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
export const RawOpenExternalLinkResponseSchema: v.GenericSchema<RawOpenExternalLinkResponse> =
  v.union([
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
export const OpenExternalLinkResponseSchema: v.GenericSchema<OpenExternalLinkResponse> = v.union([
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
export const OnCtaTapResponseSchema: v.GenericSchema<OnCtaTapResponse> = v.union([
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
export const SendAnalyticsEventRequestSchema: v.GenericSchema<SendAnalyticsEventRequest> = v.object(
  {
    state: v.pipe(v.string(), v.minLength(1)),
    name: v.pipe(v.string(), v.minLength(1)),
    data: v.optional(v.record(v.string(), v.unknown())),
  }
);

/**
 * Internal valibot schema for the raw `JSBridge` response from `sendAnalyticsEvent`.
 * Used to validate the response from `JSBridge` before transformation.
 *
 * @internal
 */
export const RawSendAnalyticsEventResponseSchema: v.GenericSchema<RawSendAnalyticsEventResponse> =
  v.union([
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
export const SendAnalyticsEventResponseSchema: v.GenericSchema<SendAnalyticsEventResponse> =
  v.union([
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
export const IsConnectedResultSchema: v.GenericSchema<IsConnectedResult> = v.object({
  connected: v.boolean(),
});

/**
 * Valibot schema for {@link IsConnectedResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const IsConnectedResponseSchema: v.GenericSchema<IsConnectedResponse> = v.union([
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
export const GetSessionParamsResultSchema: v.GenericSchema<GetSessionParamsResult> = v.string();

/**
 * Valibot schema for {@link GetSessionParamsResponse}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const GetSessionParamsResponseSchema: v.GenericSchema<GetSessionParamsResponse> = v.union([
  sdkOkResponseSchema(GetSessionParamsResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
