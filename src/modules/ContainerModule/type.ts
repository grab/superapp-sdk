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
