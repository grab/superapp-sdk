# CheckoutModule

## API Reference

SDK module for triggering native payment flows via `JSBridge`.

- `triggerCheckout(request: TriggerCheckoutRequest): Promise<TriggerCheckoutResponse>` — Triggers the native checkout flow for payment processing. (**OAuth Scope:** mobile.checkout)

This method can return the following `status_code` values:
- `200` (OK): Checkout completed successfully. The `result` contains TriggerCheckoutResult.
- `400` (Bad Request): Invalid request parameters.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { CheckoutModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the checkout module
const checkout = new CheckoutModule();

// Trigger checkout with response params
const transactionResponse = await createTransaction(); // Call POST /grabpay/partner/v4/charge/init from Grab API to create a transaction
const response = await checkout.triggerCheckout(transactionResponse);

// Handle the response
if (isSuccess(response)) {
  console.log('Transaction ID:', response.result.transactionID);
  switch (response.result.status) {
    case 'Success':
      console.log('Transaction successful');
      break;
    case 'Failure':
      console.log('Transaction failed:', response.result.errorMessage, response.result.errorCode);
      break;
    case 'Pending':
      console.log('Transaction pending');
      break;
    case 'Cancel':
      console.log('User cancelled the checkout');
      break;
  }
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```
