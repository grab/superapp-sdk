[@grabjs/superapp-sdk](../README.md) / CheckoutModule

# Class: CheckoutModule

JSBridge module for triggering native payment flows.

## Remarks

Invokes the native Grab checkout/pay component to process payments.
Requires the MiniApp to be running within the Grab SuperApp's webview.

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

The response from Grab payment charge init endpoint.

#### Returns

`Promise`\<[`TriggerCheckoutResponse`](../type-aliases/TriggerCheckoutResponse.md)\>

Resolves with the transaction details on success, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Trigger checkout with response params
```typescript
const chargeInitResponse = await chargeInit(); // Get from Grab payment charge init endpoint
const response = await checkoutModule.triggerCheckout(chargeInitResponse);
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await checkoutModule.triggerCheckout({ responseParams });
  switch (status_code) {
    case 200:
      console.log('Transaction successful:', result.transactionID, result.status);
      break;
    default:
      console.log(`Transaction failed${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not trigger checkout${error ? `: ${error}` : ''}`);
}
```
