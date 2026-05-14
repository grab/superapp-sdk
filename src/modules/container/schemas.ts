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
  HideLoaderResponse,
  HideRefreshButtonResponse,
  IsConnectedResponse,
  IsConnectedResult,
  OnContentLoadedResponse,
  OnCtaTapResponse,
  OpenExternalLinkResponse,
  SendAnalyticsEventRequest,
  SendAnalyticsEventResponse,
  SetBackgroundColorResponse,
  SetTitleResponse,
  ShowBackButtonResponse,
  ShowLoaderResponse,
  ShowRefreshButtonResponse,
} from './types';

/**
 * Internal valibot schema for the native response from setBackgroundColor.
 * Used to validate the response from the native layer before transformation.
 *
 * @internal
 */
export const NativeSetBackgroundColorResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link SetBackgroundColorResponse}.
 *
 * @internal
 */
export const SetBackgroundColorResponseSchema: v.GenericSchema<SetBackgroundColorResponse> =
  v.union([
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]);

/**
 * Internal valibot schema for the native response from setTitle.
 * Used to validate the response from the native layer before transformation.
 *
 * @internal
 */
export const NativeSetTitleResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link SetTitleResponse}.
 *
 * @internal
 */
export const SetTitleResponseSchema: v.GenericSchema<SetTitleResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the native response from hideBackButton.
 * Used to validate the response from the native layer before transformation.
 *
 * @internal
 */
export const NativeHideBackButtonResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link HideBackButtonResponse}.
 *
 * @internal
 */
export const HideBackButtonResponseSchema: v.GenericSchema<HideBackButtonResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the native response from showBackButton.
 * Used to validate the response from the native layer before transformation.
 *
 * @internal
 */
export const NativeShowBackButtonResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link ShowBackButtonResponse}.
 *
 * @internal
 */
export const ShowBackButtonResponseSchema: v.GenericSchema<ShowBackButtonResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the native response from hideRefreshButton.
 * Used to validate the response from the native layer before transformation.
 *
 * @internal
 */
export const NativeHideRefreshButtonResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link HideRefreshButtonResponse}.
 *
 * @internal
 */
export const HideRefreshButtonResponseSchema: v.GenericSchema<HideRefreshButtonResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the native response from showRefreshButton.
 * Used to validate the response from the native layer before transformation.
 *
 * @internal
 */
export const NativeShowRefreshButtonResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link ShowRefreshButtonResponse}.
 *
 * @internal
 */
export const ShowRefreshButtonResponseSchema: v.GenericSchema<ShowRefreshButtonResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the native response from close.
 * Used to validate the response from the native layer before transformation.
 *
 * @internal
 */
export const NativeCloseResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link CloseResponse}.
 *
 * @internal
 */
export const CloseResponseSchema: v.GenericSchema<CloseResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link OnContentLoadedResponse}.
 *
 * @internal
 */
export const OnContentLoadedResponseSchema: v.GenericSchema<OnContentLoadedResponse> = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the native response from showLoader.
 * Used to validate the response from the native layer before transformation.
 *
 * @internal
 */
export const NativeShowLoaderResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link ShowLoaderResponse}.
 *
 * @internal
 */
export const ShowLoaderResponseSchema: v.GenericSchema<ShowLoaderResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the native response from hideLoader.
 * Used to validate the response from the native layer before transformation.
 *
 * @internal
 */
export const NativeHideLoaderResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link HideLoaderResponse}.
 *
 * @internal
 */
export const HideLoaderResponseSchema: v.GenericSchema<HideLoaderResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the native response from openExternalLink.
 * Used to validate the response from the native layer before transformation.
 *
 * @internal
 */
export const NativeOpenExternalLinkResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link OpenExternalLinkResponse}.
 *
 * @internal
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
 * @internal
 */
export const OnCtaTapResponseSchema: v.GenericSchema<OnCtaTapResponse> = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link SendAnalyticsEventRequest}.
 *
 * @internal
 */
export const SendAnalyticsEventRequestSchema: v.GenericSchema<SendAnalyticsEventRequest> = v.object(
  {
    state: v.pipe(v.string(), v.minLength(1)),
    name: v.pipe(v.string(), v.minLength(1)),
    data: v.optional(v.record(v.string(), v.unknown())),
  }
);

/**
 * Internal valibot schema for the native response from sendAnalyticsEvent.
 * Used to validate the response from the native layer before transformation.
 *
 * @internal
 */
export const NativeSendAnalyticsEventResponseSchema = v.union([
  sdkOkResponseSchema(v.boolean()),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link SendAnalyticsEventResponse}.
 *
 * @internal
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
 * @internal
 */
export const IsConnectedResultSchema: v.GenericSchema<IsConnectedResult> = v.object({
  connected: v.boolean(),
});

/**
 * Valibot schema for {@link IsConnectedResponse}.
 *
 * @internal
 */
export const IsConnectedResponseSchema: v.GenericSchema<IsConnectedResponse> = v.union([
  sdkOkResponseSchema(IsConnectedResultSchema),
  sdkErrorResponseSchema(404),
]);

/**
 * Valibot schema for {@link GetSessionParamsResult}.
 *
 * @internal
 */
export const GetSessionParamsResultSchema: v.GenericSchema<GetSessionParamsResult> = v.string();

/**
 * Valibot schema for {@link GetSessionParamsResponse}.
 *
 * @internal
 */
export const GetSessionParamsResponseSchema: v.GenericSchema<GetSessionParamsResponse> = v.union([
  sdkOkResponseSchema(GetSessionParamsResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
