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

### 8. Send analytics event

**Method name**: `sendAnalyticsEvent`

**Arguments**

An object, containing the following properties:

| Name        | Type   | Required | Description                                                    |
| ----------- | ------ | -------- | -------------------------------------------------------------- |
| `url`       | String | No       | The URL associated with the event                              |
| `sessionId` | String | No       | A unique identifier for the user's session                     |
| `viewName`  | String | No       | The name of the page or screen displayed when the event occurs |
| `eventName` | String | Yes      | Name of the event                                              |
| `eventData` | Any    | No       | The event data (can be any type)                               |

**Events**

The following events are available:

- `STARTED`

  - **Description**: Triggered when the MiniApp is initialized.
  - **Requirements for eventData**:
    - Must be empty

- `PAYMENT_STATUS_UPDATED`

  - **Description**: Triggered when a payment status is updated.
  - **Requirements for eventData**:
    - `transactionId` (String, optional): The transaction identifier provided by the GrabPay SDK
    - `statusCode` (String, required): The status of the payment. Must be one of: 'SUCCESS', 'FAILURE', 'CANCELLED', 'UNKNOWN' (case-sensitive)
    - `statusMessage` (String, optional): A message describing the status update
    - `products` (Array of objects, optional): The products that are being purchased
      - Each product must have:
        - `id` (String, required): The product's unique identifier
        - `quantity` (Number, optional): The quantity of the product
    - `amount` (Number, optional): The total amount of the transaction
    - `currency` (String, optional): The currency used for the transaction
    - `promoCodes` (Array of string, optional): Any promo codes applied to this transaction

- `ERROR_OCCURRED`

  - **Description**: Triggered when an error occurs within the MiniApp.
  - **Requirements for eventData**:
    - `errorCode` (String, required): A code or type identifying the error
    - `errorMessage` (String, optional): A message describing the error
    - `errorSeverity` (String, optional): The severity level of the error. Must be one of: 'WARNING', 'ERROR', 'CRITICAL' (case-sensitive)

- `CUSTOM`
  - **Description**: Triggered when a custom event should be tracked within the MiniApp.
  - **Requirements for eventData**:
    - `customEventName` (String, required): The name of the custom event
    - `customEventData` (Any, optional): An object containing the custom event data

**Return type**

`None`

**Validation**

The SDK performs strict validation on all events:

- All required fields must be present
- Field types must match their specifications exactly
- No additional fields are allowed beyond those specified
- Validation errors will be returned in the `error` field of the response

**Code example**

```javascript
import {
  ContainerModule,
  AnalyticsEventName,
  PaymentStatusCode,
  ErrorSeverity,
} from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

// Example for STARTED event
containerModule
  .sendAnalyticsEvent({
    url: "https://www.grab.com/sg/",
    sessionId: "e48553f4-625a-431d-adae-56d7801c083c",
    viewName: "Home",
    eventName: AnalyticsEventName.STARTED,
    eventData: null,
  })
  .then(({ result, error }) => {
    if (error) {
      // Some error happened.
    }
  });

// Example for PAYMENT_STATUS_UPDATED event
containerModule
  .sendAnalyticsEvent({
    url: "https://www.grab.com/sg/",
    sessionId: "e48553f4-625a-431d-adae-56d7801c083c",
    viewName: "Payment",
    eventName: AnalyticsEventName.PAYMENT_STATUS_UPDATED,
    eventData: {
      transactionId: "txn_123456",
      statusCode: PaymentStatusCode.SUCCESS,
      statusMessage: "Payment completed successfully",
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
    if (error) {
      // Some error happened.
    }
  });

// Example for ERROR_OCCURRED event
containerModule
  .sendAnalyticsEvent({
    url: "https://www.grab.com/sg/",
    sessionId: "e48553f4-625a-431d-adae-56d7801c083c",
    viewName: "Payment",
    eventName: AnalyticsEventName.ERROR_OCCURRED,
    eventData: {
      errorCode: "PAYMENT_FAILED",
      errorMessage: "Failed to process payment due to insufficient funds",
      errorSeverity: ErrorSeverity.ERROR,
    },
  })
  .then(({ result, error }) => {
    if (error) {
      // Some error happened.
    }
  });

// Example for CUSTOM event
containerModule
  .sendAnalyticsEvent({
    url: "https://www.grab.com/sg/",
    sessionId: "e48553f4-625a-431d-adae-56d7801c083c",
    viewName: "Home",
    eventName: AnalyticsEventName.CUSTOM,
    eventData: {
      customEventName: "USER_ACTION",
      customEventData: {
        action: "button_click",
        buttonId: "submit_order",
      },
    },
  })
  .then(({ result, error }) => {
    if (error) {
      // Some error happened.
    }
  });
```
