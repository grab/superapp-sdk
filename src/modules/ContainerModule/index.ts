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
 * The ContainerModule provides APIs to interact with the webview container.
 *
 * @example
 * ```javascript
 * import { ContainerModule } from "@grabjs/superapp-sdk";
 *
 * // Ideally, initialize this only once and reuse across app.
 * const containerModule = new ContainerModule();
 * ```
 */
class ContainerModule extends ModuleBase {
  constructor() {
    super('ContainerModule');
  }

  /**
   * Set the background color of the container.
   *
   * @param backgroundColor - Hexadecimal color value (e.g., "#ffffff")
   * @returns Promise that resolves when background color is set
   *
   * @example
   * ```javascript
   * containerModule.setBackgroundColor("#ffffff").then(({ result, error }) => {
   *   if (error) {
   *     // Some error happened.
   *   }
   * });
   * ```
   */
  setBackgroundColor(backgroundColor: string): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('setBackgroundColor', {
      backgroundColor,
    });
  }

  /**
   * Set the title of the container.
   *
   * @param title - Title of the page
   * @returns Promise that resolves when title is set
   *
   * @example
   * ```javascript
   * containerModule.setTitle("Home").then(({ result, error }) => {
   *   if (error) {
   *     // Some error happened.
   *   }
   * });
   * ```
   */
  setTitle(title: string): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('setTitle', { title });
  }

  /**
   * Hide the back button of the container.
   *
   * @returns Promise that resolves when back button is hidden
   *
   * @example
   * ```javascript
   * containerModule.hideBackButton().then(({ result, error }) => {
   *   if (error) {
   *     // Some error happened.
   *   }
   * });
   * ```
   */
  hideBackButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('hideBackButton');
  }

  /**
   * Show the back button of the container.
   *
   * @returns Promise that resolves when back button is shown
   *
   * @example
   * ```javascript
   * containerModule.showBackButton().then(({ result, error }) => {
   *   if (error) {
   *     // Some error happened.
   *   }
   * });
   * ```
   */
  showBackButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('showBackButton');
  }

  /**
   * Hide the refresh button of the container.
   *
   * @returns Promise that resolves when refresh button is hidden
   *
   * @example
   * ```javascript
   * containerModule.hideRefreshButton().then(({ result, error }) => {
   *   if (result) {
   *     // There is a valid result.
   *   } else if (error) {
   *     // Some error happened.
   *   }
   * });
   * ```
   */
  hideRefreshButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('hideRefreshButton');
  }

  /**
   * Show the refresh button of the container.
   *
   * @returns Promise that resolves when refresh button is shown
   *
   * @example
   * ```javascript
   * containerModule.showRefreshButton().then(({ result, error }) => {
   *   if (result) {
   *     // There is a valid result.
   *   } else if (error) {
   *     // Some error happened.
   *   }
   * });
   * ```
   */
  showRefreshButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('showRefreshButton');
  }

  /**
   * Close the container.
   *
   * @returns Promise that resolves when container is closed
   *
   * @example
   * ```javascript
   * containerModule.close().then(({ result, error }) => {
   *   if (result) {
   *     // There is a valid result.
   *   } else if (error) {
   *     // Some error happened.
   *   }
   * });
   * ```
   */
  close(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('close');
  }

  /**
   * Notify the client that page content has loaded.
   * Call this method to inform the container that the page content has finished loading.
   *
   * @returns Promise that resolves when notification is sent
   *
   * @example
   * ```javascript
   * containerModule.onContentLoaded().then(({ result, error }) => {
   *   if (result) {
   *     // There is a valid result.
   *   } else if (error) {
   *     // Some error happened.
   *   }
   * });
   * ```
   */
  onContentLoaded(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('onContentLoaded');
  }

  /**
   * Show the loader in the container.
   * Call this method to notify the client to show a loading indicator.
   *
   * @returns Promise that resolves when loader is shown
   *
   * @example
   * ```javascript
   * containerModule.showLoader().then(({ result, error }) => {
   *   if (error) {
   *     // Some error happened.
   *   }
   * });
   * ```
   */
  showLoader(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('showLoader');
  }

  /**
   * Hide the loader in the container.
   * Call this method to notify the client to hide the loading indicator.
   *
   * @returns Promise that resolves when loader is hidden
   *
   * @example
   * ```javascript
   * containerModule.hideLoader().then(({ result, error }) => {
   *   if (error) {
   *     // Some error happened.
   *   }
   * });
   * ```
   */
  hideLoader(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('hideLoader');
  }

  /**
   * Open a link in the external browser.
   * Call this method to tell the client to open the specified URL in an external browser.
   *
   * @param url - URL to open in external browser
   * @returns Promise that resolves when external link is opened
   *
   * @example
   * ```javascript
   * containerModule
   *   .openExternalLink("https://grab.com")
   *   .then(({ result, error }) => {
   *     if (result) {
   *       // There is a valid result.
   *     } else if (error) {
   *       // Some error happened.
   *     }
   *   });
   * ```
   */
  openExternalLink(url: string): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('openExternalLink', { url });
  }

  /**
   * Notify the client that the user has tapped a call-to-action (CTA).
   * Call this method to notify the client that the user has continued the flow.
   *
   * @param action - CTA action identifier (e.g., "AV_LANDING_PAGE_CONTINUE")
   * @returns Promise that resolves when CTA tap is notified
   *
   * @example
   * ```javascript
   * containerModule
   *   .onCtaTap("AV_LANDING_PAGE_CONTINUE")
   *   .then(({ result, error }) => {
   *     if (result) {
   *       // There is a valid result.
   *     } else if (error) {
   *       // Some error happened.
   *     }
   *   });
   * ```
   */
  onCtaTap(action: string): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('onCtaTap', { action });
  }

  /**
   * Send an analytics event to the container.
   *
   * **Predefined ContainerAnalyticsEventState:**
   * - `HOMEPAGE`
   * - `CHECKOUT_PAGE`
   * - `BOOKING_COMPLETION`
   * - `CUSTOM`
   *
   * **Predefined ContainerAnalyticsEventName:**
   * - `DEFAULT`
   *
   * **Predefined ContainerAnalyticsEventData:**
   * - `TRANSACTION_AMOUNT`: 'transaction_amount'
   * - `TRANSACTION_CURRENCY`: 'transaction_currency'
   * - `PAGE`: 'page'
   *
   * @param eventDetails - Event details containing state, name, and data
   * @param eventDetails.state - State of the event (required)
   * @param eventDetails.name - Name of the event (required)
   * @param eventDetails.data - Additional data for the event (optional)
   * @returns Promise that resolves when analytics event is sent
   *
   * @example
   * ```javascript
   * import {
   *   ContainerModule,
   *   ContainerAnalyticsEventState,
   *   ContainerAnalyticsEventName,
   *   ContainerAnalyticsEventData,
   * } from "@grabjs/superapp-sdk";
   *
   * const containerModule = new ContainerModule();
   *
   * // Example: Send a DEFAULT event for HOMEPAGE state
   * containerModule
   *   .sendAnalyticsEvent({
   *     state: ContainerAnalyticsEventState.HOMEPAGE,
   *     name: ContainerAnalyticsEventName.DEFAULT,
   *   })
   *   .then(({ result, error }) => {
   *     if (error) {
   *       // Handle validation or other errors
   *     }
   *   });
   *
   * // Example: Send a BOOK event for CHECKOUT_PAGE state
   * containerModule
   *   .sendAnalyticsEvent({
   *     state: ContainerAnalyticsEventState.CHECKOUT_PAGE,
   *     name: "BOOK",
   *     data: {
   *       [ContainerAnalyticsEventData.TRANSACTION_AMOUNT]: 100,
   *       [ContainerAnalyticsEventData.TRANSACTION_CURRENCY]: "SGD",
   *     },
   *   })
   *   .then(({ result, error }) => {
   *     if (error) {
   *       // Handle validation or other errors
   *     }
   *   });
   *
   * // Example: Send a CLICK_RIDE event for CUSTOM state
   * containerModule
   *   .sendAnalyticsEvent({
   *     state: ContainerAnalyticsEventState.CUSTOM,
   *     name: "CLICK_RIDE",
   *     data: {
   *       [ContainerAnalyticsEventData.PAGE]: "LIST_RIDES",
   *       departure_time: "2025-06-01 08:00:00",
   *       arrival_time: "2025-06-01 10:30:00",
   *       departure_address: "6 Bayfront Ave, Singapore 018974",
   *       arrival_address:
   *         "Petronas Twin Tower, Kuala Lumpur City Centre, 50088 Kuala Lumpur, Malaysia",
   *     },
   *   })
   *   .then(({ result, error }) => {
   *     if (error) {
   *       // Handle validation or other errors
   *     }
   *   });
   * ```
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
   * Check if the web app is connected to the Grab app via JSBridge.
   * Call this method to verify the connection status.
   *
   * **Status Codes:**
   * - `200`: Connected to Grab app
   * - `424`: Not connected to Grab app or user agent not available
   *
   * @returns Promise that resolves with connection status
   *
   * @example
   * ```javascript
   * containerModule.isConnected().then(({ status_code, error }) => {
   *   if (status_code === 200) {
   *     // Connected to Grab app
   *   } else if (error) {
   *     // Not connected to Grab app
   *   }
   * });
   * ```
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
   * Get the session parameters from the container.
   * Session params can be in any format (primitive, base64 encoded string, etc).
   *
   * @returns Promise that resolves with session parameters attached to the current session
   *
   * @example
   * ```javascript
   * containerModule.getSessionParams().then(({ result, error }) => {
   *   if (result) {
   *     // Session params can be in any format (primitive, base64 encoded string, etc)
   *     // e.g. stringified JSON object '{"param1": 123, "param2": "grab-test"}'
   *     const sessionParams = JSON.parse(result);
   *     console.log("Session parameters:", sessionParams);
   *   } else if (error) {
   *     // Some error happened.
   *     console.error("Error getting session params:", error);
   *   }
   * });
   * ```
   */
  getSessionParams(): Promise<WrappedResponse<Record<string, unknown>>> {
    return window.WrappedContainerModule.invoke('getSessionParams');
  }

  /**
   * Validate the analytics event details
   * @internal
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

export default ContainerModule;

export type { AnalyticsEventDetails };
