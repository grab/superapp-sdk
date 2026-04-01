/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import {
  CloseResponseSchema,
  GetSessionParamsResponseSchema,
  GetSessionParamsResultSchema,
  HideBackButtonResponseSchema,
  HideLoaderResponseSchema,
  HideRefreshButtonResponseSchema,
  IsConnectedResponseSchema,
  IsConnectedResultSchema,
  OnContentLoadedResponseSchema,
  OnCtaTapResponseSchema,
  OpenExternalLinkResponseSchema,
  SendAnalyticsEventRequestSchema,
  SendAnalyticsEventResponseSchema,
  SetBackgroundColorResponseSchema,
  SetTitleResponseSchema,
  ShowBackButtonResponseSchema,
  ShowLoaderResponseSchema,
  ShowRefreshButtonResponseSchema,
} from './schemas';

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
 * - `204`: Background color set successfully.
 * - `400`: Invalid background color format.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type SetBackgroundColorResponse = InferOutput<typeof SetBackgroundColorResponseSchema>;

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
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type SetTitleResponse = InferOutput<typeof SetTitleResponseSchema>;

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
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type HideBackButtonResponse = InferOutput<typeof HideBackButtonResponseSchema>;

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
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type ShowBackButtonResponse = InferOutput<typeof ShowBackButtonResponseSchema>;

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
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type HideRefreshButtonResponse = InferOutput<typeof HideRefreshButtonResponseSchema>;

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
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type ShowRefreshButtonResponse = InferOutput<typeof ShowRefreshButtonResponseSchema>;

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
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type CloseResponse = InferOutput<typeof CloseResponseSchema>;

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
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type OnContentLoadedResponse = InferOutput<typeof OnContentLoadedResponseSchema>;

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
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type ShowLoaderResponse = InferOutput<typeof ShowLoaderResponseSchema>;

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
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type HideLoaderResponse = InferOutput<typeof HideLoaderResponseSchema>;

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
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type OpenExternalLinkResponse = InferOutput<typeof OpenExternalLinkResponseSchema>;

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
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type OnCtaTapResponse = InferOutput<typeof OnCtaTapResponseSchema>;

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
export type SendAnalyticsEventRequest = InferOutput<typeof SendAnalyticsEventRequestSchema>;

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
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type SendAnalyticsEventResponse = InferOutput<typeof SendAnalyticsEventResponseSchema>;

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
export type IsConnectedResult = InferOutput<typeof IsConnectedResultSchema>;

/**
 * Response when checking connection status.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Connected to Grab SuperApp. The `result` contains the connection status.
 * - `404`: Not connected to Grab SuperApp.
 *
 * @public
 */
export type IsConnectedResponse = InferOutput<typeof IsConnectedResponseSchema>;

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
export type GetSessionParamsResult = InferOutput<typeof GetSessionParamsResultSchema>;

/**
 * Response when getting session parameters.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Session parameters retrieved successfully.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type GetSessionParamsResponse = InferOutput<typeof GetSessionParamsResponseSchema>;
