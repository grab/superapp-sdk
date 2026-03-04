/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';

/**
 * Request parameters for setting the background color.
 *
 * @public
 */
export type SetBackgroundColorRequest = string;

/**
 * Response when setting the background color.
 *
 * @public
 */
export type SetBackgroundColorResponse = BridgeResponse<null>;

/**
 * Request parameters for setting the title.
 *
 * @public
 */
export type SetTitleRequest = string;

/**
 * Response when setting the title.
 *
 * @public
 */
export type SetTitleResponse = BridgeResponse<null>;

/**
 * Response when hiding the back button.
 *
 * @public
 */
export type HideBackButtonResponse = BridgeResponse<null>;

/**
 * Response when showing the back button.
 *
 * @public
 */
export type ShowBackButtonResponse = BridgeResponse<null>;

/**
 * Response when hiding the refresh button.
 *
 * @public
 */
export type HideRefreshButtonResponse = BridgeResponse<null>;

/**
 * Response when showing the refresh button.
 *
 * @public
 */
export type ShowRefreshButtonResponse = BridgeResponse<null>;

/**
 * Response when closing the container.
 *
 * @public
 */
export type CloseResponse = BridgeResponse<null>;

/**
 * Response when notifying content loaded.
 *
 * @public
 */
export type OnContentLoadedResponse = BridgeResponse<null>;

/**
 * Response when showing the loader.
 *
 * @public
 */
export type ShowLoaderResponse = BridgeResponse<null>;

/**
 * Response when hiding the loader.
 *
 * @public
 */
export type HideLoaderResponse = BridgeResponse<null>;

/**
 * Request parameters for opening an external link.
 *
 * @public
 */
export type OpenExternalLinkRequest = string;

/**
 * Response when opening an external link.
 *
 * @public
 */
export type OpenExternalLinkResponse = BridgeResponse<null>;

/**
 * Request parameters for notifying CTA tap.
 *
 * @public
 */
export type OnCtaTapRequest = string;

/**
 * Response when notifying CTA tap.
 *
 * @public
 */
export type OnCtaTapResponse = BridgeResponse<null>;

/**
 * Request parameters for sending analytics events.
 *
 * @public
 */
export type SendAnalyticsEventRequest = {
  /** Analytics event state (e.g., "HOMEPAGE", "CHECKOUT_PAGE"). */
  state: string;
  /** Analytics event name (e.g., "DEFAULT", "BOOK"). */
  name: string;
  /** Optional additional data for the analytics event. */
  data?: Record<string, any>;
};

/**
 * Response when sending analytics events.
 *
 * @public
 */
export type SendAnalyticsEventResponse = BridgeResponse<null>;

/**
 * Result object containing the connection status.
 *
 * @public
 */
export type IsConnectedResult = {
  /** Whether the MiniApp is connected to the Grab app. */
  connected: boolean;
};

/**
 * Response when checking connection status.
 *
 * @public
 */
export type IsConnectedResponse = BridgeResponse<IsConnectedResult>;

/**
 * Result object containing session parameters as a JSON string.
 *
 * @public
 */
export type GetSessionParamsResult = {
  /** JSON string containing session parameters. Parse with `JSON.parse(result)` to use as an object. */
  result: string;
};

/**
 * Response when getting session parameters.
 *
 * @public
 */
export type GetSessionParamsResponse = BridgeResponse<GetSessionParamsResult>;
