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

Payment transaction details, including the transaction ID and amount.

#### Returns

`Promise`\<[`TriggerCheckoutResponse`](../type-aliases/TriggerCheckoutResponse.md)\>

The checkout result, containing transaction status (success, failure, or pending) and transaction details.

#### Example

**Simple usage**
```typescript
// Initialize the checkout module
const checkoutModule = new CheckoutModule();

// Trigger checkout with response params
const transactionResponse = await createTransaction(); // Call POST /grabpay/partner/v4/charge/init from Grab API to create a transaction
const response = await checkoutModule.triggerCheckout(transactionResponse);

switch (response.status_code) {
  case 200:
    if (response.result.status === 'success') {
      console.log('Transaction successful:', response.result.transactionID);
    } else if (response.result.status === 'failure') {
      console.log('Transaction failed:', response.result.errorMessage, response.result.errorCode);
    } else if (response.result.status === 'pending') {
      console.log('Transaction pending:', response.result.transactionID);
    } else if (response.result.status === 'userInitiatedCancel') {
      console.log('User cancelled the checkout');
    }
    break;
  case 400:
    console.log('Transaction failed:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```
