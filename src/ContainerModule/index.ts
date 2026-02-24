/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WrappedResponse } from '../type';
import { ModuleBase } from '../ModuleBase';

const ContainerAnalyticsEventState = {
  HOMEPAGE: 'HOMEPAGE',
  CHECKOUT_PAGE: 'CHECKOUT_PAGE',
  BOOKING_COMPLETION: 'BOOKING_COMPLETION',
  CUSTOM: 'CUSTOM',
} as const;

type ContainerAnalyticsEventState = typeof ContainerAnalyticsEventState[keyof typeof ContainerAnalyticsEventState];

const ContainerAnalyticsEventName = {
  DEFAULT: 'DEFAULT',
} as const;

type ContainerAnalyticsEventName = typeof ContainerAnalyticsEventName[keyof typeof ContainerAnalyticsEventName];

const ContainerAnalyticsEventData = {
  TRANSACTION_AMOUNT: 'transaction_amount',
  TRANSACTION_CURRENCY: 'transaction_currency',
  PAGE: 'page',
} as const;

type ContainerAnalyticsEventData = typeof ContainerAnalyticsEventData[keyof typeof ContainerAnalyticsEventData];

interface AnalyticsEventDetails {
  state: ContainerAnalyticsEventState | string;
  name: ContainerAnalyticsEventName | string;
  data?: Record<string, any> | null;
}

/**
 * ContainerModule class provides methods to interact with the container
 */
class ContainerModule extends ModuleBase {
  constructor() {
    super('ContainerModule');
  }

  /**
   * Set the background color of the container
   */
  setBackgroundColor(backgroundColor: string): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke<undefined>('setBackgroundColor', {
      backgroundColor,
    });
  }

  /**
   * Set the title of the container
   */
  setTitle(title: string): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke<undefined>('setTitle', { title });
  }

  /**
   * Hide the back button of the container
   */
  hideBackButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke<undefined>('hideBackButton');
  }

  /**
   * Show the back button of the container
   */
  showBackButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke<undefined>('showBackButton');
  }

  /**
   * Hide the refresh button of the container
   */
  hideRefreshButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke<undefined>('hideRefreshButton');
  }

  /**
   * Show the refresh button of the container
   */
  showRefreshButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke<undefined>('showRefreshButton');
  }

  /**
   * Close the container
   */
  close(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke<undefined>('close');
  }

  onContentLoaded(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke<undefined>('onContentLoaded');
  }

  /**
   * Show the loader of the container
   */
  showLoader(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke<undefined>('showLoader');
  }

  /**
   * Hide the loader of the container
   */
  hideLoader(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke<undefined>('hideLoader');
  }

  /**
   * Open a link in the external browser
   */
  openExternalLink(url: string): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke<undefined>('openExternalLink', { url });
  }

  onCtaTap(action: string): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke<undefined>('onCtaTap', { action });
  }

  /**
   * Send an analytics event to the container
   */
  sendAnalyticsEvent(eventDetails: AnalyticsEventDetails): Promise<WrappedResponse<undefined>> {
    const validationError = this._validateAnalyticsEvent(eventDetails);
    if (validationError) {
      return Promise.resolve({
        status_code: 400,
        error: validationError,
      });
    }
    return window.WrappedContainerModule.invoke<undefined>(
      'sendAnalyticsEvent',
      {
        state: eventDetails.state,
        name: eventDetails.name,
        data: eventDetails.data ? JSON.stringify(eventDetails.data) : null,
      }
    );
  }

  /**
   * Check if the client is connected to the container
   */
  isConnected(): Promise<WrappedResponse<undefined>> {
    const userAgent = window.navigator && window.navigator.userAgent;
    if (!userAgent) {
      return Promise.resolve({
        status_code: 424,
        error: 'User agent not available',
        result: undefined,
      });
    }

    const isConnected = /grab[a-z]*\//i.test(userAgent);
    if (isConnected) {
      return Promise.resolve({
        status_code: 200,
        result: undefined,
        error: undefined,
      });
    }
    return Promise.resolve({
      status_code: 424,
      error: 'Not connected to Grab app',
    });
  }

  /**
   * Get the session parameters from the container
   */
  getSessionParams(): Promise<WrappedResponse<any>> {
    return window.WrappedContainerModule.invoke<any>('getSessionParams');
  }

  /**
   * Validate the analytics event details
   */
  private _validateAnalyticsEvent(eventDetails: AnalyticsEventDetails): string | null {
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

export { 
  ContainerModule, 
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
  ContainerAnalyticsEventData,
  AnalyticsEventDetails,
};
