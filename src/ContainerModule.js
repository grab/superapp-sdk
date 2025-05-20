/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const bridgeSDK = require('@grabjs/mobile-kit-bridge-sdk');

export const AnalyticsEventName = {
  STARTED: 'STARTED',
  PAYMENT_STATUS_UPDATED: 'PAYMENT_STATUS_UPDATED',
  ERROR_OCCURRED: 'ERROR_OCCURRED',
  CUSTOM: 'CUSTOM',
};

export const ErrorSeverity = {
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  CRITICAL: 'CRITICAL',
};

export const PaymentStatusCode = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  CANCEL: 'CANCEL',
  PROCESSING: 'PROCESSING',
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

  sendAnalyticsEvent(eventDetails) {
    const validationError = this._validateAnalyticsEvent(eventDetails);
    if (validationError) {
      return {
        then: (callback) => callback({ result: null, error: validationError }),
      };
    }
    return window.WrappedContainerModule.invoke(
      'sendAnalyticsEvent',
      {
        url: eventDetails.url,
        sessionId: eventDetails.sessionId,
        viewName: eventDetails.viewName,
        eventName: eventDetails.eventName,
        eventData: JSON.stringify(eventDetails.eventData),
      }
    );
  }

  _validateAnalyticsEvent(eventDetails) {
    const requiredFields = ['eventName'];
    for (const field of requiredFields) {
      if (!eventDetails[field]) {
        return `Missing required field: ${field}`;
      }
    }

    if (eventDetails.url && typeof eventDetails.url !== 'string') {
      return 'url must be a string';
    }
    if (eventDetails.sessionId && typeof eventDetails.sessionId !== 'string') {
      return 'sessionId must be a string';
    }
    if (eventDetails.viewName && typeof eventDetails.viewName !== 'string') {
      return 'viewName must be a string';
    }

    const allowedEvents = Object.values(AnalyticsEventName);
    if (!allowedEvents.includes(eventDetails.eventName)) {
      return `Invalid eventName. Must be one of: ${allowedEvents.join(', ')}`;
    }

    switch (eventDetails.eventName) {
      case AnalyticsEventName.STARTED:
        return this._validateStartedEvent(eventDetails.eventData);

      case AnalyticsEventName.PAYMENT_STATUS_UPDATED:
        return this._validatePaymentStatusUpdatedEvent(eventDetails.eventData);

      case AnalyticsEventName.ERROR_OCCURRED:
        return this._validateErrorOccurredEvent(eventDetails.eventData);

      case AnalyticsEventName.CUSTOM:
        return this._validateCustomEvent(eventDetails.eventData);
    }

    return null;
  }

  _validateStartedEvent(eventData) {
    if (eventData !== null && eventData !== undefined) {
      return `${AnalyticsEventName.STARTED} event should have empty eventData`;
    }
    return null;
  }

  _validatePaymentStatusUpdatedEvent(eventData) {
    if (!eventData) {
      return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event requires eventData`;
    }
    if (typeof eventData !== 'object' || Array.isArray(eventData)) {
      return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event requires eventData to be an object`;
    }

    const allowedPaymentFields = ['transactionId', 'statusCode', 'statusMessage', 'products', 'amount', 'currency', 'promoCodes'];
    const paymentFields = Object.keys(eventData);
    const additionalPaymentFields = paymentFields.filter(field => !allowedPaymentFields.includes(field));
    if (additionalPaymentFields.length > 0) {
      return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event does not allow additional fields in eventData: ${additionalPaymentFields.join(', ')}`;
    }

    if (eventData.transactionId && typeof eventData.transactionId !== 'string') {
      return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event requires transactionId in eventData to be a string`;
    }

    if (!eventData.statusCode) {
      return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event requires statusCode in eventData to be defined`;
    }
    if (typeof eventData.statusCode !== 'string') {
      return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event requires statusCode in eventData to be a string`;
    }
    const allowedStatusCodes = Object.values(PaymentStatusCode);
    if (!allowedStatusCodes.includes(eventData.statusCode)) {
      return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event requires statusCode in eventData to be one of: ${allowedStatusCodes.join(', ')}`;
    }

    if (eventData.statusMessage && typeof eventData.statusMessage !== 'string') {
      return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event requires statusMessage in eventData to be a string`;
    }

    if (eventData.products) {
      if (!Array.isArray(eventData.products)) {
        return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event requires products in eventData to be an array`;
      }
      for (const product of eventData.products) {
        const allowedProductFields = ['id', 'quantity'];
        const productFields = Object.keys(product);
        const additionalProductFields = productFields.filter(field => !allowedProductFields.includes(field));
        if (additionalProductFields.length > 0) {
          return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event does not allow additional fields in eventData.products item: ${additionalProductFields.join(', ')}`;
        }

        if (!product.id) {
          return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event requires id in eventData.products item to be defined`;
        }
        if (typeof product.id !== 'string') {
          return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event requires id in eventData.products item to be a string`;
        }
        if (product.quantity && typeof product.quantity !== 'number') {
          return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event requires quantity in eventData.products item to be a number`;
        }
      }
    }

    if (eventData.amount && typeof eventData.amount !== 'number') {
      return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event requires amount in eventData to be a number`;
    }
    if (eventData.currency && typeof eventData.currency !== 'string') {
      return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event requires currency in eventData to be a string`;
    }
    if (
      eventData.promoCodes &&
      (!Array.isArray(eventData.promoCodes) ||
        !eventData.promoCodes.every((code) => typeof code === 'string'))
    ) {
      return `${AnalyticsEventName.PAYMENT_STATUS_UPDATED} event requires promoCodes in eventData to be an array of strings`;
    }

    return null;
  }

  _validateErrorOccurredEvent(eventData) {
    if (!eventData) {
      return `${AnalyticsEventName.ERROR_OCCURRED} event requires eventData`;
    }
    if (typeof eventData !== 'object' || Array.isArray(eventData)) {
      return `${AnalyticsEventName.ERROR_OCCURRED} event requires eventData to be an object`;
    }

    const allowedErrorFields = ['errorCode', 'errorMessage', 'errorSeverity'];
    const errorFields = Object.keys(eventData);
    const additionalErrorFields = errorFields.filter(field => !allowedErrorFields.includes(field));
    if (additionalErrorFields.length > 0) {
      return `${AnalyticsEventName.ERROR_OCCURRED} event does not allow additional fields in eventData: ${additionalErrorFields.join(', ')}`;
    }

    if (!eventData.errorCode) {
      return `${AnalyticsEventName.ERROR_OCCURRED} event requires errorCode in eventData to be defined`;
    }
    if (typeof eventData.errorCode !== 'string') {
      return `${AnalyticsEventName.ERROR_OCCURRED} event requires errorCode in eventData to be a string`;
    }
    if (eventData.errorMessage && typeof eventData.errorMessage !== 'string') {
      return `${AnalyticsEventName.ERROR_OCCURRED} event requires errorMessage in eventData to be a string`;
    }
    if (eventData.errorSeverity && !Object.values(ErrorSeverity).includes(eventData.errorSeverity)) {
      return `${AnalyticsEventName.ERROR_OCCURRED} event requires errorSeverity in eventData to be one of: ${Object.values(ErrorSeverity).join(', ')}`;
    }

    return null;
  }

  _validateCustomEvent(eventData) {
    if (!eventData) {
      return `${AnalyticsEventName.CUSTOM} event requires eventData`;
    }
    if (typeof eventData !== 'object' || Array.isArray(eventData)) {
      return `${AnalyticsEventName.CUSTOM} event requires eventData to be an object`;
    }

    const allowedCustomFields = ['customEventName', 'customEventData'];
    const customFields = Object.keys(eventData);
    const additionalCustomFields = customFields.filter(field => !allowedCustomFields.includes(field));
    if (additionalCustomFields.length > 0) {
      return `${AnalyticsEventName.CUSTOM} event does not allow additional fields in eventData: ${additionalCustomFields.join(', ')}`;
    }

    if (!eventData.customEventName) {
      return `${AnalyticsEventName.CUSTOM} event requires customEventName in eventData to be defined`;
    }
    if (typeof eventData.customEventName !== 'string') {
      return `${AnalyticsEventName.CUSTOM} event requires customEventName in eventData to be a string`;
    }

    return null;
  }
}
