[@grabjs/superapp-sdk](../README.md) / CheckoutModule

# Class: CheckoutModule

The CheckoutModule provides APIs to trigger native checkout flow from web.

## Example

```javascript
import { CheckoutModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only once and reuse across app.
const checkoutModule = new CheckoutModule();
```

## Extends

- `ModuleBase`

## Constructors

### Constructor

> **new CheckoutModule**(): `CheckoutModule`

#### Returns

`CheckoutModule`

#### Overrides

`ModuleBase.constructor`

## Methods

### triggerCheckout()

> **triggerCheckout**(`request`: [`TriggerCheckoutRequest`](../type-aliases/TriggerCheckoutRequest.md)): `Promise`\<[`TriggerCheckoutResponse`](../type-aliases/TriggerCheckoutResponse.md)\>

Trigger the native checkout flow.

#### Parameters

##### request

[`TriggerCheckoutRequest`](../type-aliases/TriggerCheckoutRequest.md)

Checkout request parameters.
  - `responseParams`: The response params from the charge init endpoint

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

#### Example

```javascript
// Get responseParams from chargeInit endpoint
const responseParams = await chargeInit(); // Replace with your actual endpoint

checkoutModule
  .triggerCheckout({ responseParams })
  .then(({ result, error, status_code }) => {
    if (result) {
      console.log("Transaction ID:", result.transactionID);
      console.log("Status:", result.status);

      if (result.errorCode) {
        console.error("Error Code:", result.errorCode);
        console.error("Error Reason:", result.errorReason);
      }
    } else if (error) {
      console.error("Checkout error:", error);
    }
  });
```
