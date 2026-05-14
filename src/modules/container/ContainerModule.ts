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
  NativeCloseResponseSchema,
  NativeHideBackButtonResponseSchema,
  NativeHideLoaderResponseSchema,
  NativeHideRefreshButtonResponseSchema,
  NativeOpenExternalLinkResponseSchema,
  NativeSendAnalyticsEventResponseSchema,
  NativeSetBackgroundColorResponseSchema,
  NativeSetTitleResponseSchema,
  NativeShowBackButtonResponseSchema,
  NativeShowLoaderResponseSchema,
  NativeShowRefreshButtonResponseSchema,
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
  NativeCloseResponse,
  NativeHideBackButtonResponse,
  NativeHideLoaderResponse,
  NativeHideRefreshButtonResponse,
  NativeOpenExternalLinkResponse,
  NativeSendAnalyticsEventResponse,
  NativeSetBackgroundColorResponse,
  NativeSetTitleResponse,
  NativeShowBackButtonResponse,
  NativeShowLoaderResponse,
  NativeShowRefreshButtonResponse,
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
 * Module for controlling the WebView container via JSBridge.
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
   * @param request - Header background color as a hex string (for example `#ffffff`).
   *
   * @returns A response with one of the following status codes:
   * - `204`: No content - background color set successfully.
   * - `400`: Bad request - invalid background color format.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @example
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Set the header background color
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
    const nativeResponse = (await this.invoke({
      method: 'setBackgroundColor',
      params: { backgroundColor: request },
    })) as NativeSetBackgroundColorResponse;

    const nativeResponseError = this.validate(
      NativeSetBackgroundColorResponseSchema,
      nativeResponse
    );
    if (nativeResponseError)
      this.logger.warn(
        'setBackgroundColor',
        `Unexpected native response shape: ${nativeResponseError}`
      );

    // Transform 200 OK -> 204 No Content
    let response: SetBackgroundColorResponse;
    if (isOk(nativeResponse)) {
      response = { status_code: 204 };
    } else {
      response = nativeResponse as SetBackgroundColorResponse;
    }

    const responseError = this.validate(SetBackgroundColorResponseSchema, response);
    if (responseError)
      this.logger.warn('setBackgroundColor', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Set the title of the container header.
   *
   * @param request - Header title text to display.
   *
   * @returns A response with one of the following status codes:
   * - `204`: No content - title set successfully.
   * - `400`: Bad request - invalid title parameter.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @example
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Set the header title
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
    const nativeResponse = (await this.invoke({
      method: 'setTitle',
      params: { title: request },
    })) as NativeSetTitleResponse;

    const nativeResponseError = this.validate(NativeSetTitleResponseSchema, nativeResponse);
    if (nativeResponseError)
      this.logger.warn('setTitle', `Unexpected native response shape: ${nativeResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: SetTitleResponse;
    if (isOk(nativeResponse)) {
      response = { status_code: 204 };
    } else {
      response = nativeResponse as SetTitleResponse;
    }

    const responseError = this.validate(SetTitleResponseSchema, response);
    if (responseError) this.logger.warn('setTitle', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Hide the back button on the container header.
   *
   * @returns A response with one of the following status codes:
   * - `204`: No content - back button hidden successfully.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
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
    const nativeResponse = (await this.invoke({
      method: 'hideBackButton',
    })) as NativeHideBackButtonResponse;

    const nativeResponseError = this.validate(NativeHideBackButtonResponseSchema, nativeResponse);
    if (nativeResponseError)
      this.logger.warn(
        'hideBackButton',
        `Unexpected native response shape: ${nativeResponseError}`
      );

    // Transform 200 OK -> 204 No Content
    let response: HideBackButtonResponse;
    if (isOk(nativeResponse)) {
      response = { status_code: 204 };
    } else {
      response = nativeResponse as HideBackButtonResponse;
    }

    const responseError = this.validate(HideBackButtonResponseSchema, response);
    if (responseError)
      this.logger.warn('hideBackButton', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Show the back button on the container header.
   *
   * @returns A response with one of the following status codes:
   * - `204`: No content - back button shown successfully.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
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
    const nativeResponse = (await this.invoke({
      method: 'showBackButton',
    })) as NativeShowBackButtonResponse;

    const nativeResponseError = this.validate(NativeShowBackButtonResponseSchema, nativeResponse);
    if (nativeResponseError)
      this.logger.warn(
        'showBackButton',
        `Unexpected native response shape: ${nativeResponseError}`
      );

    // Transform 200 OK -> 204 No Content
    let response: ShowBackButtonResponse;
    if (isOk(nativeResponse)) {
      response = { status_code: 204 };
    } else {
      response = nativeResponse as ShowBackButtonResponse;
    }

    const responseError = this.validate(ShowBackButtonResponseSchema, response);
    if (responseError)
      this.logger.warn('showBackButton', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Hide the refresh button on the container header.
   *
   * @returns A response with one of the following status codes:
   * - `204`: No content - refresh button hidden successfully.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
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
    const nativeResponse = (await this.invoke({
      method: 'hideRefreshButton',
    })) as NativeHideRefreshButtonResponse;

    const nativeResponseError = this.validate(
      NativeHideRefreshButtonResponseSchema,
      nativeResponse
    );
    if (nativeResponseError)
      this.logger.warn(
        'hideRefreshButton',
        `Unexpected native response shape: ${nativeResponseError}`
      );

    // Transform 200 OK -> 204 No Content
    let response: HideRefreshButtonResponse;
    if (isOk(nativeResponse)) {
      response = { status_code: 204 };
    } else {
      response = nativeResponse as HideRefreshButtonResponse;
    }

    const responseError = this.validate(HideRefreshButtonResponseSchema, response);
    if (responseError)
      this.logger.warn('hideRefreshButton', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Show the refresh button on the container header.
   *
   * @returns A response with one of the following status codes:
   * - `204`: No content - refresh button shown successfully.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
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
    const nativeResponse = (await this.invoke({
      method: 'showRefreshButton',
    })) as NativeShowRefreshButtonResponse;

    const nativeResponseError = this.validate(
      NativeShowRefreshButtonResponseSchema,
      nativeResponse
    );
    if (nativeResponseError)
      this.logger.warn(
        'showRefreshButton',
        `Unexpected native response shape: ${nativeResponseError}`
      );

    // Transform 200 OK -> 204 No Content
    let response: ShowRefreshButtonResponse;
    if (isOk(nativeResponse)) {
      response = { status_code: 204 };
    } else {
      response = nativeResponse as ShowRefreshButtonResponse;
    }

    const responseError = this.validate(ShowRefreshButtonResponseSchema, response);
    if (responseError)
      this.logger.warn('showRefreshButton', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Close the container and return to the previous screen.
   *
   * @returns A response with one of the following status codes:
   * - `204`: No content - container closed successfully.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
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
    const nativeResponse = (await this.invoke({
      method: 'close',
    })) as NativeCloseResponse;

    const nativeResponseError = this.validate(NativeCloseResponseSchema, nativeResponse);
    if (nativeResponseError)
      this.logger.warn('close', `Unexpected native response shape: ${nativeResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: CloseResponse;
    if (isOk(nativeResponse)) {
      response = { status_code: 204 };
    } else {
      response = nativeResponse as CloseResponse;
    }

    const responseError = this.validate(CloseResponseSchema, response);
    if (responseError) this.logger.warn('close', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Notify the Grab SuperApp that the page content has loaded.
   *
   * @returns A response with one of the following status codes:
   * - `200`: OK - notification sent successfully. The `result` is {@link OnContentLoadedResult}.
   * - `204`: No content - operation completed successfully.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
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
   * @returns A response with one of the following status codes:
   * - `204`: No content - loader shown successfully.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @remarks
   * Remember to call {@link ContainerModule.hideLoader} when the operation completes.
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
    const nativeResponse = (await this.invoke({
      method: 'showLoader',
    })) as NativeShowLoaderResponse;

    const nativeResponseError = this.validate(NativeShowLoaderResponseSchema, nativeResponse);
    if (nativeResponseError)
      this.logger.warn('showLoader', `Unexpected native response shape: ${nativeResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: ShowLoaderResponse;
    if (isOk(nativeResponse)) {
      response = { status_code: 204 };
    } else {
      response = nativeResponse as ShowLoaderResponse;
    }

    const responseError = this.validate(ShowLoaderResponseSchema, response);
    if (responseError)
      this.logger.warn('showLoader', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Hide the full-screen loading indicator.
   *
   * @returns A response with one of the following status codes:
   * - `204`: No content - loader hidden successfully.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @remarks
   * Should be called when the entry point has finished loading.
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
    const nativeResponse = (await this.invoke({
      method: 'hideLoader',
    })) as NativeHideLoaderResponse;

    const nativeResponseError = this.validate(NativeHideLoaderResponseSchema, nativeResponse);
    if (nativeResponseError)
      this.logger.warn('hideLoader', `Unexpected native response shape: ${nativeResponseError}`);

    // Transform 200 OK -> 204 No Content
    let response: HideLoaderResponse;
    if (isOk(nativeResponse)) {
      response = { status_code: 204 };
    } else {
      response = nativeResponse as HideLoaderResponse;
    }

    const responseError = this.validate(HideLoaderResponseSchema, response);
    if (responseError)
      this.logger.warn('hideLoader', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Open a link in the external browser.
   *
   * @param request - Absolute URL to open in the device external browser.
   *
   * @returns A response with one of the following status codes:
   * - `204`: No content - external link opened successfully.
   * - `400`: Bad request - invalid URL parameter.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @remarks
   * Call this method to open the specified URL in an external browser (outside of the Grab app).
   *
   * @example
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Open a URL in the external browser
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
    const nativeResponse = (await this.invoke({
      method: 'openExternalLink',
      params: { url: request },
    })) as NativeOpenExternalLinkResponse;

    const nativeResponseError = this.validate(NativeOpenExternalLinkResponseSchema, nativeResponse);
    if (nativeResponseError)
      this.logger.warn(
        'openExternalLink',
        `Unexpected native response shape: ${nativeResponseError}`
      );

    // Transform 200 OK -> 204 No Content
    let response: OpenExternalLinkResponse;
    if (isOk(nativeResponse)) {
      response = { status_code: 204 };
    } else {
      response = nativeResponse as OpenExternalLinkResponse;
    }

    const responseError = this.validate(OpenExternalLinkResponseSchema, response);
    if (responseError)
      this.logger.warn('openExternalLink', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Notify the client that the user has tapped a call-to-action (CTA).
   *
   * @param request - CTA action identifier to report (for example `AV_LANDING_PAGE_CONTINUE`).
   *
   * @returns A response with one of the following status codes:
   * - `200`: OK - CTA tap notification sent successfully. The `result` is {@link OnCtaTapResult}.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @example
   * ```typescript
   * import { ContainerModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the container module
   * const container = new ContainerModule();
   *
   * // Notify the Grab app that the user tapped a CTA
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
   * @param request - Analytics event payload.
   * Request fields:
   * - `state`: Analytics event state.
   * - `name`: Analytics event name.
   * - `data` (optional): Additional event metadata.
   *
   * @returns A response with one of the following status codes:
   * - `204`: No content - analytics event sent successfully.
   * - `400`: Bad request - invalid analytics event parameters.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @remarks
   * You can use predefined constants to ensure consistency across the platform.
   *
   * **Predefined Values:**
   * - **States:** {@link ContainerAnalyticsEventState}
   * - **Names:** {@link ContainerAnalyticsEventName}
   *
   * @see {@link ContainerAnalyticsEventState}, {@link ContainerAnalyticsEventName}
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
   * // Send an analytics event
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

    const nativeResponse = (await this.invoke({
      method: 'sendAnalyticsEvent',
      params: {
        state: request.state,
        name: request.name,
        data: request.data ? JSON.stringify(request.data) : null,
      },
    })) as NativeSendAnalyticsEventResponse;

    const nativeResponseError = this.validate(
      NativeSendAnalyticsEventResponseSchema,
      nativeResponse
    );
    if (nativeResponseError)
      this.logger.warn(
        'sendAnalyticsEvent',
        `Unexpected native response shape: ${nativeResponseError}`
      );

    // Transform 200 OK -> 204 No Content
    let response: SendAnalyticsEventResponse;
    if (isOk(nativeResponse)) {
      response = { status_code: 204 };
    } else {
      response = nativeResponse as SendAnalyticsEventResponse;
    }

    const responseError = this.validate(SendAnalyticsEventResponseSchema, response);
    if (responseError)
      this.logger.warn('sendAnalyticsEvent', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Check if the web app is connected to the Grab SuperApp via JSBridge.
   *
   * @returns A response with one of the following status codes:
   * - `200`: OK - connected to Grab SuperApp. The `result` is {@link IsConnectedResult}.
   * - `404`: Not found - not connected to Grab SuperApp.
   *
   * @remarks
   * Call this method to verify the connection status before using other features.
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
   * @returns A response with one of the following status codes:
   * - `200`: OK - session parameters retrieved successfully. The `result` is {@link GetSessionParamsResult}.
   * - `204`: No content - no session parameters available.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @remarks
   * The native layer returns session parameters as a JSON string.
   * Parse with `JSON.parse(result.result)` to use as an object.
   * Session parameters can contain primitives, base64 encoded strings, or nested objects.
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
