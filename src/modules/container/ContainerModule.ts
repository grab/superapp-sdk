/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule, isOk } from '../../core';
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
  RawCloseResponseSchema,
  RawHideBackButtonResponseSchema,
  RawHideLoaderResponseSchema,
  RawHideRefreshButtonResponseSchema,
  RawOpenExternalLinkResponseSchema,
  RawSendAnalyticsEventResponseSchema,
  RawSetBackgroundColorResponseSchema,
  RawSetTitleResponseSchema,
  RawShowBackButtonResponseSchema,
  RawShowLoaderResponseSchema,
  RawShowRefreshButtonResponseSchema,
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
  RawCloseResponse,
  RawHideBackButtonResponse,
  RawHideLoaderResponse,
  RawHideRefreshButtonResponse,
  RawOpenExternalLinkResponse,
  RawSendAnalyticsEventResponse,
  RawSetBackgroundColorResponse,
  RawSetTitleResponse,
  RawShowBackButtonResponse,
  RawShowLoaderResponse,
  RawShowRefreshButtonResponse,
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
 * SDK module for controlling the WebView container via `JSBridge`.
 *
 * @group Modules
 * @category Container
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
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
   * @returns This method can return the following `status_code` values:
   * - `204` (No Content): Background color set successfully.
   * - `400` (Bad Request): Invalid request parameters.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
    const rawResponse = (await this.invoke({
      method: 'setBackgroundColor',
      params: { backgroundColor: request },
    })) as RawSetBackgroundColorResponse;

    const rawResponseError = this.validate(RawSetBackgroundColorResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('setBackgroundColor', `Unexpected raw response shape: ${rawResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: SetBackgroundColorResponse;
    if (isOk(rawResponse)) {
      response = { status_code: 204 };
    } else {
      response = rawResponse as SetBackgroundColorResponse;
    }

    const responseError = this.validate(SetBackgroundColorResponseSchema, response);
    if (responseError)
      this.logger.warn('setBackgroundColor', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Set the title of the container header.
   *
   * @param request - The title text to display in the header.
   *
   * @returns This method can return the following `status_code` values:
   * - `204` (No Content): Title set successfully.
   * - `400` (Bad Request): Invalid request parameters.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
    const rawResponse = (await this.invoke({
      method: 'setTitle',
      params: { title: request },
    })) as RawSetTitleResponse;

    const rawResponseError = this.validate(RawSetTitleResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('setTitle', `Unexpected raw response shape: ${rawResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: SetTitleResponse;
    if (isOk(rawResponse)) {
      response = { status_code: 204 };
    } else {
      response = rawResponse as SetTitleResponse;
    }

    const responseError = this.validate(SetTitleResponseSchema, response);
    if (responseError) this.logger.warn('setTitle', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Hide the back button on the container header.
   *
   * @returns This method can return the following `status_code` values:
   * - `204` (No Content): Back button hidden successfully.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
    const rawResponse = (await this.invoke({
      method: 'hideBackButton',
    })) as RawHideBackButtonResponse;

    const rawResponseError = this.validate(RawHideBackButtonResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('hideBackButton', `Unexpected raw response shape: ${rawResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: HideBackButtonResponse;
    if (isOk(rawResponse)) {
      response = { status_code: 204 };
    } else {
      response = rawResponse as HideBackButtonResponse;
    }

    const responseError = this.validate(HideBackButtonResponseSchema, response);
    if (responseError)
      this.logger.warn('hideBackButton', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Show the back button on the container header.
   *
   * @returns This method can return the following `status_code` values:
   * - `204` (No Content): Back button shown successfully.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
    const rawResponse = (await this.invoke({
      method: 'showBackButton',
    })) as RawShowBackButtonResponse;

    const rawResponseError = this.validate(RawShowBackButtonResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('showBackButton', `Unexpected raw response shape: ${rawResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: ShowBackButtonResponse;
    if (isOk(rawResponse)) {
      response = { status_code: 204 };
    } else {
      response = rawResponse as ShowBackButtonResponse;
    }

    const responseError = this.validate(ShowBackButtonResponseSchema, response);
    if (responseError)
      this.logger.warn('showBackButton', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Hide the refresh button on the container header.
   *
   * @returns This method can return the following `status_code` values:
   * - `204` (No Content): Refresh button hidden successfully.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
    const rawResponse = (await this.invoke({
      method: 'hideRefreshButton',
    })) as RawHideRefreshButtonResponse;

    const rawResponseError = this.validate(RawHideRefreshButtonResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('hideRefreshButton', `Unexpected raw response shape: ${rawResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: HideRefreshButtonResponse;
    if (isOk(rawResponse)) {
      response = { status_code: 204 };
    } else {
      response = rawResponse as HideRefreshButtonResponse;
    }

    const responseError = this.validate(HideRefreshButtonResponseSchema, response);
    if (responseError)
      this.logger.warn('hideRefreshButton', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Show the refresh button on the container header.
   *
   * @returns This method can return the following `status_code` values:
   * - `204` (No Content): Refresh button shown successfully.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
    const rawResponse = (await this.invoke({
      method: 'showRefreshButton',
    })) as RawShowRefreshButtonResponse;

    const rawResponseError = this.validate(RawShowRefreshButtonResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('showRefreshButton', `Unexpected raw response shape: ${rawResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: ShowRefreshButtonResponse;
    if (isOk(rawResponse)) {
      response = { status_code: 204 };
    } else {
      response = rawResponse as ShowRefreshButtonResponse;
    }

    const responseError = this.validate(ShowRefreshButtonResponseSchema, response);
    if (responseError)
      this.logger.warn('showRefreshButton', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Close the container and return to the previous screen.
   *
   * @returns This method can return the following `status_code` values:
   * - `204` (No Content): Container closed successfully.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
    const rawResponse = (await this.invoke({
      method: 'close',
    })) as RawCloseResponse;

    const rawResponseError = this.validate(RawCloseResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('close', `Unexpected raw response shape: ${rawResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: CloseResponse;
    if (isOk(rawResponse)) {
      response = { status_code: 204 };
    } else {
      response = rawResponse as CloseResponse;
    }

    const responseError = this.validate(CloseResponseSchema, response);
    if (responseError) this.logger.warn('close', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Notify the Grab SuperApp that the page content has loaded.
   *
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): Notification sent successfully.
   * - `204` (No Content): Operation completed successfully.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
      this.logger.warn('onContentLoaded', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Show the full-screen loading indicator.
   *
   * @remarks
   * Remember to call {@link ContainerModule.hideLoader} when the operation completes.
   *
   * @returns This method can return the following `status_code` values:
   * - `204` (No Content): Loader shown successfully.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
    const rawResponse = (await this.invoke({
      method: 'showLoader',
    })) as RawShowLoaderResponse;

    const rawResponseError = this.validate(RawShowLoaderResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('showLoader', `Unexpected raw response shape: ${rawResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: ShowLoaderResponse;
    if (isOk(rawResponse)) {
      response = { status_code: 204 };
    } else {
      response = rawResponse as ShowLoaderResponse;
    }

    const responseError = this.validate(ShowLoaderResponseSchema, response);
    if (responseError)
      this.logger.warn('showLoader', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Hide the full-screen loading indicator.
   *
   * @remarks
   * Should be called when the entry point has finished loading.
   *
   * @returns This method can return the following `status_code` values:
   * - `204` (No Content): Loader hidden successfully.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
    const rawResponse = (await this.invoke({
      method: 'hideLoader',
    })) as RawHideLoaderResponse;

    const rawResponseError = this.validate(RawHideLoaderResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('hideLoader', `Unexpected raw response shape: ${rawResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: HideLoaderResponse;
    if (isOk(rawResponse)) {
      response = { status_code: 204 };
    } else {
      response = rawResponse as HideLoaderResponse;
    }

    const responseError = this.validate(HideLoaderResponseSchema, response);
    if (responseError)
      this.logger.warn('hideLoader', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Open a link in the external browser.
   *
   * @remarks
   * Call this method to open the specified URL in an external browser (outside of the Grab app).
   *
   * @param request - The URL to open in the external browser.
   *
   * @returns This method can return the following `status_code` values:
   * - `204` (No Content): External link opened successfully.
   * - `400` (Bad Request): Invalid request parameters.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
    const rawResponse = (await this.invoke({
      method: 'openExternalLink',
      params: { url: request },
    })) as RawOpenExternalLinkResponse;

    const rawResponseError = this.validate(RawOpenExternalLinkResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('openExternalLink', `Unexpected raw response shape: ${rawResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: OpenExternalLinkResponse;
    if (isOk(rawResponse)) {
      response = { status_code: 204 };
    } else {
      response = rawResponse as OpenExternalLinkResponse;
    }

    const responseError = this.validate(OpenExternalLinkResponseSchema, response);
    if (responseError)
      this.logger.warn('openExternalLink', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Notify the client that the user has tapped a call-to-action (CTA).
   *
   * @param request - The action identifier for the CTA that was tapped.
   *
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): CTA tap notification sent successfully.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
    if (responseError) this.logger.warn('onCtaTap', `Unexpected response shape: ${responseError}`);

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
   * @param request - Analytics event details.
   *
   * @see {@link ContainerAnalyticsEventState}, {@link ContainerAnalyticsEventName}
   *
   * @returns This method can return the following `status_code` values:
   * - `204` (No Content): Analytics event sent successfully.
   * - `400` (Bad Request): Invalid request parameters.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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

    const rawResponse = (await this.invoke({
      method: 'sendAnalyticsEvent',
      params: {
        state: request.state,
        name: request.name,
        data: request.data ? JSON.stringify(request.data) : null,
      },
    })) as RawSendAnalyticsEventResponse;

    const rawResponseError = this.validate(RawSendAnalyticsEventResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('sendAnalyticsEvent', `Unexpected raw response shape: ${rawResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: SendAnalyticsEventResponse;
    if (isOk(rawResponse)) {
      response = { status_code: 204 };
    } else {
      response = rawResponse as SendAnalyticsEventResponse;
    }

    const responseError = this.validate(SendAnalyticsEventResponseSchema, response);
    if (responseError)
      this.logger.warn('sendAnalyticsEvent', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Check if the web app is connected to the Grab SuperApp via `JSBridge`.
   *
   * @remarks
   * Call this method to verify the connection status before using other features.
   *
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): Connected to Grab SuperApp. The `result` contains {@link IsConnectedResult}.
   * - `404` (Not Found): Not connected to Grab SuperApp.
   *
   * @example
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
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): Session parameters retrieved successfully.
   * - `204` (No Content): No session parameters were found.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
   *   if (response.status_code === 200) {
   *     const sessionParams = JSON.parse(response.result);
   *     console.log('Session params retrieved:', sessionParams);
   *   } else if (response.status_code === 204) {
   *     console.log('No session parameters found');
   *   }
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
      this.logger.warn('getSessionParams', `Unexpected response shape: ${responseError}`);

    return response;
  }
}
