/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response';

/**
 * Request parameters for setting the background color.
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
 * @public
 */
export type SetBackgroundColorResult = void;

/**
 * Response when setting the background color.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Background color set successfully.
 * - `400`: Invalid background color format.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Invalid background color format'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type SetBackgroundColorResponse = ConstrainedBridgeResponse<
  SetBackgroundColorResult,
  204 | 400 | 500 | 501
>;

/**
 * Request parameters for setting the title.
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
 * @public
 */
export type SetTitleResult = void;

/**
 * Response when setting the title.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Title set successfully.
 * - `400`: Invalid title parameter.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Invalid title parameter'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type SetTitleResponse = ConstrainedBridgeResponse<SetTitleResult, 200 | 400 | 500 | 501>;

/**
 * Result when hiding the back button.
 * This operation returns no data on success.
 *
 * @public
 */
export type HideBackButtonResult = void;

/**
 * Response when hiding the back button.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Back button hidden successfully.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type HideBackButtonResponse = ConstrainedBridgeResponse<
  HideBackButtonResult,
  200 | 500 | 501
>;

/**
 * Result when showing the back button.
 * This operation returns no data on success.
 *
 * @public
 */
export type ShowBackButtonResult = void;

/**
 * Response when showing the back button.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Back button shown successfully.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type ShowBackButtonResponse = ConstrainedBridgeResponse<
  ShowBackButtonResult,
  200 | 500 | 501
>;

/**
 * Result when hiding the refresh button.
 * This operation returns no data on success.
 *
 * @public
 */
export type HideRefreshButtonResult = void;

/**
 * Response when hiding the refresh button.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Refresh button hidden successfully.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type HideRefreshButtonResponse = ConstrainedBridgeResponse<
  HideRefreshButtonResult,
  200 | 500 | 501
>;

/**
 * Result when showing the refresh button.
 * This operation returns no data on success.
 *
 * @public
 */
export type ShowRefreshButtonResult = void;

/**
 * Response when showing the refresh button.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Refresh button shown successfully.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type ShowRefreshButtonResponse = ConstrainedBridgeResponse<
  ShowRefreshButtonResult,
  200 | 500 | 501
>;

/**
 * Result when closing the container.
 * This operation returns no data on success.
 *
 * @public
 */
export type CloseResult = void;

/**
 * Response when closing the container.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Container closed successfully.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type CloseResponse = ConstrainedBridgeResponse<CloseResult, 200 | 500 | 501>;

/**
 * Result when notifying content loaded.
 * This operation returns no data on success.
 *
 * @public
 */
export type OnContentLoadedResult = void;

/**
 * Response when notifying content loaded.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Notification sent successfully.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type OnContentLoadedResponse = ConstrainedBridgeResponse<
  OnContentLoadedResult,
  200 | 500 | 501
>;

/**
 * Result when showing the loader.
 * This operation returns no data on success.
 *
 * @public
 */
export type ShowLoaderResult = void;

/**
 * Response when showing the loader.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Loader shown successfully.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type ShowLoaderResponse = ConstrainedBridgeResponse<ShowLoaderResult, 200 | 500 | 501>;

/**
 * Result when hiding the loader.
 * This operation returns no data on success.
 *
 * @public
 */
export type HideLoaderResult = void;

/**
 * Response when hiding the loader.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Loader hidden successfully.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type HideLoaderResponse = ConstrainedBridgeResponse<HideLoaderResult, 200 | 500 | 501>;

/**
 * Request parameters for opening an external link.
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
 * @public
 */
export type OpenExternalLinkResult = void;

/**
 * Response when opening an external link.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: External link opened successfully.
 * - `400`: Invalid URL parameter.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'URL parameter not found'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type OpenExternalLinkResponse = ConstrainedBridgeResponse<
  OpenExternalLinkResult,
  200 | 400 | 500 | 501
>;

/**
 * Request parameters for notifying CTA tap.
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
 * @public
 */
export type OnCtaTapResult = void;

/**
 * Response when notifying CTA tap.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: CTA tap notification sent successfully.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type OnCtaTapResponse = ConstrainedBridgeResponse<OnCtaTapResult, 200 | 500 | 501>;

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
 * @public
 */
export type SendAnalyticsEventRequest = {
  /** The analytics event state (e.g., "HOMEPAGE", "CHECKOUT_PAGE"). */
  state: string;
  /** The analytics event name (e.g., "DEFAULT", "BOOK"). */
  name: string;
  /** Optional additional data for the analytics event as key-value pairs. */
  data?: Record<string, unknown>;
};

/**
 * Result when sending analytics events.
 * This operation returns no data on success.
 *
 * @public
 */
export type SendAnalyticsEventResult = void;

/**
 * Response when sending analytics events.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Analytics event sent successfully.
 * - `400`: Invalid analytics event parameters.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Invalid analytics event parameters'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type SendAnalyticsEventResponse = ConstrainedBridgeResponse<
  SendAnalyticsEventResult,
  200 | 400 | 500 | 501
>;

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
 * @public
 */
export type IsConnectedResult = {
  /** Whether the MiniApp is connected to the Grab SuperApp. */
  connected: boolean;
};

/**
 * Response when checking connection status.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Connected to Grab SuperApp. The `result` contains the connection status.
 * - `404`: Not connected to Grab SuperApp.
 *
 * @example
 * **Connected response (200):**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { connected: true }
 * }
 * ```
 *
 * @example
 * **Not connected response (404):**
 * ```typescript
 * {
 *   status_code: 404,
 *   error: 'Not connected to Grab app'
 * }
 * ```
 *
 * @public
 */
export type IsConnectedResponse = ConstrainedBridgeResponse<IsConnectedResult, 200 | 404>;

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
 * @public
 */
export type GetSessionParamsResult = {
  /** JSON string containing session parameters. */
  result: string;
};

/**
 * Response when getting session parameters.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Session parameters retrieved successfully.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { result: '{"userId": "123", "sessionToken": "abc"}' }
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type GetSessionParamsResponse = ConstrainedBridgeResponse<
  GetSessionParamsResult,
  200 | 500 | 501
>;
