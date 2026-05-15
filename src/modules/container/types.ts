/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Request parameters for setting the background color.
 *
 * @group Modules
 * @category Container
 *
 * @example
 * ```typescript
 * '#ffffff'
 * ```
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
 * Response when setting the background color.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Background color set successfully.
 * - `400`: Invalid background color format.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * @example
 * ```typescript
 * 'Home Page'
 * ```
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
 * Response when setting the title.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Title set successfully.
 * - `400`: Invalid title parameter.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * Response when hiding the back button.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Back button hidden successfully.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * Response when showing the back button.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Back button shown successfully.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type ShowBackButtonResponse =
  | SDKNoContentResponse
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
 * Response when hiding the refresh button.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Refresh button hidden successfully.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * Response when showing the refresh button.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Refresh button shown successfully.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * Response when closing the container.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Container closed successfully.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * Result when notifying content loaded.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type OnContentLoadedResult = void;

/**
 * Response when notifying content loaded.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Notification sent successfully.
 * - `204`: Operation completed successfully (no content).
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type OnContentLoadedResponse =
  | SDKOkResponse<boolean>
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
 * Response when showing the loader.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Loader shown successfully.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * Response when hiding the loader.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Loader hidden successfully.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * @example
 * ```typescript
 * 'https://example.com'
 * ```
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
 * Response when opening an external link.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: External link opened successfully.
 * - `400`: Invalid URL parameter.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * @example
 * ```typescript
 * 'AV_LANDING_PAGE_CONTINUE'
 * ```
 *
 * @public
 */
export type OnCtaTapRequest = string;

/**
 * Result when notifying CTA tap.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export type OnCtaTapResult = void;

/**
 * Response when notifying CTA tap.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: CTA tap notification sent successfully.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * @public
 */
export type SendAnalyticsEventRequest = {
  state: string;
  name: string;
  data?: Record<string, unknown>;
};

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
 * Response when sending analytics events.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Analytics event sent successfully.
 * - `400`: Invalid analytics event parameters.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * @public
 */
export type IsConnectedResult = {
  connected: boolean;
};

/**
 * Response when checking connection status.
 *
 * @group Modules
 * @category Container
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Connected to Grab SuperApp. The `result` contains the connection status.
 * - `404`: Not connected to Grab SuperApp.
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
 * @example
 * ```typescript
 * { result: '{"userId": "123", "sessionToken": "abc"}' }
 * ```
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
 * @remarks
 * This response can have the following status codes:
 * - `200`: Session parameters retrieved successfully.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type GetSessionParamsResponse =
  | SDKOkResponse<GetSessionParamsResult>
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
