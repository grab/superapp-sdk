# ContainerModule

## Description

Provides APIs to interract with the webview container.

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
  if (result) {
    // There is a valid result.
  } else if (error) {
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
  if (result) {
    // There is a valid result.
  } else if (error) {
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
  if (result) {
    // There is a valid result.
  } else if (error) {
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
  if (result) {
    // There is a valid result.
  } else if (error) {
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

### 8. Send analytics event

**Method name**: `sendAnalyticsEvent`

**Arguments**

An object, containing the following properties:

| Name        | Type   | Required | Description                                                    |
| ----------- | ------ | -------- | -------------------------------------------------------------- |
| `sessionId` | String | No       | A unique identifier for the user's session                     |
| `viewName`  | String | No       | The name of the page or screen displayed when the event occurs |
| `eventName` | String | Yes      | Name of the event                                              |
| `eventData` | Any    | Yes      | An object containing the event data                            |

**Events**

The following events are allowed, each with their specific requirements:

- `STARTED`

  - **Description**: Triggered when the MiniApp is initialized.
  - **Requirements**:
    - `eventData` must be empty

- `PAYMENT_INITIATED`

  - **Description**: Triggered when a purchase is made through MiniApp.
  - **Requirements**:
    - `transactionId` (String, required): The transaction identifier provided by the GrabPay SDK
    - `products` (Array of objects, optional): The products that are about to be purchased
      - Each product must have:
        - `id` (String, required): The product's unique identifier
        - `quantity` (Number): The quantity of the product
    - `amount` (Number, optional): The total amount of the transaction
    - `currency` (String, optional): The currency used for the transaction
    - `promoCodes` (Array of string, optional): Any promo codes applied to this transaction

- `ERROR_OCCURRED`

  - **Description**: Triggered when an error occurs within the MiniApp.
  - **Requirements**:
    - `errorCode` (String, required): A code or type identifying the error
    - `errorMessage` (String, optional): A message describing the error

- `CUSTOM`
  - **Description**: Triggered when a custom event should be tracked within the MiniApp.
  - **Requirements**:
    - `customEventName` (String, required): The name of the custom event
    - `customEventData` (Any, optional): An object containing the custom event data

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

// Example for STARTED event
containerModule
  .sendAnalyticsEvent({
    sessionId: "e48553f4-625a-431d-adae-56d7801c083c",
    viewName: "Home",
    eventName: "STARTED",
    eventData: null,
  })
  .then(({ result, error }) => {
    if (result) {
      // There is a valid result.
    } else if (error) {
      // Some error happened.
    }
  });

// Example for PAYMENT_INITIATED event
containerModule
  .sendAnalyticsEvent({
    eventName: "PAYMENT_INITIATED",
    eventData: {
      transactionId: "txn_123456",
      products: [
        { id: "product_1", quantity: 2 },
        { id: "product_2", quantity: 1 },
      ],
      amount: 100.5,
      currency: "SGD",
      promoCodes: ["10%OFF"],
    },
  })
  .then(({ result, error }) => {
    if (result) {
      // There is a valid result.
    } else if (error) {
      // Some error happened.
    }
  });
```
