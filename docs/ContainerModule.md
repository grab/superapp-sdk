# ContainerModule

## Description

Provides APIs to interact with the webview container.

## Methods

### 10. Send analytics event

**Method name**: `sendAnalyticsEvent`

**Arguments**

| Name         | Type   | Required | Description                                    |
| ------------ | ------ | -------- | ---------------------------------------------- |
| state        | String | Yes      | State of the event (see AnalyticsEventState)   |
| name         | String | Yes      | Name of the event (see AnalyticsEventName)     |
| data         | Object | No       | Additional data for the event                  |

**AnalyticsEventState**

- 'HOMEPAGE'
- 'CHECKOUT_PAGE'
- 'BOOKING_COMPLETION'
- 'CUSTOM'

**AnalyticsEventName**

1. For 'HOMEPAGE' state:
   - 'DEFAULT'
   - 'INITIATE'

2. For 'CHECKOUT_PAGE' state:
   - 'DEFAULT'
   - 'BOOK'

3. 'BOOKING_COMPLETION' state:
   - 'DEFAULT'

4. For 'CUSTOM' state: anything

**Event Data Requirements**

1. For 'CHECKOUT_PAGE' state and 'BOOK' event:
   - `transaction_amount` (number, required): The amount of the transaction
   - `transaction_currency` (string, required): The currency of the transaction

2. For 'CUSTOM' state:
   - `page` (string, required): The page identifier

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule, AnalyticsEventState, AnalyticsEventName } from "@grabjs/superapp-sdk";

const containerModule = new ContainerModule();

// Example: Send a booking event
containerModule.sendAnalyticsEvent({
  state: AnalyticsEventState.CHECKOUT_PAGE,
  name: AnalyticsEventName.CHECKOUT_PAGE.BOOK,
  data: {
    transaction_amount: 100,
    transaction_currency: "SGD"
  }
}).then(({ result, error }) => {
  if (error) {
    // Handle validation or other errors
  }
});

// Example: Send a custom event
containerModule.sendAnalyticsEvent({
  state: AnalyticsEventState.CUSTOM,
  name: AnalyticsEventName.CUSTOM.DEFAULT,
  data: {
    page: "CLICK_ITEM",
    departure_time: "2025-06-01 08:00:00",
    arrival_time: "2025-06-01 10:30:00",
    departure_address: "6 Bayfront Ave, Singapore 018974",
    arrival_address: "Petronas Twin Tower, Kuala Lumpur City Centre, 50088 Kuala Lumpur, Malaysia",
  }
}).then(({ result, error }) => {
  if (error) {
    // Handle validation or other errors
  }
});
```
