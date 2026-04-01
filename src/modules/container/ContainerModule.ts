/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { isRunningInGrabApp } from '../../utils/platform';
import {
  CloseResponseSchema,
  GetSessionParamsResponseSchema,
  HideBackButtonResponseSchema,
  HideLoaderResponseSchema,
  HideRefreshButtonResponseSchema,
  OnContentLoadedResponseSchema,
  OnCtaTapResponseSchema,
  OpenExternalLinkResponseSchema,
  SendAnalyticsEventRequestSchema,
  SendAnalyticsEventResponseSchema,
  SetBackgroundColorResponseSchema,
  SetTitleResponseSchema,
  ShowBackButtonResponseSchema,
  ShowLoaderResponseSchema,
  ShowRefreshButtonResponseSchema,
} from './schemas';
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
   * @param request - The background color to set (hex format, e.g., '#ffffff'). See {@link SetBackgroundColorRequest}.
   *
   * @returns Confirmation that the background color was set. See {@link SetBackgroundColorResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
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
    const response = (await this.invoke({
      method: 'setBackgroundColor',
      params: { backgroundColor: request },
    })) as SetBackgroundColorResponse;

    const responseError = this.validate(SetBackgroundColorResponseSchema, response);
    if (responseError)
      console.warn(`[SDK:setBackgroundColor] Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Set the title of the container header.
   *
   * @param request - The title text to display in the header. See {@link SetTitleRequest}.
   *
   * @returns Confirmation that the title was set. See {@link SetTitleResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async setTitle(request: SetTitleRequest): Promise<SetTitleResponse> {
    const response = (await this.invoke({
      method: 'setTitle',
      params: { title: request },
    })) as SetTitleResponse;

    const responseError = this.validate(SetTitleResponseSchema, response);
    if (responseError) console.warn(`[SDK:setTitle] Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Hide the back button on the container header.
   *
   * @returns Confirmation that the back button is now hidden. See {@link HideBackButtonResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async hideBackButton(): Promise<HideBackButtonResponse> {
    const response = (await this.invoke({
      method: 'hideBackButton',
    })) as HideBackButtonResponse;

    const responseError = this.validate(HideBackButtonResponseSchema, response);
    if (responseError)
      console.warn(`[SDK:hideBackButton] Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Show the back button on the container header.
   *
   * @returns Confirmation that the back button is now visible. See {@link ShowBackButtonResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async showBackButton(): Promise<ShowBackButtonResponse> {
    const response = (await this.invoke({
      method: 'showBackButton',
    })) as ShowBackButtonResponse;

    const responseError = this.validate(ShowBackButtonResponseSchema, response);
    if (responseError)
      console.warn(`[SDK:showBackButton] Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Hide the refresh button on the container header.
   *
   * @returns Confirmation that the refresh button is now hidden. See {@link HideRefreshButtonResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async hideRefreshButton(): Promise<HideRefreshButtonResponse> {
    const response = (await this.invoke({
      method: 'hideRefreshButton',
    })) as HideRefreshButtonResponse;

    const responseError = this.validate(HideRefreshButtonResponseSchema, response);
    if (responseError)
      console.warn(`[SDK:hideRefreshButton] Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Show the refresh button on the container header.
   *
   * @returns Confirmation that the refresh button is now visible. See {@link ShowRefreshButtonResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async showRefreshButton(): Promise<ShowRefreshButtonResponse> {
    const response = (await this.invoke({
      method: 'showRefreshButton',
    })) as ShowRefreshButtonResponse;

    const responseError = this.validate(ShowRefreshButtonResponseSchema, response);
    if (responseError)
      console.warn(`[SDK:showRefreshButton] Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Close the container and return to the previous screen.
   *
   * @returns Confirmation that the container is closing. See {@link CloseResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async close(): Promise<CloseResponse> {
    const response = (await this.invoke({
      method: 'close',
    })) as CloseResponse;

    const responseError = this.validate(CloseResponseSchema, response);
    if (responseError) console.warn(`[SDK:close] Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Notify the Grab SuperApp that the page content has loaded.
   *
   * @returns Confirmation that the content loaded notification was sent. See {@link OnContentLoadedResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async onContentLoaded(): Promise<OnContentLoadedResponse> {
    const response = (await this.invoke({
      method: 'onContentLoaded',
    })) as OnContentLoadedResponse;

    const responseError = this.validate(OnContentLoadedResponseSchema, response);
    if (responseError)
      console.warn(`[SDK:onContentLoaded] Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Show the full-screen loading indicator.
   *
   * @remarks
   * Remember to call {@link ContainerModule.hideLoader} when the operation completes.
   *
   * @returns Confirmation that the loader is now visible. See {@link ShowLoaderResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async showLoader(): Promise<ShowLoaderResponse> {
    const response = (await this.invoke({
      method: 'showLoader',
    })) as ShowLoaderResponse;

    const responseError = this.validate(ShowLoaderResponseSchema, response);
    if (responseError) console.warn(`[SDK:showLoader] Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Hide the full-screen loading indicator.
   *
   * @remarks
   * Should be called when the entry point has finished loading.
   *
   * @returns Confirmation that the loader is now hidden. See {@link HideLoaderResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async hideLoader(): Promise<HideLoaderResponse> {
    const response = (await this.invoke({
      method: 'hideLoader',
    })) as HideLoaderResponse;

    const responseError = this.validate(HideLoaderResponseSchema, response);
    if (responseError) console.warn(`[SDK:hideLoader] Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Open a link in the external browser.
   *
   * @remarks
   * Call this method to open the specified URL in an external browser (outside of the Grab app).
   *
   * @param request - The URL to open in the external browser. See {@link OpenExternalLinkRequest}.
   *
   * @returns Confirmation of whether the external link was opened successfully. See {@link OpenExternalLinkResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async openExternalLink(request: OpenExternalLinkRequest): Promise<OpenExternalLinkResponse> {
    const response = (await this.invoke({
      method: 'openExternalLink',
      params: { url: request },
    })) as OpenExternalLinkResponse;

    const responseError = this.validate(OpenExternalLinkResponseSchema, response);
    if (responseError)
      console.warn(`[SDK:openExternalLink] Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Notify the client that the user has tapped a call-to-action (CTA).
   *
   * @param request - The action identifier for the CTA that was tapped. See {@link OnCtaTapRequest}.
   *
   * @returns Confirmation that the CTA tap was notified. See {@link OnCtaTapResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async onCtaTap(request: OnCtaTapRequest): Promise<OnCtaTapResponse> {
    const response = (await this.invoke({
      method: 'onCtaTap',
      params: { action: request },
    })) as OnCtaTapResponse;

    const responseError = this.validate(OnCtaTapResponseSchema, response);
    if (responseError) console.warn(`[SDK:onCtaTap] Unexpected response shape: ${responseError}`);

    return response;
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
   * @param request - Analytics event details including state, name, and optional data. See {@link SendAnalyticsEventRequest}.
   *
   * @returns Confirmation of whether the analytics event was sent successfully. See {@link SendAnalyticsEventResponse}.
   *
   * @see {@link ContainerAnalyticsEventState}, {@link ContainerAnalyticsEventName}
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import {
   *   ContainerModule,
   *   isSuccess,
   *   isError,
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
   * } else if (isError(response)) {
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
    const requestError = this.validate(SendAnalyticsEventRequestSchema, request);
    if (requestError) return { status_code: 400, error: requestError };

    const response = (await this.invoke({
      method: 'sendAnalyticsEvent',
      params: {
        state: request.state,
        name: request.name,
        data: request.data ? JSON.stringify(request.data) : null,
      },
    })) as SendAnalyticsEventResponse;

    const responseError = this.validate(SendAnalyticsEventResponseSchema, response);
    if (responseError)
      console.warn(`[SDK:sendAnalyticsEvent] Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Check if the web app is connected to the Grab SuperApp via JSBridge.
   *
   * @remarks
   * Call this method to verify the connection status before using other features.
   *
   * @returns The connection status, indicating whether the MiniApp is running inside the Grab SuperApp. See {@link IsConnectedResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
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
   * @returns The session parameters as a JSON string that can be parsed into an object. See {@link GetSessionParamsResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async getSessionParams(): Promise<GetSessionParamsResponse> {
    const response = (await this.invoke({
      method: 'getSessionParams',
    })) as GetSessionParamsResponse;

    const responseError = this.validate(GetSessionParamsResponseSchema, response);
    if (responseError)
      console.warn(`[SDK:getSessionParams] Unexpected response shape: ${responseError}`);

    return response;
  }
}
