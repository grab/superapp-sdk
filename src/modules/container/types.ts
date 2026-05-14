/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';
import {
  RawCloseResponseSchema,
  RawHideBackButtonResponseSchema,
  RawHideLoaderResponseSchema,
  RawHideRefreshButtonResponseSchema,
  RawOpenExternalLinkResponseSchema,
  RawSendAnalyticsEventResponseSchema,
  RawSetBackgroundColorResponseSchema,
  RawSetTitleResponseSchema,
  RawShowBackButtonResponseSchema,
  RawShowLoaderResponseSchema,
  RawShowRefreshButtonResponseSchema,
} from './schemas';

/**
 * Request parameters for setting the background color.
 *
 * @example
 * ```typescript
 * '#ffffff'
 * ```
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type SetBackgroundColorRequest = string;

/**
 * Result when setting the background color.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type SetBackgroundColorResult = void;

/**
 * Response returned by {@link ContainerModule.setBackgroundColor}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type SetBackgroundColorResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw SDK response from setBackgroundColor before transformation.
 * Used internally to handle the native SDK response format.
 *
 * @internal
 */
export type RawSetBackgroundColorResponse = InferOutput<typeof RawSetBackgroundColorResponseSchema>;

/**
 * Request parameters for setting the title.
 *
 * @example
 * ```typescript
 * 'Home Page'
 * ```
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type SetTitleRequest = string;

/**
 * Result when setting the title.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type SetTitleResult = void;

/**
 * Response returned by {@link ContainerModule.setTitle}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type SetTitleResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw SDK response from setTitle before transformation.
 * Used internally to handle the native SDK response format.
 *
 * @internal
 */
export type RawSetTitleResponse = InferOutput<typeof RawSetTitleResponseSchema>;

/**
 * Result when hiding the back button.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type HideBackButtonResult = void;

/**
 * Response returned by {@link ContainerModule.hideBackButton}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type HideBackButtonResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw SDK response from hideBackButton before transformation.
 * Used internally to handle the native SDK response format.
 *
 * @internal
 */
export type RawHideBackButtonResponse = InferOutput<typeof RawHideBackButtonResponseSchema>;

/**
 * Result when showing the back button.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type ShowBackButtonResult = void;

/**
 * Response returned by {@link ContainerModule.showBackButton}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type ShowBackButtonResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw SDK response from showBackButton before transformation.
 * Used internally to handle the native SDK response format.
 *
 * @internal
 */
export type RawShowBackButtonResponse = InferOutput<typeof RawShowBackButtonResponseSchema>;

/**
 * Result when hiding the refresh button.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type HideRefreshButtonResult = void;

/**
 * Response returned by {@link ContainerModule.hideRefreshButton}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type HideRefreshButtonResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw SDK response from hideRefreshButton before transformation.
 * Used internally to handle the native SDK response format.
 *
 * @internal
 */
export type RawHideRefreshButtonResponse = InferOutput<typeof RawHideRefreshButtonResponseSchema>;

/**
 * Result when showing the refresh button.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type ShowRefreshButtonResult = void;

/**
 * Response returned by {@link ContainerModule.showRefreshButton}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type ShowRefreshButtonResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw SDK response from showRefreshButton before transformation.
 * Used internally to handle the native SDK response format.
 *
 * @internal
 */
export type RawShowRefreshButtonResponse = InferOutput<typeof RawShowRefreshButtonResponseSchema>;

/**
 * Result when closing the container.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type CloseResult = void;

/**
 * Response returned by {@link ContainerModule.close}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type CloseResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw SDK response from close before transformation.
 * Used internally to handle the native SDK response format.
 *
 * @internal
 */
export type RawCloseResponse = InferOutput<typeof RawCloseResponseSchema>;

/**
 * Result payload when notifying content loaded succeeds with a 200 response.
 * `true` indicates the content-loaded signal was acknowledged with a payload.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type OnContentLoadedResult = boolean;

/**
 * Response returned by {@link ContainerModule.onContentLoaded}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type OnContentLoadedResponse =
  | SDKOkResponse<OnContentLoadedResult>
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Result when showing the loader.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type ShowLoaderResult = void;

/**
 * Response returned by {@link ContainerModule.showLoader}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type ShowLoaderResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw SDK response from showLoader before transformation.
 * Used internally to handle the native SDK response format.
 *
 * @internal
 */
export type RawShowLoaderResponse = InferOutput<typeof RawShowLoaderResponseSchema>;

/**
 * Result when hiding the loader.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type HideLoaderResult = void;

/**
 * Response returned by {@link ContainerModule.hideLoader}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type HideLoaderResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw SDK response from hideLoader before transformation.
 * Used internally to handle the native SDK response format.
 *
 * @internal
 */
export type RawHideLoaderResponse = InferOutput<typeof RawHideLoaderResponseSchema>;

/**
 * Request parameters for opening an external link.
 *
 * @example
 * ```typescript
 * 'https://example.com'
 * ```
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type OpenExternalLinkRequest = string;

/**
 * Result when opening an external link.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type OpenExternalLinkResult = void;

/**
 * Response returned by {@link ContainerModule.openExternalLink}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type OpenExternalLinkResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw SDK response from openExternalLink before transformation.
 * Used internally to handle the native SDK response format.
 *
 * @internal
 */
export type RawOpenExternalLinkResponse = InferOutput<typeof RawOpenExternalLinkResponseSchema>;

/**
 * Request parameters for notifying CTA tap.
 *
 * @example
 * ```typescript
 * 'AV_LANDING_PAGE_CONTINUE'
 * ```
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type OnCtaTapRequest = string;

/**
 * Result payload when notifying CTA tap succeeds.
 * `true` indicates the tap signal was acknowledged with a payload.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type OnCtaTapResult = boolean;

/**
 * Response returned by {@link ContainerModule.onCtaTap}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type OnCtaTapResponse =
  | SDKOkResponse<OnCtaTapResult>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Request parameters for sending analytics events.
 *
 * @remarks
 * Use predefined constants to ensure consistency across the platform:
 * - **States:** {@link ContainerAnalyticsEventState}
 * - **Names:** {@link ContainerAnalyticsEventName}
 *
 * @example
 * **Analytics event with state and name:**
 * ```typescript
 * {
 *   state: 'HOMEPAGE',
 *   name: 'DEFAULT'
 * }
 * ```
 *
 * @example
 * **Analytics event with additional data:**
 * ```typescript
 * {
 *   state: 'CHECKOUT_PAGE',
 *   name: 'BOOK',
 *   data: { itemId: '123', quantity: 2 }
 * }
 * ```
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export interface SendAnalyticsEventRequest {
  /** Analytics event state (prefer {@link ContainerAnalyticsEventState} values). */
  state: string;
  /** Analytics event name (prefer {@link ContainerAnalyticsEventName} values). */
  name: string;
  /** Optional structured payload. */
  data?: Record<string, unknown>;
}

/**
 * Result when sending analytics events.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type SendAnalyticsEventResult = void;

/**
 * Response returned by {@link ContainerModule.sendAnalyticsEvent}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type SendAnalyticsEventResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw SDK response from sendAnalyticsEvent before transformation.
 * Used internally to handle the native SDK response format.
 *
 * @internal
 */
export type RawSendAnalyticsEventResponse = InferOutput<typeof RawSendAnalyticsEventResponseSchema>;

/**
 * Result object containing the connection status.
 *
 * @example
 * **Connected to Grab SuperApp:**
 * ```typescript
 * { connected: true }
 * ```
 *
 * @example
 * **Not connected:**
 * ```typescript
 * { connected: false }
 * ```
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export interface IsConnectedResult {
  connected: boolean;
}

/**
 * Response returned by {@link ContainerModule.isConnected}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type IsConnectedResponse = SDKOkResponse<IsConnectedResult> | SDKErrorResponse<404>;

/**
 * Result object containing session parameters as a JSON string.
 *
 * @remarks
 * The `result` field contains a JSON string that must be parsed with `JSON.parse()` to use as an object.
 * Session parameters can contain primitives, base64 encoded strings, or nested objects depending on the
 * SuperApp's configuration.
 *
 * @example
 * ```typescript
 * { result: '{"userId": "123", "sessionToken": "abc"}' }
 * ```
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type GetSessionParamsResult = string;

/**
 * Response returned by {@link ContainerModule.getSessionParams}.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type GetSessionParamsResponse =
  | SDKOkResponse<GetSessionParamsResult>
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
