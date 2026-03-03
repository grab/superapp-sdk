/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import {
  SendAnalyticsEventRequest,
  SendAnalyticsEventResponse,
  SetBackgroundColorRequest,
  SetBackgroundColorResponse,
  SetTitleRequest,
  SetTitleResponse,
  HideBackButtonResponse,
  ShowBackButtonResponse,
  HideRefreshButtonResponse,
  ShowRefreshButtonResponse,
  CloseResponse,
  OnContentLoadedResponse,
  ShowLoaderResponse,
  HideLoaderResponse,
  OpenExternalLinkRequest,
  OpenExternalLinkResponse,
  OnCtaTapRequest,
  OnCtaTapResponse,
  IsConnectedResponse,
  GetSessionParamsResponse,
} from './types';

/**
 * JSBridge module for controlling the webview container.
 *
 * @remarks
 * Provides methods to customize the webview UI (title, background color, buttons), manage loading states, send analytics events, and control the webview lifecycle.
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { ContainerModule } from '@grabjs/superapp-sdk';
 * const container = new ContainerModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const container = new SuperAppSDK.ContainerModule();
 * </script>
 * ```
 *
 * @public
 */
export class ContainerModule extends BaseModule {
  constructor() {
    super('ContainerModule');
  }

  /**
   * Set the background color of the container.
   *
   * @param request - Configuration for setting the background color.
   *
   * @returns Resolves when the background color has been applied, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Set background color to white
   * ```typescript
   * await containerModule.setBackgroundColor({ backgroundColor: "#ffffff" });
   * ```
   *
   * @example
   * Set background color to dark
   * ```typescript
   * await containerModule.setBackgroundColor({ backgroundColor: "#1a1a1a" });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.setBackgroundColor(params);
   *   switch (status_code) {
   *     case 200:
   *       console.log('Background color set successfully');
   *       break;
   *     default:
   *       console.log(`Could not set background color${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not set background color${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  setBackgroundColor(request: SetBackgroundColorRequest): Promise<SetBackgroundColorResponse> {
    return window.WrappedContainerModule!.invoke('setBackgroundColor', request);
  }

  /**
   * Set the title of the container.
   *
   * @param request - Configuration for setting the title.
   *
   * @returns Resolves when the title has been set in the navigation bar, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Set title
   * ```typescript
   * await containerModule.setTitle({ title: "Home" });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.setTitle(params);
   *   switch (status_code) {
   *     case 200:
   *       console.log('Title set successfully');
   *       break;
   *     default:
   *       console.log(`Could not set title${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not set title${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  setTitle(request: SetTitleRequest): Promise<SetTitleResponse> {
    return window.WrappedContainerModule!.invoke('setTitle', request);
  }

  /**
   * Hide the back button of the container.
   *
   * @returns Resolves when the back button is hidden, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Hide back button
   * ```typescript
   * await containerModule.hideBackButton();
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.hideBackButton();
   *   switch (status_code) {
   *     case 200:
   *       console.log('Back button hidden successfully');
   *       break;
   *     default:
   *       console.log(`Could not hide back button${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not hide back button${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  hideBackButton(): Promise<HideBackButtonResponse> {
    return window.WrappedContainerModule!.invoke('hideBackButton');
  }

  /**
   * Show the back button of the container.
   *
   * @returns Resolves when the back button is shown, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Show back button
   * ```typescript
   * await containerModule.showBackButton();
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.showBackButton();
   *   switch (status_code) {
   *     case 200:
   *       console.log('Back button shown successfully');
   *       break;
   *     default:
   *       console.log(`Could not show back button${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not show back button${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  showBackButton(): Promise<ShowBackButtonResponse> {
    return window.WrappedContainerModule!.invoke('showBackButton');
  }

  /**
   * Hide the refresh button of the container.
   *
   * @returns Resolves when the refresh button is hidden, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Hide refresh button
   * ```typescript
   * await containerModule.hideRefreshButton();
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.hideRefreshButton();
   *   switch (status_code) {
   *     case 200:
   *       console.log('Refresh button hidden successfully');
   *       break;
   *     default:
   *       console.log(`Could not hide refresh button${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not hide refresh button${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  hideRefreshButton(): Promise<HideRefreshButtonResponse> {
    return window.WrappedContainerModule!.invoke('hideRefreshButton');
  }

  /**
   * Show the refresh button of the container.
   *
   * @returns Resolves when the refresh button is shown, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Show refresh button
   * ```typescript
   * await containerModule.showRefreshButton();
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.showRefreshButton();
   *   switch (status_code) {
   *     case 200:
   *       console.log('Refresh button shown successfully');
   *       break;
   *     default:
   *       console.log(`Could not show refresh button${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not show refresh button${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  showRefreshButton(): Promise<ShowRefreshButtonResponse> {
    return window.WrappedContainerModule!.invoke('showRefreshButton');
  }

  /**
   * Close the container.
   *
   * @remarks
   * This method closes the current webview and returns the user to the previous screen.
   *
   * @returns Resolves when the container closes and the webview is dismissed, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Close after completing a task
   * ```typescript
   * await containerModule.close();
   * ```
   *
   * @example
   * Close button handler
   * ```typescript
   * closeButton.addEventListener('click', async () => {
   *   await containerModule.close();
   * });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.close();
   *   switch (status_code) {
   *     case 200:
   *       console.log('Container closed successfully');
   *       break;
   *     default:
   *       console.log(`Could not close container${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not close container${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  close(): Promise<CloseResponse> {
    return window.WrappedContainerModule!.invoke('close');
  }

  /**
   * Notify the client that page content has loaded.
   *
   * @remarks
   * Call this method to inform the container that the page content has finished loading.
   * This can be used to hide loading indicators or trigger post-load actions on the native side.
   *
   * @returns Resolves when the content loaded notification is sent, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Notify on page load
   * ```typescript
   * window.addEventListener('load', async () => {
   *   await containerModule.onContentLoaded();
   * });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.onContentLoaded();
   *   switch (status_code) {
   *     case 200:
   *       console.log('Content loaded notification sent successfully');
   *       break;
   *     default:
   *       console.log(`Could not notify content loaded${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not notify content loaded${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  onContentLoaded(): Promise<OnContentLoadedResponse> {
    return window.WrappedContainerModule!.invoke('onContentLoaded');
  }

  /**
   * Show the loader in the container.
   *
   * @remarks
   * Call this method to notify the client to show a loading indicator.
   * Remember to call {@link ContainerModule.hideLoader} when the operation completes.
   *
   * @returns Resolves when the loading indicator is displayed, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Show loader during data fetch
   * ```typescript
   * async function fetchData() {
   *   await containerModule.showLoader();
   *   const data = await api.fetch();
   *   processData(data);
   *   await containerModule.hideLoader();
   * }
   * fetchData();
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.showLoader();
   *   switch (status_code) {
   *     case 200:
   *       console.log('Loader shown successfully');
   *       break;
   *     default:
   *       console.log(`Could not show loader${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not show loader${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  showLoader(): Promise<ShowLoaderResponse> {
    return window.WrappedContainerModule!.invoke('showLoader');
  }

  /**
   * Hide the loader in the container.
   *
   * @remarks
   * Call this method to notify the client to hide the loading indicator.
   * Should be called after {@link ContainerModule.showLoader} when the operation completes.
   *
   * @returns Resolves when the loading indicator is hidden, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Hide loader
   * ```typescript
   * await containerModule.hideLoader();
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.hideLoader();
   *   switch (status_code) {
   *     case 200:
   *       console.log('Loader hidden successfully');
   *       break;
   *     default:
   *       console.log(`Could not hide loader${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not hide loader${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  hideLoader(): Promise<HideLoaderResponse> {
    return window.WrappedContainerModule!.invoke('hideLoader');
  }

  /**
   * Open a link in the external browser.
   *
   * @remarks
   * Call this method to tell the client to open the specified URL in an external browser
   * (outside of the Grab app).
   *
   * @param request - Configuration for opening the external link.
   *
   * @returns Resolves when the external browser opens with the URL, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Open external link
   * ```typescript
   * await containerModule.openExternalLink({ url: "https://grab.com" });
   * ```
   *
   * @example
   * Open terms and conditions
   * ```typescript
   * termsLink.addEventListener('click', async (e) => {
   *   e.preventDefault();
   *   await containerModule.openExternalLink({ url: "https://grab.com/terms" });
   * });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.openExternalLink(params);
   *   switch (status_code) {
   *     case 200:
   *       console.log('External link opened successfully');
   *       break;
   *     default:
   *       console.log(`Could not open external link${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not open external link${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  openExternalLink(request: OpenExternalLinkRequest): Promise<OpenExternalLinkResponse> {
    return window.WrappedContainerModule!.invoke('openExternalLink', request);
  }

  /**
   * Notify the client that the user has tapped a call-to-action (CTA).
   *
   * @remarks
   * Call this method to notify the client that the user has continued the flow.
   * This is useful for analytics and tracking user engagement.
   *
   * @param request - Configuration for notifying CTA tap.
   *
   * @returns Resolves when the CTA tap notification is sent, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Notify CTA tap
   * ```typescript
   * await containerModule.onCtaTap({ action: "AV_LANDING_PAGE_CONTINUE" });
   * ```
   *
   * @example
   * Notify on button click
   * ```typescript
   * continueButton.addEventListener('click', async () => {
   *   await containerModule.onCtaTap({ action: "CONTINUE_TO_CHECKOUT" });
   *   navigateToCheckout();
   * });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.onCtaTap(params);
   *   switch (status_code) {
   *     case 200:
   *       console.log('CTA tap notified successfully');
   *       break;
   *     default:
   *       console.log(`Could not notify CTA tap${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not notify CTA tap${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  onCtaTap(request: OnCtaTapRequest): Promise<OnCtaTapResponse> {
    return window.WrappedContainerModule!.invoke('onCtaTap', request);
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
   * @param request - Details for analytics events sent to the container.
   *
   * @returns Resolves when the analytics event is queued for delivery, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
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
   * await containerModule.sendAnalyticsEvent({
   *   state: ContainerAnalyticsEventState.HOMEPAGE,
   *   name: ContainerAnalyticsEventName.DEFAULT,
   * });
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
   * await containerModule.sendAnalyticsEvent({
   *   state: ContainerAnalyticsEventState.CHECKOUT_PAGE,
   *   name: "BOOK",
   *   data: {
   *     [ContainerAnalyticsEventData.TRANSACTION_AMOUNT]: 100,
   *     [ContainerAnalyticsEventData.TRANSACTION_CURRENCY]: "SGD",
   *   },
   * });
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
   * await containerModule.sendAnalyticsEvent({
   *   state: ContainerAnalyticsEventState.CUSTOM,
   *   name: "CLICK_RIDE",
   *   data: {
   *     [ContainerAnalyticsEventData.PAGE]: "LIST_RIDES",
   *     departure_time: "2025-06-01 08:00:00",
   *     arrival_time: "2025-06-01 10:30:00",
   *     departure_address: "6 Bayfront Ave, Singapore 018974",
   *     arrival_address:
   *       "Petronas Twin Tower, Kuala Lumpur City Centre, 50088 Kuala Lumpur, Malaysia",
   *   },
   * });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.sendAnalyticsEvent(params);
   *   switch (status_code) {
   *     case 200:
   *       console.log('Analytics event sent successfully');
   *       break;
   *     default:
   *       console.log(`Could not send analytics event${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not send analytics event${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  sendAnalyticsEvent(request: SendAnalyticsEventRequest): Promise<SendAnalyticsEventResponse> {
    const validationError = this.validateAnalyticsEvent(request);
    if (validationError) {
      return Promise.resolve({ status_code: 400, error: validationError });
    }
    return window.WrappedContainerModule!.invoke('sendAnalyticsEvent', {
      state: request.state,
      name: request.name,
      data: request.data ? JSON.stringify(request.data) : null,
    });
  }

  /**
   * Check if the web app is connected to the Grab app via JSBridge.
   *
   * @remarks
   * Call this method to verify the connection status before using other SDK features.
   *
   * @returns Resolves with the JSBridge connection status to the Grab app, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Check connection status
   * ```typescript
   * const { status_code, result } = await containerModule.isConnected();
   * if (status_code === 200 && result?.connected) {
   *   console.log("Connected to Grab app");
   *   enableSDKFeatures();
   * } else {
   *   console.log("Not connected to Grab app");
   *   showWebOnlyExperience();
   * }
   * ```
   *
   * @example
   * Check connection on app init
   * ```typescript
   * const { status_code, result } = await containerModule.isConnected();
   * if (status_code === 200 && result?.connected) {
   *   await locationModule.getCoordinate();
   * }
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.isConnected();
   *   switch (status_code) {
   *     case 200:
   *       console.log('Connection status retrieved:', result?.connected);
   *       break;
   *     default:
   *       console.log(`Could not check connection${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not check connection${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  isConnected(): Promise<IsConnectedResponse> {
    const userAgent = window.navigator && window.navigator.userAgent;
    if (!userAgent) {
      return Promise.resolve({
        status_code: 404,
        error: 'User agent not available',
      });
    }

    const isConnected = /grab[a-z]*\//i.test(userAgent);
    return Promise.resolve(
      isConnected
        ? { status_code: 200, result: { connected: true } }
        : { status_code: 404, error: 'Not connected to Grab app' }
    );
  }

  /**
   * Get the session parameters from the container.
   *
   * @remarks
   * The native layer returns session parameters as a JSON string. Parse with `JSON.parse(result.result)` to
   * use as an object. Session params can contain primitives, base64 encoded strings, or nested objects.
   *
   * @returns Resolves with session parameters from the container, or with error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Get session parameters
   * ```typescript
   * const { result } = await containerModule.getSessionParams();
   * if (result?.result) {
   *   const sessionParams = JSON.parse(result.result);
   *   console.log("Session parameters:", sessionParams);
   *   if (sessionParams.param1) {
   *     configureFeature(sessionParams.param1);
   *   }
   * }
   * ```
   *
   * @example
   * Get user ID from session params
   * ```typescript
   * const { result } = await containerModule.getSessionParams();
   * const params = JSON.parse(result?.result || '{}');
   * return params.userId;
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await containerModule.getSessionParams();
   *   switch (status_code) {
   *     case 200:
   *       const sessionParams = JSON.parse(result?.result || '{}');
   *       console.log('Session params retrieved:', sessionParams);
   *       break;
   *     default:
   *       console.log(`Could not get session params${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not get session params${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  getSessionParams(): Promise<GetSessionParamsResponse> {
    return window.WrappedContainerModule!.invoke('getSessionParams');
  }

  /**
   * Validate the analytics event details.
   *
   * @param request - Details for analytics events sent to the container.
   * @returns Error message if invalid, `null` if valid.
   * @internal
   */
  private validateAnalyticsEvent(request: SendAnalyticsEventRequest) {
    if (request.name == null) {
      return 'name is required';
    }
    if (typeof request.name !== 'string') {
      return 'name must be a string';
    }

    if (request.state == null) {
      return 'state is required';
    }
    if (typeof request.state !== 'string') {
      return 'state must be a string';
    }

    if (request.data != null && typeof request.data !== 'object') {
      return `data must be undefined or an object`;
    }

    return null;
  }
}
