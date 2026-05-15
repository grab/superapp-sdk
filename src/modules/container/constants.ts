/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

/**
 * Constants for container analytics event states.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const ContainerAnalyticsEventState = {
  HOMEPAGE: 'HOMEPAGE',
  CHECKOUT_PAGE: 'CHECKOUT_PAGE',
  BOOKING_COMPLETION: 'BOOKING_COMPLETION',
  CUSTOM: 'CUSTOM',
};

/**
 * Constants for container analytics event names.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const ContainerAnalyticsEventName = {
  DEFAULT: 'DEFAULT',
};

/**
 * Constants for container analytics event data.
 *
 * @group Modules
 * @category Container
 *
 * @public
 */
export const ContainerAnalyticsEventData = {
  TRANSACTION_AMOUNT: 'transaction_amount',
  TRANSACTION_CURRENCY: 'transaction_currency',
  PAGE: 'page',
};
