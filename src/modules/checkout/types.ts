/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ErrorResponse, SuccessResponse } from '../../core';

/**
 * Request parameters for triggering checkout
 */
export type TriggerCheckoutRequest = {
  /** The response params that partners get when charge init endpoint is called */
  responseParams: string;
};

/**
 * Result of the checkout transaction
 */
export type TriggerCheckoutResult = {
  /** Unique identifier for the transaction at Grab side */
  transactionID: string;
  /** Status of the transaction */
  status: string;
  /** The reason why the transaction failed */
  errorReason: string;
  /** Error code associated with the failed transaction */
  errorCode: string;
};

/**
 * Success response when checkout is triggered successfully
 */
export type TriggerCheckoutSuccessResponse = SuccessResponse<TriggerCheckoutResult>;

/**
 * Error response when checkout fails
 */
export type TriggerCheckoutErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid request parameters
   * - `403`: Forbidden (permission denied)
   * - `500`: Internal error during checkout
   */
  status_code: 400 | 403 | 500;
};

/**
 * Response from the triggerCheckout method
 */
export type TriggerCheckoutResponse = TriggerCheckoutSuccessResponse | TriggerCheckoutErrorResponse;

/**
 * Concrete interface for the native Checkout module bridge.
 */
export interface WrappedCheckoutModule {
  invoke(
    method: 'triggerCheckout',
    params: TriggerCheckoutRequest
  ): Promise<TriggerCheckoutResponse>;
}

declare global {
  interface Window {
    WrappedCheckoutModule: WrappedCheckoutModule;
  }
}
