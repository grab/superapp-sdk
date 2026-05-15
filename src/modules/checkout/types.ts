/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKOkResponse } from '../../core';

/**
 * Request parameters for triggering the checkout flow.
 *
 * @group Modules
 * @category Checkout
 *
 * @remarks
 * This type is intentionally flexible as the checkout parameters vary depending on the specific payment flow and partner requirements.
 * Consult the Grab SuperApp SDK documentation for the specific parameters required for your use case.
 *
 * @public
 */
export type TriggerCheckoutRequest = Record<string, unknown>;

/**
 * Result object containing the checkout transaction details.
 *
 * @group Modules
 * @category Checkout
 *
 *
 * @public
 */
export type TriggerCheckoutResult =
  | {
      status: 'success';
      transactionID: string;
    }
  | {
      status: 'failure';
      transactionID: string;
      errorMessage: string;
      errorCode: string;
    }
  | {
      status: 'pending';
      transactionID: string;
    }
  | {
      status: 'userInitiatedCancel';
    };

/**
 * Response when triggering the checkout flow.
 *
 * @group Modules
 * @category Checkout
 *
 * @public
 */
export type TriggerCheckoutResponse =
  | SDKOkResponse<TriggerCheckoutResult>
  | SDKErrorResponse<400>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
