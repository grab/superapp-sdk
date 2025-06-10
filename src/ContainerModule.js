/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const bridgeSDK = require('@grabjs/mobile-kit-bridge-sdk');

export const AnalyticsEventState = {
  HOMEPAGE: 'HOMEPAGE',
  CHECKOUT_PAGE: 'CHECKOUT_PAGE',
  BOOKING_COMPLETION: 'BOOKING_COMPLETION',
  CUSTOM: 'CUSTOM',
};

export const AnalyticsEventName = {
  HOMEPAGE: {
    DEFAULT: 'DEFAULT',
    INITIATE: 'INITIATE',
  },
  CHECKOUT_PAGE: {
    DEFAULT: 'DEFAULT',
    BOOK: 'BOOK',
  },
  BOOKING_COMPLETION: {
    DEFAULT: 'DEFAULT',
  },
  CUSTOM: {
    DEFAULT: 'DEFAULT',
  },
};

export class ContainerModule {
  constructor() {
    bridgeSDK.wrapModule(window, 'ContainerModule');
  }

  setBackgroundColor(backgroundColor) {
    return window.WrappedContainerModule.invoke('setBackgroundColor', {
      backgroundColor,
    });
  }

  setTitle(title) {
    return window.WrappedContainerModule.invoke('setTitle', { title });
  }

  hideBackButton() {
    return window.WrappedContainerModule.invoke('hideBackButton');
  }

  showBackButton() {
    return window.WrappedContainerModule.invoke('showBackButton');
  }

  hideRefreshButton() {
    return window.WrappedContainerModule.invoke('hideRefreshButton');
  }

  showRefreshButton() {
    return window.WrappedContainerModule.invoke('showRefreshButton');
  }

  close() {
    return window.WrappedContainerModule.invoke('close');
  }

  onContentLoaded() {
    return window.WrappedContainerModule.invoke('onContentLoaded');
  }

  openExternalLink(url) {
    return window.WrappedContainerModule.invoke('openExternalLink', { url });
  }

  sendAnalyticsEvent(eventDetails) {
    const validationError = this._validateAnalyticsEvent(eventDetails);
    if (validationError) {
      return {
        then: (callback) => callback({ status_code: 400, error: validationError }),
      };
    }
    return window.WrappedContainerModule.invoke(
      'sendAnalyticsEvent',
      {
        state: eventDetails.state,
        name: eventDetails.name,
        data: eventDetails.data ? JSON.stringify(eventDetails.data) : null,
      }
    );
  }

  _validateAnalyticsEvent(eventDetails) {
    const requiredFields = ['state', 'name'];
    for (const field of requiredFields) {
      if (eventDetails[field] == null) {
        return `Missing required field: ${field}`;
      }
    }

    if (typeof eventDetails.name !== 'string') {
      return 'name must be a string';
    }

    if (typeof eventDetails.state !== 'string') {
      return 'state must be a string';
    }
    const allowedStates = Object.values(AnalyticsEventState);
    if (!allowedStates.includes(eventDetails.state)) {
      return `Invalid state. Must be one of: ${allowedStates.join(', ')}`;
    }

    if (eventDetails.data != null && typeof eventDetails.data !== 'object') {
      return 'data must be an object';
    }

    switch (eventDetails.state) {
      case AnalyticsEventState.HOMEPAGE:
        return this._validateHomepageState(eventDetails.name, eventDetails.data);
      case AnalyticsEventState.CHECKOUT_PAGE:
        return this._validateCheckoutPageState(eventDetails.name, eventDetails.data);
      case AnalyticsEventState.BOOKING_COMPLETION:
        return this._validateBookingCompletionState(eventDetails.name, eventDetails.data);
      case AnalyticsEventState.CUSTOM:
        return this._validateCustomState(eventDetails.name, eventDetails.data);
      default:
        return null;
    }
  }

  _validateHomepageState(name, data) {
    switch (name) {
      case AnalyticsEventName.HOMEPAGE.DEFAULT:
        return null;
      case AnalyticsEventName.HOMEPAGE.INITIATE:
        return null;
      default:
        return null;
    }
  }

  _validateCheckoutPageState(name, data) {
    switch (name) {
      case AnalyticsEventName.CHECKOUT_PAGE.DEFAULT:
        return null;
      case AnalyticsEventName.CHECKOUT_PAGE.BOOK:
        if (data.booking_amount == null) {
          return `${AnalyticsEventName.CHECKOUT_PAGE.BOOK} event requires booking_amount in data to be defined`;
        }
        if (typeof data.booking_amount !== 'number') {
          return `${AnalyticsEventName.CHECKOUT_PAGE.BOOK} event requires booking_amount in data to be a number`;
        }
        if (data.booking_currency == null) {
          return `${AnalyticsEventName.CHECKOUT_PAGE.BOOK} event requires booking_currency in data to be defined`;
        }
        if (typeof data.booking_currency !== 'string') {
          return `${AnalyticsEventName.CHECKOUT_PAGE.BOOK} event requires booking_currency in data to be a string`;
        }
        return null;
      default:
        return null;
    }
  }

  _validateBookingCompletionState(name, data) {
    switch (name) {
      case AnalyticsEventName.BOOKING_COMPLETION.DEFAULT:
        return null;
      default:
        return null;
    }
  }

  _validateCustomState(name, data) {
    switch (name) {
      case AnalyticsEventName.CUSTOM.DEFAULT:
        if (data.page == null) {
          return `${AnalyticsEventName.CUSTOM.DEFAULT} event requires page in data to be defined`;
        }
        if (typeof data.page !== 'string') {
          return `${AnalyticsEventName.CUSTOM.DEFAULT} event requires page in data to be a string`;
        }
        return null;
      default:
        return null;
    }
  }
}
