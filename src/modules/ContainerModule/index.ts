/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WrappedResponse } from '../../core/types';
import { ModuleBase } from '../../core/ModuleBase';
import { AnalyticsEventDetails } from './type';

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
    return window.WrappedContainerModule.invoke('setBackgroundColor', {
      backgroundColor,
    });
  }

  /**
   * Set the title of the container
   */
  setTitle(title: string): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('setTitle', { title });
  }

  /**
   * Hide the back button of the container
   */
  hideBackButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('hideBackButton');
  }

  /**
   * Show the back button of the container
   */
  showBackButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('showBackButton');
  }

  /**
   * Hide the refresh button of the container
   */
  hideRefreshButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('hideRefreshButton');
  }

  /**
   * Show the refresh button of the container
   */
  showRefreshButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('showRefreshButton');
  }

  /**
   * Close the container
   */
  close(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('close');
  }

  onContentLoaded(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('onContentLoaded');
  }

  /**
   * Show the loader of the container
   */
  showLoader(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('showLoader');
  }

  /**
   * Hide the loader of the container
   */
  hideLoader(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('hideLoader');
  }

  /**
   * Open a link in the external browser
   */
  openExternalLink(url: string): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('openExternalLink', { url });
  }

  onCtaTap(action: string): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('onCtaTap', { action });
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
    return window.WrappedContainerModule.invoke('sendAnalyticsEvent', {
      state: eventDetails.state,
      name: eventDetails.name,
      data: eventDetails.data ? JSON.stringify(eventDetails.data) : null,
    });
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
  getSessionParams(): Promise<WrappedResponse<Record<string, unknown>>> {
    return window.WrappedContainerModule.invoke('getSessionParams');
  }

  /**
   * Validate the analytics event details
   */
  private _validateAnalyticsEvent(eventDetails: AnalyticsEventDetails): string | null {
    if (eventDetails.name === null || eventDetails.name === undefined) {
      return 'name is required';
    }
    if (typeof eventDetails.name !== 'string') {
      return 'name must be a string';
    }

    if (eventDetails.state === null || eventDetails.state === undefined) {
      return 'state is required';
    }
    if (typeof eventDetails.state !== 'string') {
      return 'state must be a string';
    }

    if (
      (eventDetails.data !== null || eventDetails.data !== undefined) &&
      typeof eventDetails.data !== 'object'
    ) {
      return `data must be undefined or an object`;
    }

    return null;
  }
}

export { ContainerModule };
export {
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
  ContainerAnalyticsEventData,
  AnalyticsEventDetails,
} from './type';
