/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Container analytics event state constants
 */
export const ContainerAnalyticsEventState = {
  HOMEPAGE: 'HOMEPAGE',
  CHECKOUT_PAGE: 'CHECKOUT_PAGE',
  BOOKING_COMPLETION: 'BOOKING_COMPLETION',
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
  TRANSACTION_AMOUNT: 'transaction_amount',
  TRANSACTION_CURRENCY: 'transaction_currency',
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
   * The state in which the event occurred
   */
  state: string;
  /**
   * The name of the event
   */
  name: string;
  /**
   * Optional data associated with the event
   */
  data?: Record<string, any> | null;
}
