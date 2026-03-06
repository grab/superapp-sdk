/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { isRunningInGrabApp } from '../../utils/user-agent';
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
 * @group Modules
 *
 * @remarks
 * Provides methods to interact with the webview container.
 * This code must run on the Grab SuperApp's webview to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { ContainerModule } from '@grabjs/superapp-sdk';
 * const containerModule = new ContainerModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const containerModule = new SuperAppSDK.ContainerModule();
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
   * Set the background color of the container header.
   *
   * @param request - The background color configuration.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Background color set successfully
   * - `400`: Invalid background color
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ContainerModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ContainerModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Set background color
   * try {
   *   const response = await containerModule.setBackgroundColor('#ffffff');
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not set background color:', response.error);
   *   } else if (isResponseOk(response)) {
   *     console.log('Background color set successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  setBackgroundColor(request: SetBackgroundColorRequest): Promise<SetBackgroundColorResponse> {
    return this.wrappedModule.invoke('setBackgroundColor', {
      backgroundColor: request,
    });
  }

  /**
   * Set the title of the container header.
   *
   * @param request - The title configuration.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Title set successfully
   * - `400`: Invalid title parameter
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ContainerModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ContainerModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Set title
   * try {
   *   const response = await containerModule.setTitle('Home');
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not set title:', response.error);
   *   } else if (isResponseOk(response)) {
   *     console.log('Title set successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  setTitle(request: SetTitleRequest): Promise<SetTitleResponse> {
    return this.wrappedModule.invoke('setTitle', { title: request });
  }

  /**
   * Hide the back button on the container header.
   *
   * @returns A promise that resolves to a `200` status code when the back button is hidden.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ContainerModule, isResponseOk } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Hide back button
   * try {
   *   const response = await containerModule.hideBackButton();
   *
   *   if (isResponseOk(response)) {
   *     console.log('Back button hidden successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  hideBackButton(): Promise<HideBackButtonResponse> {
    return this.wrappedModule.invoke('hideBackButton');
  }

  /**
   * Show the back button on the container header.
   *
   * @returns A promise that resolves to a `200` status code when the back button is shown.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ContainerModule, isResponseOk } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Show back button
   * try {
   *   const response = await containerModule.showBackButton();
   *
   *   if (isResponseOk(response)) {
   *     console.log('Back button shown successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  showBackButton(): Promise<ShowBackButtonResponse> {
    return this.wrappedModule.invoke('showBackButton');
  }

  /**
   * Hide the refresh button on the container header.
   *
   * @returns A promise that resolves to a `200` status code when the refresh button is hidden.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ContainerModule, isResponseOk } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Hide refresh button
   * try {
   *   const response = await containerModule.hideRefreshButton();
   *
   *   if (isResponseOk(response)) {
   *     console.log('Refresh button hidden successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  hideRefreshButton(): Promise<HideRefreshButtonResponse> {
    return this.wrappedModule.invoke('hideRefreshButton');
  }

  /**
   * Show the refresh button on the container header.
   *
   * @returns A promise that resolves to a `200` status code when the refresh button is shown.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ContainerModule, isResponseOk } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Show refresh button
   * try {
   *   const response = await containerModule.showRefreshButton();
   *
   *   if (isResponseOk(response)) {
   *     console.log('Refresh button shown successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  showRefreshButton(): Promise<ShowRefreshButtonResponse> {
    return this.wrappedModule.invoke('showRefreshButton');
  }

  /**
   * Close the container and return to the previous screen.
   *
   * @returns A promise that resolves to a `200` status code when the container closes.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ContainerModule, isResponseOk } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Close the container
   * try {
   *   const response = await containerModule.close();
   *
   *   if (isResponseOk(response)) {
   *     console.log('Container closed successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  close(): Promise<CloseResponse> {
    return this.wrappedModule.invoke('close');
  }

  /**
   * Notify the Grab SuperApp that the page content has loaded.
   *
   * @returns A promise that resolves to a `200` status code when the notification is sent.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ContainerModule, isResponseOk } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Notify content loaded
   * try {
   *   const response = await containerModule.onContentLoaded();
   *
   *   if (isResponseOk(response)) {
   *     console.log('Content loaded notification sent successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  onContentLoaded(): Promise<OnContentLoadedResponse> {
    return this.wrappedModule.invoke('onContentLoaded');
  }

  /**
   * Show the full-screen loading indicator.
   *
   * @remarks
   * Remember to call {@link ContainerModule.hideLoader} when the operation completes.
   *
   * @returns A promise that resolves to a `200` status code when the loading indicator is displayed.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ContainerModule, isResponseOk } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Show loader
   * try {
   *   const response = await containerModule.showLoader();
   *
   *   if (isResponseOk(response)) {
   *     console.log('Loader shown successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  showLoader(): Promise<ShowLoaderResponse> {
    return this.wrappedModule.invoke('showLoader');
  }

  /**
   * Hide the full-screen loading indicator.
   *
   * @remarks
   * Should be called when the entry point has finished loading.
   *
   * @returns A promise that resolves to a `200` status code when the loading indicator is hidden.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ContainerModule, isResponseOk } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Hide loader
   * try {
   *   const response = await containerModule.hideLoader();
   *
   *   if (isResponseOk(response)) {
   *     console.log('Loader hidden successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  hideLoader(): Promise<HideLoaderResponse> {
    return this.wrappedModule.invoke('hideLoader');
  }

  /**
   * Open a link in the external browser.
   *
   * @remarks
   * Call this method to open the specified URL in an external browser (outside of the Grab app).
   *
   * @param request - The URL configuration.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: External link opened successfully
   * - `400`: URL parameter not found
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ContainerModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ContainerModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Open external link
   * try {
   *   const response = await containerModule.openExternalLink('https://grab.com');
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not open external link:', response.error);
   *   } else if (isResponseOk(response)) {
   *     console.log('External link opened successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  openExternalLink(request: OpenExternalLinkRequest): Promise<OpenExternalLinkResponse> {
    return this.wrappedModule.invoke('openExternalLink', {
      url: request,
    });
  }

  /**
   * Notify the client that the user has tapped a call-to-action (CTA).
   *
   * @param request - The CTA action configuration.
   *
   * @returns A promise that resolves to a `200` response when the CTA tap notification is sent.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ContainerModule, isResponseOk } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Notify CTA tap
   * try {
   *   const response = await containerModule.onCtaTap('AV_LANDING_PAGE_CONTINUE');
   *
   *   if (isResponseOk(response)) {
   *     console.log('CTA tap notified successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  onCtaTap(request: OnCtaTapRequest): Promise<OnCtaTapResponse> {
    return this.wrappedModule.invoke('onCtaTap', { action: request });
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
   *   @param request - The analytics event configuration.
   *
   * @returns A promise that resolves to a `200` response when the analytics event is sent.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @see {@link ContainerAnalyticsEventState}, {@link ContainerAnalyticsEventName}, {@link ContainerAnalyticsEventData}
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import {
   *   ContainerModule,
   *   ContainerAnalyticsEventState,
   *   ContainerAnalyticsEventName,
   *   isResponseOk
   * } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const {
   *   ContainerModule,
   *   ContainerAnalyticsEventState,
   *   ContainerAnalyticsEventName,
   *   isResponseOk
   * } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Send analytics event
   * try {
   *   const response = await containerModule.sendAnalyticsEvent({
   *     state: ContainerAnalyticsEventState.HOMEPAGE,
   *     name: ContainerAnalyticsEventName.DEFAULT,
   *   });
   *
   *   if (isResponseOk(response)) {
   *     console.log('Analytics event sent successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  sendAnalyticsEvent(request: SendAnalyticsEventRequest): Promise<SendAnalyticsEventResponse> {
    const validationError = this.validateAnalyticsEvent(request);
    if (validationError) {
      return Promise.resolve({ status_code: 400, result: undefined, error: validationError });
    }
    return this.wrappedModule.invoke('sendAnalyticsEvent', {
      state: request.state,
      name: request.name,
      data: request.data ? JSON.stringify(request.data) : null,
    });
  }

  /**
   * Check if the web app is connected to the Grab SuperApp via JSBridge.
   *
   * @remarks
   * Call this method to verify the connection status before using other features.
   *
   *   @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Connected to Grab SuperApp
   * - `404`: Not connected to Grab SuperApp
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ContainerModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ContainerModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Check connection status
   * try {
   *   const response = await containerModule.isConnected();
   *
   *   if (isResponseError(response)) {
   *     console.log('Not connected to Grab SuperApp');
   *   } else if (isResponseOk(response)) {
   *     console.log('Connected to Grab SuperApp');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  isConnected(): Promise<IsConnectedResponse> {
    const isConnected = isRunningInGrabApp();
    return Promise.resolve(
      isConnected
        ? { status_code: 200, result: null, error: null }
        : { status_code: 404, error: 'Not connected to Grab app', result: null }
    );
  }

  /**
   * Get the session parameters from the container.
   *
   * @remarks
   * The native layer returns session parameters as a JSON string.
   * Parse with `JSON.parse(result.result)` to use as an object.
   * Session parameters can contain primitives, base64 encoded strings, or nested objects.
   *
   * @returns A promise that resolves to a `200` status code with session parameters.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ContainerModule, isResponseOk } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Get session parameters
   * try {
   *   const response = await containerModule.getSessionParams();
   *
   *   if (isResponseOk(response)) {
   *     const sessionParams = JSON.parse(response.result?.result || '{}');
   *     console.log('Session params retrieved:', sessionParams);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  getSessionParams(): Promise<GetSessionParamsResponse> {
    return this.wrappedModule.invoke('getSessionParams');
  }

  /**
   * Validate the analytics event details.
   *
   * @param request - Analytics event details to be validated.
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
