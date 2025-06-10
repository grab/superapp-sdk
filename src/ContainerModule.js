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
    if (eventDetails.name == null) {
      return 'name is required';
    }
    if (typeof eventDetails.name !== 'string') {
      return 'name must be a string';
    }

    if (eventDetails.state == null) {
      return 'state is required';
    }
    if (typeof eventDetails.state !== 'string') {
      return 'state must be a string';
    }
    const allowedStates = Object.values(AnalyticsEventState);
    if (!allowedStates.includes(eventDetails.state)) {
      return `state must be one of: ${allowedStates.join(', ')}`;
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
        return `name must be one of: ${[AnalyticsEventName.HOMEPAGE.DEFAULT, AnalyticsEventName.HOMEPAGE.INITIATE].join(', ')}`;
    }
  }

  _validateCheckoutPageState(name, data) {
    switch (name) {
      case AnalyticsEventName.CHECKOUT_PAGE.DEFAULT:
        return null;
      case AnalyticsEventName.CHECKOUT_PAGE.BOOK:
        if (data == null) {
          return `data is required for ${AnalyticsEventName.CHECKOUT_PAGE.BOOK} event`;
        }
        if (typeof data !== 'object') {
          return `data must be an object for ${AnalyticsEventName.CHECKOUT_PAGE.BOOK} event`;
        }

        if (data.booking_amount == null) {
          return `data.booking_amount is required for ${AnalyticsEventName.CHECKOUT_PAGE.BOOK} event`;
        }

        if (typeof data.booking_amount !== 'number') {
          return `data.booking_amount must be a number for ${AnalyticsEventName.CHECKOUT_PAGE.BOOK} event`;
        }

        if (data.booking_currency == null) {
          return `data.booking_currency is required for ${AnalyticsEventName.CHECKOUT_PAGE.BOOK} event`;
        }

        if (typeof data.booking_currency !== 'string') {
          return `data.booking_currency must be a string for ${AnalyticsEventName.CHECKOUT_PAGE.BOOK} event`;
        }
        return null;
      default:
        return `name must be one of: ${[AnalyticsEventName.CHECKOUT_PAGE.DEFAULT, AnalyticsEventName.CHECKOUT_PAGE.BOOK].join(', ')}`;
    }
  }

  _validateBookingCompletionState(name, data) {
    switch (name) {
      case AnalyticsEventName.BOOKING_COMPLETION.DEFAULT:
        return null;
      default:
        return `name must be one of: ${[AnalyticsEventName.BOOKING_COMPLETION.DEFAULT].join(', ')}`;
    }
  }

  _validateCustomState(name, data) {
     if (data == null) {
      return `data is required for ${AnalyticsEventState.CUSTOM} state`;
    }
    if (typeof data !== 'object') {
      return `data must be an object for ${AnalyticsEventState.CUSTOM} state`;
    }

    if (data.page == null) {
      return `data.page is required`;
    }
    if (typeof data.page !== 'string') {
      return `data.page must be a string`;
    }

    switch (name) {
      case AnalyticsEventName.CUSTOM.DEFAULT:
        return null;
      default:
        return null;
    }
  }
}
