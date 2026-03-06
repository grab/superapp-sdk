/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 * 
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response/types';

/**
 * Request parameters for setting the background color.
 *
 * @public
 */
export type SetBackgroundColorRequest = string;

/**
 * Result when setting the background color.
 *
 * @public
 */
export type SetBackgroundColorResult = void;

/**
 * Response when setting the background color.
 *
 * @public
 */
export type SetBackgroundColorResponse = ConstrainedBridgeResponse<
  SetBackgroundColorResult,
  200 | 400
>;

/**
 * Request parameters for setting the title.
 *
 * @public
 */
export type SetTitleRequest = string;

/**
 * Result when setting the title.
 *
 * @public
 */
export type SetTitleResult = void;

/**
 * Response when setting the title.
 *
 * @public
 */
export type SetTitleResponse = ConstrainedBridgeResponse<SetTitleResult, 200 | 400>;

/**
 * Result when hiding the back button.
 *
 * @public
 */
export type HideBackButtonResult = void;

/**
 * Response when hiding the back button.
 *
 * @public
 */
export type HideBackButtonResponse = ConstrainedBridgeResponse<HideBackButtonResult, 200>;

/**
 * Result when showing the back button.
 *
 * @public
 */
export type ShowBackButtonResult = void;

/**
 * Response when showing the back button.
 *
 * @public
 */
export type ShowBackButtonResponse = ConstrainedBridgeResponse<ShowBackButtonResult, 200>;

/**
 * Result when hiding the refresh button.
 *
 * @public
 */
export type HideRefreshButtonResult = void;

/**
 * Response when hiding the refresh button.
 *
 * @public
 */
export type HideRefreshButtonResponse = ConstrainedBridgeResponse<HideRefreshButtonResult, 200>;

/**
 * Result when showing the refresh button.
 *
 * @public
 */
export type ShowRefreshButtonResult = void;

/**
 * Response when showing the refresh button.
 *
 * @public
 */
export type ShowRefreshButtonResponse = ConstrainedBridgeResponse<ShowRefreshButtonResult, 200>;

/**
 * Result when closing the container.
 *
 * @public
 */
export type CloseResult = void;

/**
 * Response when closing the container.
 *
 * @public
 */
export type CloseResponse = ConstrainedBridgeResponse<CloseResult, 200>;

/**
 * Result when notifying content loaded.
 *
 * @public
 */
export type OnContentLoadedResult = void;

/**
 * Response when notifying content loaded.
 *
 * @public
 */
export type OnContentLoadedResponse = ConstrainedBridgeResponse<OnContentLoadedResult, 200>;

/**
 * Result when showing the loader.
 *
 * @public
 */
export type ShowLoaderResult = void;

/**
 * Response when showing the loader.
 *
 * @public
 */
export type ShowLoaderResponse = ConstrainedBridgeResponse<ShowLoaderResult, 200>;

/**
 * Result when hiding the loader.
 *
 * @public
 */
export type HideLoaderResult = void;

/**
 * Response when hiding the loader.
 *
 * @public
 */
export type HideLoaderResponse = ConstrainedBridgeResponse<HideLoaderResult, 200>;

/**
 * Request parameters for opening an external link.
 *
 * @public
 */
export type OpenExternalLinkRequest = string;

/**
 * Result when opening an external link.
 *
 * @public
 */
export type OpenExternalLinkResult = void;

/**
 * Response when opening an external link.
 *
 * @public
 */
export type OpenExternalLinkResponse = ConstrainedBridgeResponse<OpenExternalLinkResult, 200 | 400>;

/**
 * Request parameters for notifying CTA tap.
 *
 * @public
 */
export type OnCtaTapRequest = string;

/**
 * Result when notifying CTA tap.
 *
 * @public
 */
export type OnCtaTapResult = void;

/**
 * Response when notifying CTA tap.
 *
 * @public
 */
export type OnCtaTapResponse = ConstrainedBridgeResponse<OnCtaTapResult, 200>;

/**
 * Request parameters for sending analytics events.
 *
 * @remarks
 * Use predefined constants to ensure consistency across the platform:
 * - **States:** {@link ContainerAnalyticsEventState}
 * - **Names:** {@link ContainerAnalyticsEventName}
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
 *
 * @public
 */
export type SendAnalyticsEventResult = void;

/**
 * Response when sending analytics events.
 *
 * @public
 */
export type SendAnalyticsEventResponse = ConstrainedBridgeResponse<
  SendAnalyticsEventResult,
  200 | 400
>;

/**
 * Result object containing the connection status.
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
 * @public
 */
export type GetSessionParamsResult = {
  /** JSON string containing session parameters. */
  result: string;
};

/**
 * Response when getting session parameters.
 *
 * @public
 */
export type GetSessionParamsResponse = ConstrainedBridgeResponse<GetSessionParamsResult, 200>;
