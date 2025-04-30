/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const bridgeSDK = require('@grabjs/mobile-kit-bridge-sdk');

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

  sendAnalyticsEvent(eventDetails) {
    const validationError = this._validateAnalyticsEvent(eventDetails);
    if (validationError) {
      return {
        then: (callback) => callback({ result: null, error: validationError }),
      };
    }
    return window.WrappedContainerModule.invoke(
      'sendAnalyticsEvent',
      eventDetails
    );
  }

  _validateAnalyticsEvent(eventDetails) {
    const requiredFields = ['eventName'];
    for (const field of requiredFields) {
      if (!eventDetails[field]) {
        return `Missing required field: ${field}`;
      }
    }

    if (eventDetails.sessionId && typeof eventDetails.sessionId !== 'string') {
      return 'sessionId must be a string';
    }
    if (eventDetails.viewName && typeof eventDetails.viewName !== 'string') {
      return 'viewName must be a string';
    }

    const allowedEvents = [
      'STARTED',
      'PAYMENT_INITIATED',
      'ERROR_OCCURRED',
      'CUSTOM',
    ];
    if (!allowedEvents.includes(eventDetails.eventName)) {
      return `Invalid eventName. Must be one of: ${allowedEvents.join(', ')}`;
    }

    switch (eventDetails.eventName) {
      case 'STARTED':
        if (
          eventDetails.eventData !== null &&
          eventDetails.eventData !== undefined
        ) {
          return 'STARTED event should have empty eventData';
        }
        break;

      case 'PAYMENT_INITIATED':
        if (
          !eventDetails.eventData ||
          typeof eventDetails.eventData.transactionId !== 'string'
        ) {
          return 'PAYMENT_INITIATED event requires transactionId as a string';
        }
        if (eventDetails.eventData.products) {
          if (!Array.isArray(eventDetails.eventData.products)) {
            return 'products must be an array';
          }
          for (const product of eventDetails.eventData.products) {
            if (!product.id) {
              return 'product id is required';
            }
            if (typeof product.id !== 'string') {
              return 'product id must be a string';
            }
            if (product.quantity && typeof product.quantity !== 'number') {
              return 'product quantity must be a number';
            }
          }
        }
        if (
          eventDetails.eventData.amount &&
          typeof eventDetails.eventData.amount !== 'number'
        ) {
          return 'amount must be a number';
        }
        if (
          eventDetails.eventData.currency &&
          typeof eventDetails.eventData.currency !== 'string'
        ) {
          return 'currency must be a string';
        }
        if (
          eventDetails.eventData.promoCodes &&
          (!Array.isArray(eventDetails.eventData.promoCodes) ||
            !eventDetails.eventData.promoCodes.every(
              (code) => typeof code === 'string'
            ))
        ) {
          return 'promoCodes must be an array of strings';
        }
        break;

      case 'ERROR_OCCURRED':
        if (
          !eventDetails.eventData ||
          typeof eventDetails.eventData.errorCode !== 'string'
        ) {
          return 'ERROR_OCCURRED event requires errorCode as a string';
        }
        if (
          eventDetails.eventData.errorMessage &&
          typeof eventDetails.eventData.errorMessage !== 'string'
        ) {
          return 'errorMessage must be a string';
        }
        break;

      case 'CUSTOM':
        if (
          !eventDetails.eventData ||
          typeof eventDetails.eventData.customEventName !== 'string'
        ) {
          return 'CUSTOM event requires customEventName as a string in eventData';
        }
        break;
    }

    return null;
  }
}
