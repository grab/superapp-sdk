[@grabjs/superapp-sdk](../README.md) / CheckoutModule

# Class: CheckoutModule

Provides APIs to trigger native checkout flow from web.

## Remarks

The CheckoutModule enables miniapps to initiate payment transactions through the Grab app's
native checkout interface. All payment processing and user interactions are handled by the
native platform.

## Example

Initialize the CheckoutModule:
```typescript
import { CheckoutModule } from '@grabjs/superapp-sdk';

const checkoutModule = new CheckoutModule();
```

## Extends

- `BaseModule`

## Constructors

### Constructor

> **new CheckoutModule**(): `CheckoutModule`

#### Returns

`CheckoutModule`

#### Overrides

`BaseModule.constructor`

## Methods

### triggerCheckout()

> **triggerCheckout**(`request`: [`TriggerCheckoutRequest`](../type-aliases/TriggerCheckoutRequest.md)): `Promise`\<[`TriggerCheckoutResponse`](../type-aliases/TriggerCheckoutResponse.md)\>

Trigger the native checkout flow.

#### Parameters

##### request

[`TriggerCheckoutRequest`](../type-aliases/TriggerCheckoutRequest.md)

Request parameters for triggering checkout.

#### Returns

`Promise`\<[`TriggerCheckoutResponse`](../type-aliases/TriggerCheckoutResponse.md)\>

Promise that resolves to [TriggerCheckoutResponse](../type-aliases/TriggerCheckoutResponse.md) with transaction details.

#### Remarks

This method initiates the native payment checkout flow within the Grab app.
The `responseParams` should be obtained from your charge initialization endpoint.

**Result Object:**
- `transactionID`: Unique identifier for the transaction at Grab side
- `status`: Status of the transaction
- `errorReason`: The reason why the transaction failed (if applicable)
- `errorCode`: Error code associated with the failed transaction (if applicable)

#### Examples

Basic usage:
```typescript
try {
  const responseParams = await chargeInit();
  const response = await checkoutModule.triggerCheckout({ responseParams });
  if (response.status_code === 200) {
    console.log('Transaction ID:', response.result.transactionID);
  }
} catch (error) {
  console.error(error);
}
```

Handling the response:
```typescript
try {
  const responseParams = await chargeInit();
  const response = await checkoutModule.triggerCheckout({ responseParams });

  switch (response.status_code) {
    case 200:
      console.log('Transaction ID:', response.result.transactionID);
      console.log('Status:', response.result.status);
      if (response.result.errorCode) {
        console.error('Error Code:', response.result.errorCode);
        console.error('Error Reason:', response.result.errorReason);
      }
      break;
    case 400:
      console.error('Invalid request:', response.error);
      break;
    case 403:
      console.error('Permission denied:', response.error);
      break;
    case 500:
      console.error('Checkout error:', response.error);
      break;
  }
} catch (error) {
  console.error(error);
}
```
