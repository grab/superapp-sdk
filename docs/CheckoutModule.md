# CheckoutModule

## Description

Provides APIs to trigger native checkout flow from web.

## Methods

### Trigger Checkout

**Method name**: `triggerCheckout`

**Arguments**

| Name           | Type   | Description                                                                |
| -------------- | ------ | -------------------------------------------------------------------------- |
| responseParams | String | The response params that partners get when charge init endpoint is called  |

**Return type**

| Name          | Type   | Description                                           |
| ------------- | ------ | ----------------------------------------------------- |
| transactionID | String | Unique identifier for the transaction at Grab side    |
| status        | String | Status of the transaction                             |
| errorReason   | String | The reason why the transaction failed                 |
| errorCode     | String | Error code associated with the failed transaction     |

**Code example**

```javascript
import { CheckoutModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const checkoutModule = new checkoutModule();

// Get responseParams from chargeInit endpoint
const responseParams = chargeInit() // This is a dummy function

checkoutModule
  .triggerCheckout(responseParams)
  .then(({ result, error }) => {
    if (result) {
      // There is a valid result.
    } else if (error) {
      // Some error happened.
    }
  });
```
