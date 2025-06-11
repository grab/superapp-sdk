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

| Name | Type   | Required | Description |
| ---- | ------ | -------- | ----------- |
| url  | String | Yes      | URL to open |

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

| Name         | Type   | Required | Description                                             |
| ------------ | ------ | -------- | ------------------------------------------------------- |
| eventDetails | Object | Yes      | Event details containing state, name, and data         |

**EventDetails Object Properties**

| Property | Type   | Required | Description                                                       |
| -------- | ------ | -------- | ----------------------------------------------------------------- |
| state    | String | Yes      | State of the event (cf. Predefined AnalyticsEventState)           |
| name     | String | Yes      | Name of the event (cf. Predefined AnalyticsEventName)             |
| data     | Object | No       | Additional data for the event (cf. Predefined AnalyticsEventData) |

**Predefined AnalyticsEventState**

- 'HOMEPAGE'
- 'CHECKOUT_PAGE'
- 'BOOKING_COMPLETION'
- 'CUSTOM'

**Predefined AnalyticsEventName**

- 'DEFAULT'

**Predefined AnalyticsEventData**

- 'TRANSACTION_AMOUNT': 'transaction_amount'
- 'TRANSACTION_CURRENCY': 'transaction_currency'
- 'PAGE': 'page'

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule, AnalyticsEventState, AnalyticsEventName, AnalyticsEventData } from "@grabjs/superapp-sdk";

const containerModule = new ContainerModule();

// Example: Send a DEFAULT event for HOMEPAGE state
containerModule.sendAnalyticsEvent({
  state: AnalyticsEventState.HOMEPAGE,
  name: AnalyticsEventName.DEFAULT,
}).then(({ result, error }) => {
  if (error) {
    // Handle validation or other errors
  }
});

// Example: Send a BOOK event for CHECKOUT_PAGE state
containerModule.sendAnalyticsEvent({
  state: AnalyticsEventState.CHECKOUT_PAGE,
  name: 'BOOK',
  data: {
    [AnalyticsEventData.TRANSACTION_AMOUNT]: 100,
    [AnalyticsEventData.TRANSACTION_CURRENCY]: "SGD"
  }
}).then(({ result, error }) => {
  if (error) {
    // Handle validation or other errors
  }
});

// Example: Send a CLICK_RIDE event for CUSTOM state
containerModule.sendAnalyticsEvent({
  state: AnalyticsEventState.CUSTOM,
  name: 'CLICK_RIDE',
  data: {
    [AnalyticsEventData.PAGE]: "LIST_RIDES",
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

