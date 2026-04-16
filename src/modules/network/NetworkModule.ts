/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule, hasResult } from '../../core';
import { SendRequestSchema, SendResponseSchema } from './schemas';
import { SendRequest, SendResponse } from './types';

/**
 * JSBridge module for making network requests via the native bridge.
 *
 * @group Modules
 *
 * @remarks
 * Provides access to native network functionality for making HTTP requests.
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
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
   * Sends a network request via the native bridge.
   *
   * @param request - The network request parameters including endpoint, method, headers, query, body, and timeout. See {@link SendRequest}.
   *
   * @returns The network response containing the result data or error information. See {@link SendResponse}.
   *
   * @example
   * **Simple GET request**
   * ```typescript
   * import { NetworkModule, isSuccess, isError, hasResult } from '@grabjs/superapp-sdk';
   *
   * // Initialize the network module
   * const network = new NetworkModule();
   *
   * // Send a GET request
   * const response = await network.send({
   *   endpoint: 'https://api.example.com/users',
   *   method: 'GET'
   * });
   *
   * // Handle the response
   * if (isSuccess(response) && hasResult(response)) {
   *   console.log('Response data:', response.result);
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @example
   * **POST request with body and headers**
   * ```typescript
   * import { NetworkModule, isSuccess, isError, hasResult } from '@grabjs/superapp-sdk';
   *
   * const network = new NetworkModule();
   *
   * const response = await network.send({
   *   endpoint: 'https://api.example.com/users',
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: { name: 'John', email: 'john@example.com' },
   *   timeout: 30
   * });
   *
   * if (isSuccess(response) && hasResult(response)) {
   *   console.log('User created:', response.result);
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * }
   * ```
   *
   * @example
   * **Handling specific status codes**
   * ```typescript
   * import { NetworkModule, isClientError, isServerError, isSuccess, hasResult } from '@grabjs/superapp-sdk';
   *
   * const network = new NetworkModule();
   * const response = await network.send({
   *   endpoint: 'https://api.example.com/users/123',
   *   method: 'GET'
   * });
   *
   * if (isSuccess(response) && hasResult(response)) {
   *   console.log('Success:', response.result);
   * } else if (isClientError(response)) {
   *   // Handle 4xx errors (bad request, unauthorized, not found, etc.)
   *   console.error(`Client error ${response.status_code}: ${response.error}`);
   * } else if (isServerError(response)) {
   *   // Handle 5xx errors (internal server error, service unavailable, etc.)
   *   console.error(`Server error ${response.status_code}: ${response.error}`);
   * }
   * ```
   *
   * @public
   */
  async send(request: SendRequest): Promise<SendResponse> {
    const requestError = this.validate(SendRequestSchema, request);
    if (requestError) return { status_code: 400, error: requestError };

    const response = (await this.invoke({
      method: 'send',
      params: request,
    })) as SendResponse;

    // The native bridge may return response bodies as JSON strings
    // Parse string results into objects for consistency.
    // If parsing fails, return a 500 error rather than exposing invalid data.
    if (hasResult(response) && typeof response.result === 'string') {
      try {
        const parsedResult = JSON.parse(response.result) as Record<string, unknown>;
        return {
          ...response,
          result: parsedResult,
        };
      } catch {
        return {
          status_code: 500,
          error: 'Failed to parse response result as JSON',
        };
      }
    }

    const responseError = this.validate(SendResponseSchema, response);
    if (responseError) {
      this.logger.warn('send', `Unexpected response shape: ${responseError}`);
    }

    return response;
  }
}
