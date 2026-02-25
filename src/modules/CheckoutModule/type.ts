import { WrappedResponse } from '../../core/types';

export type TriggerCheckoutRequest = {
  responseParams: string;
};

export type TriggerCheckoutResult = {
  transactionID: string;
  status: string;
  errorReason: string;
  errorCode: string;
};

export type TriggerCheckoutResponse = WrappedResponse<TriggerCheckoutResult>;
