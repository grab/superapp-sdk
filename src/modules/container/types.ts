/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Request parameters for setting the background color.
 * The value must be a hexadecimal color string (for example, `#1A73E8`).
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type SetBackgroundColorRequest = string;

/**
 * Response when setting the background color.
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
 * Internal type for the raw `JSBridge` response from `setBackgroundColor` before transformation.
 * Used internally to handle the `JSBridge` response format.
 *
 * @internal
 */
export type RawSetBackgroundColorResponse =
  | SDKOkResponse<boolean>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Request parameters for setting the title.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type SetTitleRequest = string;

/**
 * Response when setting the title.
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
 * Internal type for the raw `JSBridge` response from `setTitle` before transformation.
 * Used internally to handle the `JSBridge` response format.
 *
 * @internal
 */
export type RawSetTitleResponse =
  | SDKOkResponse<boolean>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Response when hiding the back button.
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
 * Internal type for the raw `JSBridge` response from `hideBackButton` before transformation.
 * Used internally to handle the `JSBridge` response format.
 *
 * @internal
 */
export type RawHideBackButtonResponse =
  | SDKOkResponse<boolean>
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Response when showing the back button.
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
 * Response when hiding the header.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type HideHeaderResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw `JSBridge` response from `hideHeader` before transformation.
 * Used internally to handle the `JSBridge` response format.
 *
 * @internal
 */
export type RawHideHeaderResponse =
  | SDKOkResponse<boolean>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Response when showing the header.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type ShowHeaderResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw `JSBridge` response from `showHeader` before transformation.
 * Used internally to handle the `JSBridge` response format.
 *
 * @internal
 */
export type RawShowHeaderResponse =
  | SDKOkResponse<boolean>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw `JSBridge` response from `showBackButton` before transformation.
 * Used internally to handle the `JSBridge` response format.
 *
 * @internal
 */
export type RawShowBackButtonResponse =
  | SDKOkResponse<boolean>
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Response when hiding the refresh button.
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
 * Internal type for the raw `JSBridge` response from `hideRefreshButton` before transformation.
 * Used internally to handle the `JSBridge` response format.
 *
 * @internal
 */
export type RawHideRefreshButtonResponse =
  | SDKOkResponse<boolean>
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Response when showing the refresh button.
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
 * Internal type for the raw `JSBridge` response from `showRefreshButton` before transformation.
 * Used internally to handle the `JSBridge` response format.
 *
 * @internal
 */
export type RawShowRefreshButtonResponse =
  | SDKOkResponse<boolean>
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Response when closing the container.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type CloseResponse = SDKNoContentResponse | SDKErrorResponse<500> | SDKErrorResponse<501>;

/**
 * Internal type for the raw `JSBridge` response from `close` before transformation.
 * Used internally to handle the `JSBridge` response format.
 *
 * @internal
 */
export type RawCloseResponse =
  | SDKOkResponse<boolean>
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Response when notifying content loaded.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type OnContentLoadedResponse =
  | SDKOkResponse<boolean>
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Response when showing the loader.
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
 * Internal type for the raw `JSBridge` response from `showLoader` before transformation.
 * Used internally to handle the `JSBridge` response format.
 *
 * @internal
 */
export type RawShowLoaderResponse =
  | SDKOkResponse<boolean>
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Response when hiding the loader.
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
 * Internal type for the raw `JSBridge` response from `hideLoader` before transformation.
 * Used internally to handle the `JSBridge` response format.
 *
 * @internal
 */
export type RawHideLoaderResponse =
  | SDKOkResponse<boolean>
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Request parameters for opening an external link.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type OpenExternalLinkRequest = string;

/**
 * Response when opening an external link.
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
 * Internal type for the raw `JSBridge` response from `openExternalLink` before transformation.
 * Used internally to handle the `JSBridge` response format.
 *
 * @internal
 */
export type RawOpenExternalLinkResponse =
  | SDKOkResponse<boolean>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Request parameters for notifying CTA tap.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type OnCtaTapRequest = string;

/**
 * Response when notifying CTA tap.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type OnCtaTapResponse =
  | SDKOkResponse<boolean>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Request parameters for sending analytics events.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * Use predefined constants to ensure consistency across the platform:
 * - **States:** {@link ContainerAnalyticsEventState}
 * - **Names:** {@link ContainerAnalyticsEventName}
 *
 * @public
 */
export type SendAnalyticsEventRequest = {
  /** State value (for example, `"HOMEPAGE"`). */
  state: string;
  /** Name value (for example, `"DEFAULT"`). */
  name: string;
  /** Data value (for example, `{ "darkMode": true }`). */
  data?: Record<string, unknown>;
};

/**
 * Response when sending analytics events.
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
 * Internal type for the raw `JSBridge` response from `sendAnalyticsEvent` before transformation.
 * Used internally to handle the `JSBridge` response format.
 *
 * @internal
 */
export type RawSendAnalyticsEventResponse =
  | SDKOkResponse<boolean>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Result object containing the connection status.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type IsConnectedResult = {
  /** Connected value. */
  connected: boolean;
};

/**
 * Response when checking connection status.
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
 * @group Modules
 * @category Container
 *
 * @remarks
 * The `result` field contains a JSON string that must be parsed with `JSON.parse()` to use as an object.
 * Session parameters can contain primitives, base64 encoded strings, or nested objects depending on the
 * SuperApp's configuration.
 *
 * @public
 */
export type GetSessionParamsResult = string;

/**
 * Response when getting session parameters.
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
