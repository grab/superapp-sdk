/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule, hasResult, isSuccess } from '../../core';
import { RawSendResponseSchema, SendRequestSchema, SendResponseSchema } from './schemas';
import { RawSendResponse, SendRequest, SendResponse } from './types';

/**
 * SDK module for making network requests through the native layer via `JSBridge`.
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
export class NetworkModule extends BaseModule {
  constructor() {
    super('NetworkModule');
  }

  /**
   * Sends a network request through `JSBridge`.
   *
   * @param request - Network request parameters.
   *
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): Request completed successfully. The `result` contains {@link SendResult}.
   * - `204` (No Content): Request completed successfully with no response body.
   * - `400` (Bad Request): Invalid request parameters.
   * - `401` (Unauthorized): Authentication required.
   * - `403` (Forbidden): Client is not authorized to make this request.
   * - `404` (Not Found): The requested endpoint was not found.
   * - `424` (Failed Dependency): Underlying native request failed.
   * - `426` (Upgrade Required): Feature requires a newer Grab app version.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
   * ```typescript
   * import { NetworkModule, isSuccess, isError, hasResult } from '@grabjs/superapp-sdk';
   *
   * // Initialize the network module
   * const network = new NetworkModule();
   *
   * // Send a POST request with headers and body
   * const response = await network.send({
   *   endpoint: 'https://api.example.com/users',
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: { name: 'John', email: 'john@example.com' },
   *   timeout: 30
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

    const rawResponse = (await this.invoke({
      method: 'send',
      params: request,
    })) as RawSendResponse;

    const rawResponseError = this.validate(RawSendResponseSchema, rawResponse);
    if (rawResponseError) {
      this.logger.warn('send', `Unexpected raw response shape: ${rawResponseError}`);
    }

    // `JSBridge` may return response bodies as JSON strings
    // Parse string results into objects for consistency.
    // If parsing fails, return a 500 error rather than exposing invalid data.
    if (
      isSuccess(rawResponse) &&
      hasResult(rawResponse) &&
      typeof rawResponse.result === 'string'
    ) {
      try {
        const parsedResult = JSON.parse(rawResponse.result) as Record<string, unknown>;
        const response: SendResponse = {
          ...rawResponse,
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

    const response = rawResponse as SendResponse;

    const responseError = this.validate(SendResponseSchema, response);
    if (responseError) {
      this.logger.warn('send', `Unexpected response shape: ${responseError}`);
    }

    return response;
  }
}
