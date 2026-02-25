import { WrappedResponse } from '../../core/types';

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
 * Response from the triggerCheckout method
 */
export type TriggerCheckoutResponse = WrappedResponse<TriggerCheckoutResult>;
