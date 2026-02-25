/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WrappedResponse } from '../../core/types';
import { ModuleBase } from '../../core/ModuleBase';
import { AnalyticsEventDetails } from './type';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ContainerAnalyticsEventState, ContainerAnalyticsEventName, ContainerAnalyticsEventData } from './type';

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
   * @param backgroundColor - Hexadecimal color value (e.g., "#ffffff", "#000000").
   *
   * @returns Promise that resolves to {@link WrappedResponse} when background color is set.
   *
   * @example
   * ```javascript
   * // Set to white background
   * containerModule.setBackgroundColor("#ffffff")
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("Background color set successfully");
   *     } else if (error) {
   *       console.error("Error setting background:", error);
   *     }
   *   });
   *
   * // Set to dark background
   * containerModule.setBackgroundColor("#1a1a1a");
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
   * @param title - Title text to display in the navigation bar.
   *
   * @returns Promise that resolves to {@link WrappedResponse} when title is set.
   *
   * @example
   * ```javascript
   * containerModule.setTitle("Home")
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("Title set successfully");
   *     } else if (error) {
   *       console.error("Error setting title:", error);
   *     }
   *   });
   *
   * // Dynamic title based on page
   * const setPageTitle = (pageName) => {
   *   containerModule.setTitle(pageName);
   * };
   * ```
   */
  setTitle(title: string): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('setTitle', { title });
  }

  /**
   * Hide the back button of the container.
   *
   * @returns Promise that resolves to {@link WrappedResponse} when back button is hidden.
   *
   * @example
   * ```javascript
   * containerModule.hideBackButton()
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("Back button hidden");
   *     } else if (error) {
   *       console.error("Error:", error);
   *     }
   *   });
   * ```
   */
  hideBackButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('hideBackButton');
  }

  /**
   * Show the back button of the container.
   *
   * @returns Promise that resolves to {@link WrappedResponse} when back button is shown.
   *
   * @example
   * ```javascript
   * containerModule.showBackButton()
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("Back button shown");
   *     } else if (error) {
   *       console.error("Error:", error);
   *     }
   *   });
   * ```
   */
  showBackButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('showBackButton');
  }

  /**
   * Hide the refresh button of the container.
   *
   * @returns Promise that resolves to {@link WrappedResponse} when refresh button is hidden.
   *
   * @example
   * ```javascript
   * containerModule.hideRefreshButton()
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("Refresh button hidden");
   *     } else if (error) {
   *       console.error("Error:", error);
   *     }
   *   });
   * ```
   */
  hideRefreshButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('hideRefreshButton');
  }

  /**
   * Show the refresh button of the container.
   *
   * @returns Promise that resolves to {@link WrappedResponse} when refresh button is shown.
   *
   * @example
   * ```javascript
   * containerModule.showRefreshButton()
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("Refresh button shown");
   *     } else if (error) {
   *       console.error("Error:", error);
   *     }
   *   });
   * ```
   */
  showRefreshButton(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('showRefreshButton');
  }

  /**
   * Close the container.
   *
   * @remarks
   * This method closes the current webview and returns the user to the previous screen.
   *
   * @returns Promise that resolves to {@link WrappedResponse} when container is closed.
   *
   * @example
   * ```javascript
   * // Close after completing a task
   * containerModule.close()
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("Container closed");
   *     } else if (error) {
   *       console.error("Error:", error);
   *     }
   *   });
   *
   * // Example: Close button handler
   * closeButton.addEventListener('click', () => {
   *   containerModule.close();
   * });
   * ```
   */
  close(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('close');
  }

  /**
   * Notify the client that page content has loaded.
   *
   * @remarks
   * Call this method to inform the container that the page content has finished loading.
   * This can be used to hide loading indicators or trigger post-load actions on the native side.
   *
   * @returns Promise that resolves to {@link WrappedResponse} when notification is sent.
   *
   * @example
   * ```javascript
   * // Notify after page load
   * window.addEventListener('load', () => {
   *   containerModule.onContentLoaded()
   *     .then(({ status_code }) => {
   *       if (status_code === 200) {
   *         console.log("Content loaded notification sent");
   *       }
   *     });
   * });
   *
   * // Notify after async data load
   * async function loadPageData() {
   *   await fetchData();
   *   await containerModule.onContentLoaded();
   * }
   * ```
   */
  onContentLoaded(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('onContentLoaded');
  }

  /**
   * Show the loader in the container.
   *
   * @remarks
   * Call this method to notify the client to show a loading indicator.
   * Remember to call {@link hideLoader} when the operation completes.
   *
   * @returns Promise that resolves to {@link WrappedResponse} when loader is shown.
   *
   * @example
   * ```javascript
   * // Show loader during async operation
   * async function fetchData() {
   *   await containerModule.showLoader();
   *   
   *   try {
   *     const data = await api.fetch();
   *     processData(data);
   *   } finally {
   *     await containerModule.hideLoader();
   *   }
   * }
   * ```
   */
  showLoader(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('showLoader');
  }

  /**
   * Hide the loader in the container.
   *
   * @remarks
   * Call this method to notify the client to hide the loading indicator.
   * Should be called after {@link showLoader} when the operation completes.
   *
   * @returns Promise that resolves to {@link WrappedResponse} when loader is hidden.
   *
   * @example
   * ```javascript
   * containerModule.hideLoader()
   *   .then(({ status_code }) => {
   *     if (status_code === 200) {
   *       console.log("Loader hidden");
   *     }
   *   });
   * ```
   */
  hideLoader(): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('hideLoader');
  }

  /**
   * Open a link in the external browser.
   *
   * @remarks
   * Call this method to tell the client to open the specified URL in an external browser
   * (outside of the Grab app).
   *
   * @param url - URL to open in external browser.
   *
   * @returns Promise that resolves to {@link WrappedResponse} when external link is opened.
   *
   * @example
   * ```javascript
   * containerModule.openExternalLink("https://grab.com")
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("External link opened");
   *     } else if (error) {
   *       console.error("Error opening link:", error);
   *     }
   *   });
   *
   * // Example: Open terms and conditions
   * termsLink.addEventListener('click', (e) => {
   *   e.preventDefault();
   *   containerModule.openExternalLink("https://grab.com/terms");
   * });
   * ```
   */
  openExternalLink(url: string): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('openExternalLink', { url });
  }

  /**
   * Notify the client that the user has tapped a call-to-action (CTA).
   *
   * @remarks
   * Call this method to notify the client that the user has continued the flow.
   * This is useful for analytics and tracking user engagement.
   *
   * @param action - CTA action identifier (e.g., "AV_LANDING_PAGE_CONTINUE", "BOOKING_CONFIRMED").
   *
   * @returns Promise that resolves to {@link WrappedResponse} when CTA tap is notified.
   *
   * @example
   * ```javascript
   * containerModule.onCtaTap("AV_LANDING_PAGE_CONTINUE")
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("CTA tap notified");
   *     } else if (error) {
   *       console.error("Error:", error);
   *     }
   *   });
   *
   * // Example: Notify on button click
   * continueButton.addEventListener('click', () => {
   *   containerModule.onCtaTap("CONTINUE_TO_CHECKOUT");
   *   navigateToCheckout();
   * });
   * ```
   */
  onCtaTap(action: string): Promise<WrappedResponse<undefined>> {
    return window.WrappedContainerModule.invoke('onCtaTap', { action });
  }

  /**
   * Use this method to track user interactions and page transitions.
   *
   * @remarks
   * You can use predefined constants to ensure consistency across the platform.
   *
   * **Predefined Values:**
   * - **States:** {@link ContainerAnalyticsEventState}
   * - **Names:** {@link ContainerAnalyticsEventName}
   * - **Data Keys:** {@link ContainerAnalyticsEventData}
   *
   * @param eventDetails - The details of the event to send.
   *   - `state`: The current context (e.g., {@link ContainerAnalyticsEventState.HOMEPAGE}).
   *   - `name`: The event name (e.g., {@link ContainerAnalyticsEventName.DEFAULT}).
   *   - `data`: Optional metadata. Use {@link ContainerAnalyticsEventData} for standard keys.
   *
   * @returns A promise that resolves when the event has been successfully queued.
   *
   * @see {@link ContainerAnalyticsEventState}, {@link ContainerAnalyticsEventName}, {@link ContainerAnalyticsEventData}
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
   * // Example 1: Send a DEFAULT event for HOMEPAGE state
   * containerModule
   *   .sendAnalyticsEvent({
   *     state: ContainerAnalyticsEventState.HOMEPAGE,
   *     name: ContainerAnalyticsEventName.DEFAULT,
   *   })
   *   .then(({ result, error }) => {
   *     if (error) {
   *       console.error("Validation error:", error);
   *     }
   *   });
   *
   * // Example 2: Send a BOOK event for CHECKOUT_PAGE state with standard data keys
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
   *       console.error("Validation error:", error);
   *     }
   *   });
   *
   * // Example 3: Send a CLICK_RIDE event for CUSTOM state with custom metadata
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
   *       console.error("Validation error:", error);
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
   *
   * @remarks
   * Call this method to verify the connection status before using other SDK features.
   *
   * **Status Codes:**
   * - `200`: Connected to Grab app
   * - `424`: Not connected to Grab app or user agent not available
   *
   * @returns Promise that resolves to {@link WrappedResponse} with connection status.
   *
   * @example
   * ```javascript
   * containerModule.isConnected()
   *   .then(({ status_code, error }) => {
   *     if (status_code === 200) {
   *       console.log("Connected to Grab app");
   *       // Enable SDK features
   *       enableSDKFeatures();
   *     } else if (status_code === 424) {
   *       console.log("Not connected to Grab app");
   *       // Show fallback UI
   *       showWebOnlyExperience();
   *     }
   *   });
   *
   * // Example: Check connection on app init
   * async function initApp() {
   *   const { status_code } = await containerModule.isConnected();
   *   if (status_code === 200) {
   *     // Initialize SDK-dependent features
   *     await locationModule.getCoordinate();
   *   }
   * }
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
   *
   * @remarks
   * Session params can be in any format (primitive, base64 encoded string, etc).
   * Use this to retrieve configuration or state that was passed when opening the webview.
   *
   * @returns Promise that resolves to {@link WrappedResponse} with session parameters attached to the current session.
   *
   * @example
   * ```javascript
   * containerModule.getSessionParams()
   *   .then(({ result, error, status_code }) => {
   *     if (result) {
   *       // Session params can be in any format
   *       // e.g. stringified JSON object '{"param1": 123, "param2": "grab-test"}'
   *       const sessionParams = JSON.parse(result);
   *       console.log("Session parameters:", sessionParams);
   *       
   *       // Use params to configure the app
   *       if (sessionParams.param1) {
   *         configureFeature(sessionParams.param1);
   *       }
   *     } else if (error) {
   *       console.error("Error getting session params:", error);
   *     }
   *   });
   *
   * // Example: Get user ID from session params
   * async function getUserId() {
   *   const { result } = await containerModule.getSessionParams();
   *   const params = JSON.parse(result || '{}');
   *   return params.userId;
   * }
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

export {
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
  ContainerAnalyticsEventData,
} from './type';
