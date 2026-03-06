[@grabjs/superapp-sdk](../README.md) / CheckoutModule

# Class: CheckoutModule

JSBridge module for triggering native payment flows.

## Remarks

Invokes the native Grab checkout/pay component to process payments.
This code must run on the Grab SuperApp's webview to function correctly.

## Examples

**ES Module:**
```typescript
import { CheckoutModule } from '@grabjs/superapp-sdk';
const checkoutModule = new CheckoutModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const checkoutModule = new SuperAppSDK.CheckoutModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new CheckoutModule**(): `CheckoutModule`

#### Returns

`CheckoutModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### triggerCheckout()

> **triggerCheckout**(`request`: [`TriggerCheckoutRequest`](../type-aliases/TriggerCheckoutRequest.md)): `Promise`\<[`TriggerCheckoutResponse`](../type-aliases/TriggerCheckoutResponse.md)\>

Triggers the native checkout flow for payment processing.

#### Parameters

##### request

[`TriggerCheckoutRequest`](../type-aliases/TriggerCheckoutRequest.md)

The checkout configuration.

#### Returns

`Promise`\<[`TriggerCheckoutResponse`](../type-aliases/TriggerCheckoutResponse.md)\>

A promise that resolves to a response with one of the following possible status codes:
- `200`: Checkout completed
- `400`: Bad request

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { CheckoutModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { CheckoutModule, isResponseOk, isResponseError } = window.SuperAppSDK;

// Initialize the checkout module
const checkoutModule = new CheckoutModule();

// Trigger checkout with response params
try {
  const transactionResponse = await createTransaction(); // Call POST /grabpay/partner/v4/charge/init from Grab API to create a transaction
  const response = await checkoutModule.triggerCheckout(transactionResponse);

  if (isResponseError(response)) {
    console.log('Transaction failed:', response.status_code, response.error);
  } else {
    if (isResponseOk(response)) {
      if (response.result.status === 'success') {
        console.log('Transaction successful:', response.result.transactionID);
      } else if (response.result.status === 'failure') {
        console.log('Transaction failed:', response.result.errorMessage, response.result.errorCode);
      } else if (response.result.status === 'pending') {
        console.log('Transaction pending:', response.result.transactionID);
      } else if (response.result.status === 'userInitiatedCancel') {
        console.log('User cancelled the checkout');
      }
    }
  }
} catch (error) {
  console.log('Could not trigger checkout:', error);
}
```
