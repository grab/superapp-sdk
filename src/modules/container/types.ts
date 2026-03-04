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
export type SetBackgroundColorResponse = BridgeResponse<SetBackgroundColorResult>;

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
export type SetTitleResponse = BridgeResponse<SetTitleResult>;

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
export type HideBackButtonResponse = BridgeResponse<HideBackButtonResult>;

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
export type ShowBackButtonResponse = BridgeResponse<ShowBackButtonResult>;

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
export type HideRefreshButtonResponse = BridgeResponse<HideRefreshButtonResult>;

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
export type ShowRefreshButtonResponse = BridgeResponse<ShowRefreshButtonResult>;

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
export type CloseResponse = BridgeResponse<CloseResult>;

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
export type OnContentLoadedResponse = BridgeResponse<OnContentLoadedResult>;

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
export type ShowLoaderResponse = BridgeResponse<ShowLoaderResult>;

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
export type HideLoaderResponse = BridgeResponse<HideLoaderResult>;

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
export type OpenExternalLinkResponse = BridgeResponse<OpenExternalLinkResult>;

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
export type OnCtaTapResponse = BridgeResponse<OnCtaTapResult>;

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
export type SendAnalyticsEventResponse = BridgeResponse<SendAnalyticsEventResult>;

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
