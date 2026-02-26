/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Response, BaseModule } from '../../core';
import { AnalyticsEventDetails } from './types';

/**
 * Provides APIs to interact with the webview container.
 *
 * @remarks
 * The ContainerModule enables miniapps to control the webview container's appearance and behavior,
 * including navigation controls, loading indicators, analytics tracking, and session management.
 *
 * @example
 * Initialize the ContainerModule:
 * ```typescript
 * import { ContainerModule } from '@grabjs/superapp-sdk';
 *
 * const containerModule = new ContainerModule();
 * ```
 */
class ContainerModule extends BaseModule {
  constructor() {
    super('ContainerModule');
  }

  /**
   * Set the background color of the container.
   *
   * @param backgroundColor - Hexadecimal color value (e.g., "#ffffff", "#000000").
   *
   * @returns Promise that resolves to {@link Response} when background color is set.
   *
   * @example
   * ```typescript
   * try {
   *   await containerModule.setBackgroundColor("#ffffff");
   *   await containerModule.setBackgroundColor("#1a1a1a");
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  setBackgroundColor(backgroundColor: string): Promise<Response<undefined>> {
    return window.WrappedContainerModule.invoke('setBackgroundColor', {
      backgroundColor,
    });
  }

  /**
   * Set the title of the container.
   *
   * @param title - Title text to display in the navigation bar.
   *
   * @returns Promise that resolves to {@link Response} when title is set.
   *
   * @example
   * ```typescript
   * try {
   *   await containerModule.setTitle("Home");
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  setTitle(title: string): Promise<Response<undefined>> {
    return window.WrappedContainerModule.invoke('setTitle', { title });
  }

  /**
   * Hide the back button of the container.
   *
   * @returns Promise that resolves to {@link Response} when back button is hidden.
   *
   * @example
   * ```typescript
   * try {
   *   await containerModule.hideBackButton();
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  hideBackButton(): Promise<Response<undefined>> {
    return window.WrappedContainerModule.invoke('hideBackButton');
  }

  /**
   * Show the back button of the container.
   *
   * @returns Promise that resolves to {@link Response} when back button is shown.
   *
   * @example
   * ```typescript
   * try {
   *   await containerModule.showBackButton();
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  showBackButton(): Promise<Response<undefined>> {
    return window.WrappedContainerModule.invoke('showBackButton');
  }

  /**
   * Hide the refresh button of the container.
   *
   * @returns Promise that resolves to {@link Response} when refresh button is hidden.
   *
   * @example
   * ```typescript
   * try {
   *   await containerModule.hideRefreshButton();
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  hideRefreshButton(): Promise<Response<undefined>> {
    return window.WrappedContainerModule.invoke('hideRefreshButton');
  }

  /**
   * Show the refresh button of the container.
   *
   * @returns Promise that resolves to {@link Response} when refresh button is shown.
   *
   * @example
   * ```typescript
   * try {
   *   await containerModule.showRefreshButton();
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  showRefreshButton(): Promise<Response<undefined>> {
    return window.WrappedContainerModule.invoke('showRefreshButton');
  }

  /**
   * Close the container.
   *
   * @remarks
   * This method closes the current webview and returns the user to the previous screen.
   *
   * @returns Promise that resolves to {@link Response} when container is closed.
   *
   * @example
   * Close after completing a task
   * ```typescript
   * try {
   *   await containerModule.close();
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Close button handler
   * ```typescript
   * closeButton.addEventListener('click', async () => {
   *   try {
   *     await containerModule.close();
   *   } catch (error) {
   *     console.error(error);
   *   }
   * });
   * ```
   */
  close(): Promise<Response<undefined>> {
    return window.WrappedContainerModule.invoke('close');
  }

  /**
   * Notify the client that page content has loaded.
   *
   * @remarks
   * Call this method to inform the container that the page content has finished loading.
   * This can be used to hide loading indicators or trigger post-load actions on the native side.
   *
   * @returns Promise that resolves to {@link Response} when notification is sent.
   *
   * @example
   * ```typescript
   * window.addEventListener('load', async () => {
   *   try {
   *     await containerModule.onContentLoaded();
   *   } catch (error) {
   *     console.error(error);
   *   }
   * });
   * ```
   */
  onContentLoaded(): Promise<Response<undefined>> {
    return window.WrappedContainerModule.invoke('onContentLoaded');
  }

  /**
   * Show the loader in the container.
   *
   * @remarks
   * Call this method to notify the client to show a loading indicator.
   * Remember to call {@link hideLoader} when the operation completes.
   *
   * @returns Promise that resolves to {@link Response} when loader is shown.
   *
   * @example
   * ```typescript
   * async function fetchData() {
   *   try {
   *     await containerModule.showLoader();
   *     const data = await api.fetch();
   *     processData(data);
   *   } catch (error) {
   *     console.error(error);
   *   } finally {
   *     await containerModule.hideLoader();
   *   }
   * }
   * fetchData();
   * ```
   */
  showLoader(): Promise<Response<undefined>> {
    return window.WrappedContainerModule.invoke('showLoader');
  }

  /**
   * Hide the loader in the container.
   *
   * @remarks
   * Call this method to notify the client to hide the loading indicator.
   * Should be called after {@link showLoader} when the operation completes.
   *
   * @returns Promise that resolves to {@link Response} when loader is hidden.
   *
   * @example
   * ```typescript
   * try {
   *   await containerModule.hideLoader();
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  hideLoader(): Promise<Response<undefined>> {
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
   * @returns Promise that resolves to {@link Response} when external link is opened.
   *
   * @example
   * Open external link
   * ```typescript
   * try {
   *   await containerModule.openExternalLink("https://grab.com");
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Open terms and conditions
   * ```typescript
   * termsLink.addEventListener('click', async (e) => {
   *   e.preventDefault();
   *   try {
   *     await containerModule.openExternalLink("https://grab.com/terms");
   *   } catch (error) {
   *     console.error(error);
   *   }
   * });
   * ```
   */
  openExternalLink(url: string): Promise<Response<undefined>> {
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
   * @returns Promise that resolves to {@link Response} when CTA tap is notified.
   *
   * @example
   * Notify CTA tap
   * ```typescript
   * try {
   *   await containerModule.onCtaTap("AV_LANDING_PAGE_CONTINUE");
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Notify on button click
   * ```typescript
   * continueButton.addEventListener('click', async () => {
   *   try {
   *     await containerModule.onCtaTap("CONTINUE_TO_CHECKOUT");
   *     navigateToCheckout();
   *   } catch (error) {
   *     console.error(error);
   *   }
   * });
   * ```
   */
  onCtaTap(action: string): Promise<Response<undefined>> {
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
   * @param eventDetails - Details for analytics events sent to the container.
   *
   * @returns A promise that resolves when the event has been successfully queued.
   *
   * @see {@link ContainerAnalyticsEventState}, {@link ContainerAnalyticsEventName}, {@link ContainerAnalyticsEventData}
   *
   * @example
   * Send a DEFAULT event for HOMEPAGE state
   * ```typescript
   * import {
   *   ContainerAnalyticsEventState,
   *   ContainerAnalyticsEventName,
   * } from "@grabjs/superapp-sdk";
   *
   * try {
   *   await containerModule.sendAnalyticsEvent({
   *     state: ContainerAnalyticsEventState.HOMEPAGE,
   *     name: ContainerAnalyticsEventName.DEFAULT,
   *   });
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Send a BOOK event for CHECKOUT_PAGE state with standard data keys
   * ```typescript
   * import {
   *   ContainerAnalyticsEventState,
   *   ContainerAnalyticsEventData,
   * } from "@grabjs/superapp-sdk";
   *
   * try {
   *   await containerModule.sendAnalyticsEvent({
   *     state: ContainerAnalyticsEventState.CHECKOUT_PAGE,
   *     name: "BOOK",
   *     data: {
   *       [ContainerAnalyticsEventData.TRANSACTION_AMOUNT]: 100,
   *       [ContainerAnalyticsEventData.TRANSACTION_CURRENCY]: "SGD",
   *     },
   *   });
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Send a CLICK_RIDE event for CUSTOM state with custom metadata
   * ```typescript
   * import {
   *   ContainerAnalyticsEventState,
   *   ContainerAnalyticsEventData,
   * } from "@grabjs/superapp-sdk";
   *
   * try {
   *   await containerModule.sendAnalyticsEvent({
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
   *   });
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  sendAnalyticsEvent(eventDetails: AnalyticsEventDetails): Promise<Response<undefined>> {
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
   * @returns Promise that resolves to {@link Response} with connection status.
   *
   * @example
   * Check connection status
   * ```typescript
   * try {
   *   const { status_code } = await containerModule.isConnected();
   *   if (status_code === 200) {
   *     console.log("Connected to Grab app");
   *     enableSDKFeatures();
   *   } else if (status_code === 424) {
   *     console.log("Not connected to Grab app");
   *     showWebOnlyExperience();
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Check connection on app init
   * ```typescript
   * try {
   *   const { status_code } = await containerModule.isConnected();
   *   if (status_code === 200) {
   *     await locationModule.getCoordinate();
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  isConnected(): Promise<Response<undefined>> {
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
      result: undefined,
    });
  }

  /**
   * Get the session parameters from the container.
   *
   * @remarks
   * Session params can be in any format (primitive, base64 encoded string, etc).
   * Use this to retrieve configuration or state that was passed when opening the webview.
   *
   * @returns Promise that resolves to {@link Response} with session parameters attached to the current session.
   *
   * @example
   * Get session parameters
   * ```typescript
   * try {
   *   const { result } = await containerModule.getSessionParams();
   *   if (result) {
   *     const sessionParams = JSON.parse(result);
   *     console.log("Session parameters:", sessionParams);
   *     if (sessionParams.param1) {
   *       configureFeature(sessionParams.param1);
   *     }
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Get user ID from session params
   * ```typescript
   * try {
   *   const { result } = await containerModule.getSessionParams();
   *   const params = JSON.parse(result || '{}');
   *   return params.userId;
   * } catch (error) {
   *   console.error(error);
   *   return null;
   * }
   * ```
   */
  getSessionParams(): Promise<Response<Record<string, unknown>>> {
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

    if (eventDetails.data !== undefined && typeof eventDetails.data !== 'object') {
      return `data must be undefined or an object`;
    }

    return null;
  }
}

export default ContainerModule;
