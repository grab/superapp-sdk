/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
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
 * JSBridge module for controlling the WebView container.
 *
 * @group Modules
 *
 * @remarks
 * Provides methods to interact with the WebView container.
 * This code must run on the Grab SuperApp's WebView to function correctly.
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
 * @noInheritDoc
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
   * import { ContainerModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Set background color
   * const response = await container.setBackgroundColor('#ffffff');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Background color set successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async setBackgroundColor(
    request: SetBackgroundColorRequest
  ): Promise<SetBackgroundColorResponse> {
    return (await this.invoke({
      method: 'setBackgroundColor',
      params: { backgroundColor: request },
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
   * import { ContainerModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Set title
   * const response = await container.setTitle('Home');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Title set successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async setTitle(request: SetTitleRequest): Promise<SetTitleResponse> {
    return (await this.invoke({
      method: 'setTitle',
      params: { title: request },
    })) as SetTitleResponse;
  }

  /**
   * Hide the back button on the container header.
   *
   * @returns Confirmation that the back button is now hidden.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Hide back button
   * const response = await container.hideBackButton();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Back button hidden successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async hideBackButton(): Promise<HideBackButtonResponse> {
    return (await this.invoke({ method: 'hideBackButton' })) as HideBackButtonResponse;
  }

  /**
   * Show the back button on the container header.
   *
   * @returns Confirmation that the back button is now visible.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Show back button
   * const response = await container.showBackButton();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Back button shown successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async showBackButton(): Promise<ShowBackButtonResponse> {
    return (await this.invoke({ method: 'showBackButton' })) as ShowBackButtonResponse;
  }

  /**
   * Hide the refresh button on the container header.
   *
   * @returns Confirmation that the refresh button is now hidden.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Hide refresh button
   * const response = await container.hideRefreshButton();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Refresh button hidden successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async hideRefreshButton(): Promise<HideRefreshButtonResponse> {
    return (await this.invoke({ method: 'hideRefreshButton' })) as HideRefreshButtonResponse;
  }

  /**
   * Show the refresh button on the container header.
   *
   * @returns Confirmation that the refresh button is now visible.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Show refresh button
   * const response = await container.showRefreshButton();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Refresh button shown successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async showRefreshButton(): Promise<ShowRefreshButtonResponse> {
    return (await this.invoke({ method: 'showRefreshButton' })) as ShowRefreshButtonResponse;
  }

  /**
   * Close the container and return to the previous screen.
   *
   * @returns Confirmation that the container is closing.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Close the container
   * const response = await container.close();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Container closed successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async close(): Promise<CloseResponse> {
    return (await this.invoke({ method: 'close' })) as CloseResponse;
  }

  /**
   * Notify the Grab SuperApp that the page content has loaded.
   *
   * @returns Confirmation that the content loaded notification was sent.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Notify content loaded
   * const response = await container.onContentLoaded();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Content loaded notification sent successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async onContentLoaded(): Promise<OnContentLoadedResponse> {
    return (await this.invoke({ method: 'onContentLoaded' })) as OnContentLoadedResponse;
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
   * import { ContainerModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Show loader
   * const response = await container.showLoader();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Loader shown successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async showLoader(): Promise<ShowLoaderResponse> {
    return (await this.invoke({ method: 'showLoader' })) as ShowLoaderResponse;
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
   * import { ContainerModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Hide loader
   * const response = await container.hideLoader();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Loader hidden successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async hideLoader(): Promise<HideLoaderResponse> {
    return (await this.invoke({ method: 'hideLoader' })) as HideLoaderResponse;
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
   * import { ContainerModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Open external link
   * const response = await container.openExternalLink('https://grab.com');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('External link opened successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async openExternalLink(request: OpenExternalLinkRequest): Promise<OpenExternalLinkResponse> {
    return (await this.invoke({
      method: 'openExternalLink',
      params: { url: request },
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
   * import { ContainerModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Notify CTA tap
   * const response = await container.onCtaTap('AV_LANDING_PAGE_CONTINUE');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('CTA tap notified successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async onCtaTap(request: OnCtaTapRequest): Promise<OnCtaTapResponse> {
    return (await this.invoke({
      method: 'onCtaTap',
      params: { action: request },
    })) as OnCtaTapResponse;
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
   * @see {@link ContainerAnalyticsEventState}, {@link ContainerAnalyticsEventName}
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import {
   *   ContainerModule,
   *   isSuccess,
   *   isErrorResponse,
   *   ContainerAnalyticsEventState,
   *   ContainerAnalyticsEventName,
   * } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Send analytics event
   * const response = await container.sendAnalyticsEvent({
   *   state: ContainerAnalyticsEventState.HOMEPAGE,
   *   name: ContainerAnalyticsEventName.DEFAULT,
   * });
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Analytics event sent successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
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
    return (await this.invoke({
      method: 'sendAnalyticsEvent',
      params: {
        state: request.state,
        name: request.name,
        data: request.data ? JSON.stringify(request.data) : null,
      },
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
   * import { ContainerModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Check connection status
   * const response = await container.isConnected();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Connected to Grab SuperApp:', response.result.connected);
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
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
   * import { ContainerModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Get session parameters
   * const response = await container.getSessionParams();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   const sessionParams = JSON.parse(response.result?.result || '{}');
   *   console.log('Session params retrieved:', sessionParams);
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async getSessionParams(): Promise<GetSessionParamsResponse> {
    return (await this.invoke({ method: 'getSessionParams' })) as GetSessionParamsResponse;
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
