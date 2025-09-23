/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import bridgeSDK from '@grabjs/mobile-kit-bridge-sdk';

export const ContainerAnalyticsEventState = {
  HOMEPAGE: 'HOMEPAGE',
  CHECKOUT_PAGE: 'CHECKOUT_PAGE',
  BOOKING_COMPLETION: 'BOOKING_COMPLETION',
  CUSTOM: 'CUSTOM',
};

export const ContainerAnalyticsEventName = {
  DEFAULT: 'DEFAULT',
};

export const ContainerAnalyticsEventData = {
  TRANSACTION_AMOUNT: 'transaction_amount',
  TRANSACTION_CURRENCY: 'transaction_currency',
  PAGE: 'page',
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

  showLoader() {
    return window.WrappedContainerModule.invoke('showLoader');
  }

  hideLoader() {
    return window.WrappedContainerModule.invoke('hideLoader');
  }

  openExternalLink(url) {
    return window.WrappedContainerModule.invoke('openExternalLink', { url });
  }

  onCtaTap(action) {
    return window.WrappedContainerModule.invoke('onCtaTap', { action });
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

  isConnected() {
    const userAgent = window.navigator && window.navigator.userAgent;
    if (!userAgent) {
      return {
        then: (callback) => callback({
          status_code: 404,
          error: 'User agent not available'
        }),
      };
    }
    
    const isConnected = /grab[a-z]*\//i.test(userAgent);
    return {
      then: (callback) => callback({
        status_code: isConnected ? 200 : 404,
        error: isConnected ? null : 'Not connected to Grab app'
      }),
    };
  }

  getSessionParams() {
    return window.WrappedContainerModule.invoke('getSessionParams');
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

    if (eventDetails.data != null && typeof eventDetails.data !== 'object') {
      return `data must be undefined or an object`;
    }

    return null;
  }
}
