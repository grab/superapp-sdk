/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuccessResponse, ErrorResponse, Invoke } from '../../core';

/**
 * Container analytics event state constants
 */
export const ContainerAnalyticsEventState = {
  /** Homepage state */
  HOMEPAGE: 'HOMEPAGE',
  /** Checkout page state */
  CHECKOUT_PAGE: 'CHECKOUT_PAGE',
  /** Booking completion state */
  BOOKING_COMPLETION: 'BOOKING_COMPLETION',
  /** Custom state for other pages */
  CUSTOM: 'CUSTOM',
} as const;

/**
 * Type representing valid container analytics event states
 */
export type ContainerAnalyticsEventState =
  (typeof ContainerAnalyticsEventState)[keyof typeof ContainerAnalyticsEventState];

/**
 * Container analytics event name constants
 */
export const ContainerAnalyticsEventName = {
  /** Default event name */
  DEFAULT: 'DEFAULT',
} as const;

/**
 * Type representing valid container analytics event names
 */
export type ContainerAnalyticsEventName =
  (typeof ContainerAnalyticsEventName)[keyof typeof ContainerAnalyticsEventName];

/**
 * Container analytics event data field constants
 */
export const ContainerAnalyticsEventData = {
  /** Transaction amount field */
  TRANSACTION_AMOUNT: 'transaction_amount',
  /** Transaction currency field */
  TRANSACTION_CURRENCY: 'transaction_currency',
  /** Page identifier field */
  PAGE: 'page',
} as const;

/**
 * Type representing valid container analytics event data fields
 */
export type ContainerAnalyticsEventData =
  (typeof ContainerAnalyticsEventData)[keyof typeof ContainerAnalyticsEventData];

/**
 * Details for analytics events sent to the container
 */
export interface AnalyticsEventDetails {
  /**
   * The state in which the event occurred.
   * Use {@link ContainerAnalyticsEventState} for predefined values.
   */
  state: string;
  /**
   * The name of the event.
   * Use {@link ContainerAnalyticsEventName} for predefined values.
   */
  name: string;
  /**
   * Optional metadata associated with the event.
   * Use {@link ContainerAnalyticsEventData} for standard keys.
   */
  data?: Record<string, unknown> | null;
}

/**
 * Success response for setBackgroundColor
 */
export type SetBackgroundColorSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response for setBackgroundColor
 */
export type SetBackgroundColorErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid color format
   * - `500`: Internal error
   */
  status_code: 400 | 500;
};

/**
 * Response type for setBackgroundColor
 */
export type SetBackgroundColorResponse =
  | SetBackgroundColorSuccessResponse
  | SetBackgroundColorErrorResponse;

/**
 * Success response for setTitle
 */
export type SetTitleSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response for setTitle
 */
export type SetTitleErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid title
   * - `500`: Internal error
   */
  status_code: 400 | 500;
};

/**
 * Response type for setTitle
 */
export type SetTitleResponse = SetTitleSuccessResponse | SetTitleErrorResponse;

/**
 * Success response for hideBackButton
 */
export type HideBackButtonSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response for hideBackButton
 */
export type HideBackButtonErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `500`: Internal error
   */
  status_code: 500;
};

/**
 * Response type for hideBackButton
 */
export type HideBackButtonResponse = HideBackButtonSuccessResponse | HideBackButtonErrorResponse;

/**
 * Success response for showBackButton
 */
export type ShowBackButtonSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response for showBackButton
 */
export type ShowBackButtonErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `500`: Internal error
   */
  status_code: 500;
};

/**
 * Response type for showBackButton
 */
export type ShowBackButtonResponse = ShowBackButtonSuccessResponse | ShowBackButtonErrorResponse;

/**
 * Success response for hideRefreshButton
 */
export type HideRefreshButtonSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response for hideRefreshButton
 */
export type HideRefreshButtonErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `500`: Internal error
   */
  status_code: 500;
};

/**
 * Response type for hideRefreshButton
 */
export type HideRefreshButtonResponse =
  | HideRefreshButtonSuccessResponse
  | HideRefreshButtonErrorResponse;

/**
 * Success response for showRefreshButton
 */
export type ShowRefreshButtonSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response for showRefreshButton
 */
export type ShowRefreshButtonErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `500`: Internal error
   */
  status_code: 500;
};

/**
 * Response type for showRefreshButton
 */
export type ShowRefreshButtonResponse =
  | ShowRefreshButtonSuccessResponse
  | ShowRefreshButtonErrorResponse;

/**
 * Success response for close
 */
export type CloseSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response for close
 */
export type CloseErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `500`: Internal error
   */
  status_code: 500;
};

/**
 * Response type for close
 */
export type CloseResponse = CloseSuccessResponse | CloseErrorResponse;

/**
 * Success response for onContentLoaded
 */
export type OnContentLoadedSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response for onContentLoaded
 */
export type OnContentLoadedErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `500`: Internal error
   */
  status_code: 500;
};

/**
 * Response type for onContentLoaded
 */
export type OnContentLoadedResponse = OnContentLoadedSuccessResponse | OnContentLoadedErrorResponse;

/**
 * Success response for showLoader
 */
export type ShowLoaderSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response for showLoader
 */
export type ShowLoaderErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `500`: Internal error
   */
  status_code: 500;
};

/**
 * Response type for showLoader
 */
export type ShowLoaderResponse = ShowLoaderSuccessResponse | ShowLoaderErrorResponse;

/**
 * Success response for hideLoader
 */
export type HideLoaderSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response for hideLoader
 */
export type HideLoaderErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `500`: Internal error
   */
  status_code: 500;
};

/**
 * Response type for hideLoader
 */
export type HideLoaderResponse = HideLoaderSuccessResponse | HideLoaderErrorResponse;

/**
 * Success response for openExternalLink
 */
export type OpenExternalLinkSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response for openExternalLink
 */
export type OpenExternalLinkErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid URL
   * - `500`: Internal error
   */
  status_code: 400 | 500;
};

/**
 * Response type for openExternalLink
 */
export type OpenExternalLinkResponse =
  | OpenExternalLinkSuccessResponse
  | OpenExternalLinkErrorResponse;

/**
 * Success response for onCtaTap
 */
export type OnCtaTapSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response for onCtaTap
 */
export type OnCtaTapErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid action
   * - `500`: Internal error
   */
  status_code: 400 | 500;
};

/**
 * Response type for onCtaTap
 */
export type OnCtaTapResponse = OnCtaTapSuccessResponse | OnCtaTapErrorResponse;

/**
 * Success response for sendAnalyticsEvent
 */
export type SendAnalyticsEventSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response for sendAnalyticsEvent
 */
export type SendAnalyticsEventErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid event details
   * - `500`: Internal error
   */
  status_code: 400 | 500;
};

/**
 * Response type for sendAnalyticsEvent
 */
export type SendAnalyticsEventResponse =
  | SendAnalyticsEventSuccessResponse
  | SendAnalyticsEventErrorResponse;

/**
 * Success response for isConnected
 */
export type IsConnectedSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response for isConnected
 */
export type IsConnectedErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `424`: Not connected to Grab app
   */
  status_code: 424;
};

/**
 * Response type for isConnected
 */
export type IsConnectedResponse = IsConnectedSuccessResponse | IsConnectedErrorResponse;

/**
 * Success response for getSessionParams
 *
 * @remarks
 * The native layer returns session parameters as a JSON string. Parse with `JSON.parse(result)` to use as an object.
 */
export type GetSessionParamsSuccessResponse = SuccessResponse<string>;

/**
 * Error response for getSessionParams
 */
export type GetSessionParamsErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid request
   * - `500`: Internal error
   */
  status_code: 400 | 500;
};

/**
 * Response type for getSessionParams
 */
export type GetSessionParamsResponse =
  | GetSessionParamsSuccessResponse
  | GetSessionParamsErrorResponse;

/**
 * Method map for ContainerModule
 */
export type ContainerModuleMethods = {
  setBackgroundColor: { params: { backgroundColor: string }; response: SetBackgroundColorResponse };
  setTitle: { params: { title: string }; response: SetTitleResponse };
  hideBackButton: { params: never; response: HideBackButtonResponse };
  showBackButton: { params: never; response: ShowBackButtonResponse };
  hideRefreshButton: { params: never; response: HideRefreshButtonResponse };
  showRefreshButton: { params: never; response: ShowRefreshButtonResponse };
  close: { params: never; response: CloseResponse };
  onContentLoaded: { params: never; response: OnContentLoadedResponse };
  showLoader: { params: never; response: ShowLoaderResponse };
  hideLoader: { params: never; response: HideLoaderResponse };
  openExternalLink: { params: { url: string }; response: OpenExternalLinkResponse };
  onCtaTap: { params: { action: string }; response: OnCtaTapResponse };
  sendAnalyticsEvent: {
    params: { state: string; name: string; data: string | null };
    response: SendAnalyticsEventResponse;
  };
  getSessionParams: { params: never; response: GetSessionParamsResponse };
};

declare global {
  interface Window {
    /**
     * Wrapped Container Module interface for invoking native container operations
     */
    WrappedContainerModule: {
      /**
       * Invokes a native container module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: Invoke<ContainerModuleMethods>;
    };
  }
}
