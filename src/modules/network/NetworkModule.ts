/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { _BaseModule, hasResult, isSuccess } from '../../core';
import { NativeSendResponseSchema, SendRequestSchema, SendResponseSchema } from './schemas';
import { NativeSendResponse, SendRequest, SendResponse } from './types';

/**
 * Module for making network requests via JSBridge.
 *
 * @group Modules
 * @category Network
 *
 * @remarks
 * Provides access to native network functionality for making HTTP requests.
 * This module is **only** for MiniApps hosted on the Grab domain to call authenticated Grab API endpoints.
 * It should **not** be used by external MiniApps (not on Grab domain) or for non-authenticated Grab APIs.
 * This code must run on the Grab SuperApp's WebView to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { NetworkModule } from '@grabjs/superapp-sdk';
 * const networkModule = new NetworkModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
 * <script>
 *   const networkModule = new SuperAppSDK.NetworkModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class NetworkModule extends _BaseModule {
  constructor() {
    super('NetworkModule');
  }

  /**
   * Sends a network request via JSBridge.
   *
   * @param request - Network request configuration.
   * Request fields:
   * - `endpoint`: Absolute URL of the API endpoint to call.
   * - `method`: HTTP method (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS`).
   * - `headers` (optional): HTTP headers sent with the request.
   * - `query` (optional): Query parameters appended to `endpoint`.
   * - `body` (optional): Request payload for methods that accept a body.
   * - `timeout` (optional): Request timeout in seconds.
   *
   * @returns A response with one of the following status codes:
   * The `status_code` mirrors upstream HTTP statuses when available.
   * - `200`: OK - request succeeded with body. The `result` is {@link SendResult}.
   * - `204`: No content - request succeeded with no response body.
   * - `400`: Bad request - invalid request payload from the SDK caller, or upstream bad request.
   * - `401`: Unauthorized - upstream requires authentication or rejects existing credentials.
   * - `403`: Forbidden - upstream/client is not authorized to perform this request.
   * - `404`: Not found - upstream endpoint or resource was not found.
   * - `424`: Failed dependency - upstream dependency error prevented request completion.
   * - `426`: Upgrade required - upstream/client requires a newer app or protocol version.
   * - `500`: Internal server error - internal SDK/native error (for example JSON parse failure), or upstream server error.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @example
   * ```typescript
   * import { NetworkModule, isSuccess, isError, hasResult } from '@grabjs/superapp-sdk';
   *
   * // Initialize the network module
   * const network = new NetworkModule();
   *
   * // Send an HTTP request through JSBridge
   * const response = await network.send({
   *   endpoint: 'https://api.example.com/users',
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: { name: 'John', email: 'john@example.com' },
   *   timeout: 30,
   * });
   *
   * // Handle the response
   * if (isSuccess(response) && hasResult(response)) {
   *   console.log('Success:', response.result);
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async send(request: SendRequest): Promise<SendResponse> {
    const requestError = this.validate(SendRequestSchema, request);
    if (requestError) return { status_code: 400, error: requestError };

    const nativeResponse = (await this.invoke({
      method: 'send',
      params: request,
    })) as NativeSendResponse;

    const nativeResponseError = this.validate(NativeSendResponseSchema, nativeResponse);
    if (nativeResponseError) {
      this.logger.warn('send', `Unexpected native response shape: ${nativeResponseError}`);
    }

    // JSBridge may return response bodies as JSON strings
    // Parse string results into objects for consistency.
    // If parsing fails, return a 500 error rather than exposing invalid data.
    if (
      isSuccess(nativeResponse) &&
      hasResult(nativeResponse) &&
      typeof nativeResponse.result === 'string'
    ) {
      try {
        const parsedResult = JSON.parse(nativeResponse.result) as Record<string, unknown>;
        const response: SendResponse = {
          ...nativeResponse,
          result: parsedResult,
        };

        const responseError = this.validate(SendResponseSchema, response);
        if (responseError) {
          this.logger.warn('send', `Unexpected response shape after parsing: ${responseError}`);
        }

        return response;
      } catch {
        return {
          status_code: 500,
          error: 'Failed to parse response result as JSON',
        };
      }
    }

    const response = nativeResponse as SendResponse;

    const responseError = this.validate(SendResponseSchema, response);
    if (responseError) {
      this.logger.warn('send', `Unexpected response shape: ${responseError}`);
    }

    return response;
  }
}
