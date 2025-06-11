# ContainerModule

## Description

Provides APIs to interact with the webview container.

## Methods

### 1. Set background color

**Method name**: `setBackgroundColor`

**Arguments**

| Name            | Type   | Required | Description             |
| --------------- | ------ | -------- | ----------------------- |
| backgroundColor | String | Yes      | Hexadecimal color value |

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.setBackgroundColor("#ffffff").then(({ result, error }) => {
  if (error) {
    // Some error happened.
  }
});
```

### 2. Set title

**Method name**: `setTitle`

**Arguments**

| Name  | Type   | Required | Description       |
| ----- | ------ | -------- | ----------------- |
| title | String | Yes      | Title of the page |

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.setTitle("Home").then(({ result, error }) => {
  if (error) {
    // Some error happened.
  }
});
```

### 3. Hide back button

**Method name**: `hideBackButton`

**Arguments**

`None`

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.hideBackButton().then(({ result, error }) => {
  if (error) {
    // Some error happened.
  }
});
```

### 4. Show back button

**Method name**: `showBackButton`

**Arguments**

`None`

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.showBackButton().then(({ result, error }) => {
  if (error) {
    // Some error happened.
  }
});
```

### 5. Hide refresh button

**Method name**: `hideRefreshButton`

**Arguments**

`None`

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.hideRefreshButton().then(({ result, error }) => {
  if (result) {
    // There is a valid result.
  } else if (error) {
    // Some error happened.
  }
});
```

### 6. Show refresh button

**Method name**: `showRefreshButton`

**Arguments**

`None`

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.showRefreshButton().then(({ result, error }) => {
  if (result) {
    // There is a valid result.
  } else if (error) {
    // Some error happened.
  }
});
```

### 7. Close

**Method name**: `close`

**Arguments**

`None`

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.close().then(({ result, error }) => {
  if (result) {
    // There is a valid result.
  } else if (error) {
    // Some error happened.
  }
});
```

### 8. On content loaded

**Method name**: `onContentLoaded`
Call this method to notify the client that page content loaded

**Arguments**

`None`

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.onContentLoaded().then(({ result, error }) => {
  if (result) {
    // There is a valid result.
  } else if (error) {
    // Some error happened.
  }
});
```

### 9. Open link in external browser

**Method name**: `openExternalLink`
Call this method to tell client to open the link in external browser

**Arguments**

| Name  | Type   | Required | Description       |
| ----- | ------ | -------- | ----------------- |
| url   | String | Yes      | URL to open       |

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.openExternalLink("https://grab.com").then(({ result, error }) => {
  if (result) {
    // There is a valid result.
  } else if (error) {
    // Some error happened.
  }
});
```

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

3. For 'BOOKING_COMPLETION' state:
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
