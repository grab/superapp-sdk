/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { isRunningInGrabApp } from '../../utils/platform';
import {
  CloseResponse,
  GetSessionParamsResponse,
  HideBackButtonResponse,
  HideLoaderResponse,
  HideRefreshButtonResponse,
  IsConnectedResponse,
  OnContentLoadedResponse,
  OnCtaTapRequest,
  OnCtaTapResponse,
  OpenExternalLinkRequest,
  OpenExternalLinkResponse,
  SendAnalyticsEventRequest,
  SendAnalyticsEventResponse,
  SetBackgroundColorRequest,
  SetBackgroundColorResponse,
  SetTitleRequest,
  SetTitleResponse,
  ShowBackButtonResponse,
  ShowLoaderResponse,
  ShowRefreshButtonResponse,
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
   * @param request - The background color to set (hex format, e.g., '#ffffff').
   *
   * @returns Confirmation that the background color was set.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Set background color
   * const response = await containerModule.setBackgroundColor('#ffffff');
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Background color set successfully');
   *     break;
   *   case 400:
   *     console.log('Could not set background color:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async setBackgroundColor(
    request: SetBackgroundColorRequest
  ): Promise<SetBackgroundColorResponse> {
    return (await this.invoke('setBackgroundColor', {
      backgroundColor: request,
    })) as SetBackgroundColorResponse;
  }

  /**
   * Set the title of the container header.
   *
   * @param request - The title text to display in the header.
   *
   * @returns Confirmation that the title was set.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Set title
   * const response = await containerModule.setTitle('Home');
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Title set successfully');
   *     break;
   *   case 400:
   *     console.log('Could not set title:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async setTitle(request: SetTitleRequest): Promise<SetTitleResponse> {
    return (await this.invoke('setTitle', { title: request })) as SetTitleResponse;
  }

  /**
   * Hide the back button on the container header.
   *
   * @returns Confirmation that the back button is now hidden.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Hide back button
   * const response = await containerModule.hideBackButton();
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Back button hidden successfully');
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   * }
   * ```
   *
   * @public
   */
  async hideBackButton(): Promise<HideBackButtonResponse> {
    return (await this.invoke('hideBackButton')) as HideBackButtonResponse;
  }

  /**
   * Show the back button on the container header.
   *
   * @returns Confirmation that the back button is now visible.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Show back button
   * const response = await containerModule.showBackButton();
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Back button shown successfully');
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   * }
   * ```
   *
   * @public
   */
  async showBackButton(): Promise<ShowBackButtonResponse> {
    return (await this.invoke('showBackButton')) as ShowBackButtonResponse;
  }

  /**
   * Hide the refresh button on the container header.
   *
   * @returns Confirmation that the refresh button is now hidden.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Hide refresh button
   * const response = await containerModule.hideRefreshButton();
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Refresh button hidden successfully');
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   * }
   * ```
   *
   * @public
   */
  async hideRefreshButton(): Promise<HideRefreshButtonResponse> {
    return (await this.invoke('hideRefreshButton')) as HideRefreshButtonResponse;
  }

  /**
   * Show the refresh button on the container header.
   *
   * @returns Confirmation that the refresh button is now visible.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Show refresh button
   * const response = await containerModule.showRefreshButton();
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Refresh button shown successfully');
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   * }
   * ```
   *
   * @public
   */
  async showRefreshButton(): Promise<ShowRefreshButtonResponse> {
    return (await this.invoke('showRefreshButton')) as ShowRefreshButtonResponse;
  }

  /**
   * Close the container and return to the previous screen.
   *
   * @returns Confirmation that the container is closing.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Close the container
   * const response = await containerModule.close();
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Container closed successfully');
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   * }
   * ```
   *
   * @public
   */
  async close(): Promise<CloseResponse> {
    return (await this.invoke('close')) as CloseResponse;
  }

  /**
   * Notify the Grab SuperApp that the page content has loaded.
   *
   * @returns Confirmation that the content loaded notification was sent.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Notify content loaded
   * const response = await containerModule.onContentLoaded();
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Content loaded notification sent successfully');
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   * }
   * ```
   *
   * @public
   */
  async onContentLoaded(): Promise<OnContentLoadedResponse> {
    return (await this.invoke('onContentLoaded')) as OnContentLoadedResponse;
  }

  /**
   * Show the full-screen loading indicator.
   *
   * @remarks
   * Remember to call {@link ContainerModule.hideLoader} when the operation completes.
   *
   * @returns Confirmation that the loader is now visible.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Show loader
   * const response = await containerModule.showLoader();
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Loader shown successfully');
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   * }
   * ```
   *
   * @public
   */
  async showLoader(): Promise<ShowLoaderResponse> {
    return (await this.invoke('showLoader')) as ShowLoaderResponse;
  }

  /**
   * Hide the full-screen loading indicator.
   *
   * @remarks
   * Should be called when the entry point has finished loading.
   *
   * @returns Confirmation that the loader is now hidden.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Hide loader
   * const response = await containerModule.hideLoader();
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Loader hidden successfully');
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   * }
   * ```
   *
   * @public
   */
  async hideLoader(): Promise<HideLoaderResponse> {
    return (await this.invoke('hideLoader')) as HideLoaderResponse;
  }

  /**
   * Open a link in the external browser.
   *
   * @remarks
   * Call this method to open the specified URL in an external browser (outside of the Grab app).
   *
   * @param request - The URL to open in the external browser.
   *
   * @returns Confirmation of whether the external link was opened successfully.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Open external link
   * const response = await containerModule.openExternalLink('https://grab.com');
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('External link opened successfully');
   *     break;
   *   case 400:
   *     console.log('Could not open external link:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async openExternalLink(request: OpenExternalLinkRequest): Promise<OpenExternalLinkResponse> {
    return (await this.invoke('openExternalLink', {
      url: request,
    })) as OpenExternalLinkResponse;
  }

  /**
   * Notify the client that the user has tapped a call-to-action (CTA).
   *
   * @param request - The action identifier for the CTA that was tapped.
   *
   * @returns Confirmation that the CTA tap was notified.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Notify CTA tap
   * const response = await containerModule.onCtaTap('AV_LANDING_PAGE_CONTINUE');
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('CTA tap notified successfully');
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   * }
   * ```
   *
   * @public
   */
  async onCtaTap(request: OnCtaTapRequest): Promise<OnCtaTapResponse> {
    return (await this.invoke('onCtaTap', { action: request })) as OnCtaTapResponse;
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
   *
   * @param request - Analytics event details including state, name, and optional data.
   *
   * @returns Confirmation of whether the analytics event was sent successfully.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @see {@link ContainerAnalyticsEventState}, {@link ContainerAnalyticsEventName}
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import {
   *   ContainerAnalyticsEventState,
   *   ContainerAnalyticsEventName,
   * } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const {
   *   ContainerAnalyticsEventState,
   *   ContainerAnalyticsEventName,
   * } = window.SuperAppSDK;
   *
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Send analytics event
   * const response = await containerModule.sendAnalyticsEvent({
   *   state: ContainerAnalyticsEventState.HOMEPAGE,
   *   name: ContainerAnalyticsEventName.DEFAULT,
   * });
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Analytics event sent successfully');
   *     break;
   *   case 400:
   *     console.log('Invalid analytics event parameters:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async sendAnalyticsEvent(
    request: SendAnalyticsEventRequest
  ): Promise<SendAnalyticsEventResponse> {
    const validationError = this.validateAnalyticsEvent(request);
    if (validationError) {
      return { status_code: 400, error: validationError };
    }
    return (await this.invoke('sendAnalyticsEvent', {
      state: request.state,
      name: request.name,
      data: request.data ? JSON.stringify(request.data) : null,
    })) as SendAnalyticsEventResponse;
  }

  /**
   * Check if the web app is connected to the Grab SuperApp via JSBridge.
   *
   * @remarks
   * Call this method to verify the connection status before using other features.
   *
   * @returns The connection status, indicating whether the MiniApp is running inside the Grab SuperApp.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Check connection status
   * const response = await containerModule.isConnected();
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Connected to Grab SuperApp');
   *     break;
   *   case 404:
   *     console.log('Not connected to Grab SuperApp');
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async isConnected(): Promise<IsConnectedResponse> {
    const isConnected = isRunningInGrabApp();
    return isConnected
      ? { status_code: 200, result: { connected: true } }
      : { status_code: 404, error: 'Not connected to Grab app' };
  }

  /**
   * Get the session parameters from the container.
   *
   * @remarks
   * The native layer returns session parameters as a JSON string.
   * Parse with `JSON.parse(result.result)` to use as an object.
   * Session parameters can contain primitives, base64 encoded strings, or nested objects.
   *
   * @returns The session parameters as a JSON string that can be parsed into an object.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the container module
   * const containerModule = new ContainerModule();
   *
   * // Get session parameters
   * const response = await containerModule.getSessionParams();
   *
   * switch (response.status_code) {
   *   case 200: {
   *     const sessionParams = JSON.parse(response.result?.result || '{}');
   *     console.log('Session params retrieved:', sessionParams);
   *     break;
   *   }
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   * }
   * ```
   *
   * @public
   */
  async getSessionParams(): Promise<GetSessionParamsResponse> {
    return (await this.invoke('getSessionParams')) as GetSessionParamsResponse;
  }

  /**
   * Validate the analytics event details.
   *
   * @param request - Analytics event details to be validated.
   * @returns Error message if invalid, `null` if valid.
   * @internal
   */
  private validateAnalyticsEvent(request: SendAnalyticsEventRequest): string | null {
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
