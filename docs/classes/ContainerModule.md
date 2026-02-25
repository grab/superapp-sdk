[@grabjs/superapp-sdk](../README.md) / ContainerModule

# Class: ContainerModule

The ContainerModule provides APIs to interact with the webview container.

## Example

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only once and reuse across app.
const containerModule = new ContainerModule();
```

## Extends

- `ModuleBase`

## Constructors

### Constructor

> **new ContainerModule**(): `ContainerModule`

#### Returns

`ContainerModule`

#### Overrides

`ModuleBase.constructor`

## Methods

### setBackgroundColor()

> **setBackgroundColor**(`backgroundColor`: `string`): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Set the background color of the container.

#### Parameters

##### backgroundColor

`string`

Hexadecimal color value (e.g., "#ffffff", "#000000").

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Promise that resolves to [WrappedResponse](../type-aliases/WrappedResponse.md) when background color is set.

#### Example

```javascript
// Set to white background
containerModule.setBackgroundColor("#ffffff")
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("Background color set successfully");
    } else if (error) {
      console.error("Error setting background:", error);
    }
  });

// Set to dark background
containerModule.setBackgroundColor("#1a1a1a");
```

***

### setTitle()

> **setTitle**(`title`: `string`): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Set the title of the container.

#### Parameters

##### title

`string`

Title text to display in the navigation bar.

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Promise that resolves to [WrappedResponse](../type-aliases/WrappedResponse.md) when title is set.

#### Example

```javascript
containerModule.setTitle("Home")
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("Title set successfully");
    } else if (error) {
      console.error("Error setting title:", error);
    }
  });

// Dynamic title based on page
const setPageTitle = (pageName) => {
  containerModule.setTitle(pageName);
};
```

***

### hideBackButton()

> **hideBackButton**(): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Hide the back button of the container.

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Promise that resolves to [WrappedResponse](../type-aliases/WrappedResponse.md) when back button is hidden.

#### Example

```javascript
containerModule.hideBackButton()
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("Back button hidden");
    } else if (error) {
      console.error("Error:", error);
    }
  });
```

***

### showBackButton()

> **showBackButton**(): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Show the back button of the container.

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Promise that resolves to [WrappedResponse](../type-aliases/WrappedResponse.md) when back button is shown.

#### Example

```javascript
containerModule.showBackButton()
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("Back button shown");
    } else if (error) {
      console.error("Error:", error);
    }
  });
```

***

### hideRefreshButton()

> **hideRefreshButton**(): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Hide the refresh button of the container.

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Promise that resolves to [WrappedResponse](../type-aliases/WrappedResponse.md) when refresh button is hidden.

#### Example

```javascript
containerModule.hideRefreshButton()
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("Refresh button hidden");
    } else if (error) {
      console.error("Error:", error);
    }
  });
```

***

### showRefreshButton()

> **showRefreshButton**(): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Show the refresh button of the container.

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Promise that resolves to [WrappedResponse](../type-aliases/WrappedResponse.md) when refresh button is shown.

#### Example

```javascript
containerModule.showRefreshButton()
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("Refresh button shown");
    } else if (error) {
      console.error("Error:", error);
    }
  });
```

***

### close()

> **close**(): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Close the container.

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Promise that resolves to [WrappedResponse](../type-aliases/WrappedResponse.md) when container is closed.

#### Remarks

This method closes the current webview and returns the user to the previous screen.

#### Example

```javascript
// Close after completing a task
containerModule.close()
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("Container closed");
    } else if (error) {
      console.error("Error:", error);
    }
  });

// Example: Close button handler
closeButton.addEventListener('click', () => {
  containerModule.close();
});
```

***

### onContentLoaded()

> **onContentLoaded**(): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Notify the client that page content has loaded.

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Promise that resolves to [WrappedResponse](../type-aliases/WrappedResponse.md) when notification is sent.

#### Remarks

Call this method to inform the container that the page content has finished loading.
This can be used to hide loading indicators or trigger post-load actions on the native side.

#### Example

```javascript
// Notify after page load
window.addEventListener('load', () => {
  containerModule.onContentLoaded()
    .then(({ status_code }) => {
      if (status_code === 200) {
        console.log("Content loaded notification sent");
      }
    });
});

// Notify after async data load
async function loadPageData() {
  await fetchData();
  await containerModule.onContentLoaded();
}
```

***

### showLoader()

> **showLoader**(): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Show the loader in the container.

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Promise that resolves to [WrappedResponse](../type-aliases/WrappedResponse.md) when loader is shown.

#### Remarks

Call this method to notify the client to show a loading indicator.
Remember to call [hideLoader](#hideloader) when the operation completes.

#### Example

```javascript
// Show loader during async operation
async function fetchData() {
  await containerModule.showLoader();
  
  try {
    const data = await api.fetch();
    processData(data);
  } finally {
    await containerModule.hideLoader();
  }
}
```

***

### hideLoader()

> **hideLoader**(): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Hide the loader in the container.

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Promise that resolves to [WrappedResponse](../type-aliases/WrappedResponse.md) when loader is hidden.

#### Remarks

Call this method to notify the client to hide the loading indicator.
Should be called after [showLoader](#showloader) when the operation completes.

#### Example

```javascript
containerModule.hideLoader()
  .then(({ status_code }) => {
    if (status_code === 200) {
      console.log("Loader hidden");
    }
  });
```

***

### openExternalLink()

> **openExternalLink**(`url`: `string`): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Open a link in the external browser.

#### Parameters

##### url

`string`

URL to open in external browser.

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Promise that resolves to [WrappedResponse](../type-aliases/WrappedResponse.md) when external link is opened.

#### Remarks

Call this method to tell the client to open the specified URL in an external browser
(outside of the Grab app).

#### Example

```javascript
containerModule.openExternalLink("https://grab.com")
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("External link opened");
    } else if (error) {
      console.error("Error opening link:", error);
    }
  });

// Example: Open terms and conditions
termsLink.addEventListener('click', (e) => {
  e.preventDefault();
  containerModule.openExternalLink("https://grab.com/terms");
});
```

***

### onCtaTap()

> **onCtaTap**(`action`: `string`): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Notify the client that the user has tapped a call-to-action (CTA).

#### Parameters

##### action

`string`

CTA action identifier (e.g., "AV_LANDING_PAGE_CONTINUE", "BOOKING_CONFIRMED").

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Promise that resolves to [WrappedResponse](../type-aliases/WrappedResponse.md) when CTA tap is notified.

#### Remarks

Call this method to notify the client that the user has continued the flow.
This is useful for analytics and tracking user engagement.

#### Example

```javascript
containerModule.onCtaTap("AV_LANDING_PAGE_CONTINUE")
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("CTA tap notified");
    } else if (error) {
      console.error("Error:", error);
    }
  });

// Example: Notify on button click
continueButton.addEventListener('click', () => {
  containerModule.onCtaTap("CONTINUE_TO_CHECKOUT");
  navigateToCheckout();
});
```

***

### sendAnalyticsEvent()

> **sendAnalyticsEvent**(`eventDetails`: [`AnalyticsEventDetails`](../interfaces/AnalyticsEventDetails.md)): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Use this method to track user interactions and page transitions.

#### Parameters

##### eventDetails

[`AnalyticsEventDetails`](../interfaces/AnalyticsEventDetails.md)

The details of the event to send.
  - `state`: The current context (e.g., [ContainerAnalyticsEventState.HOMEPAGE](../variables/ContainerAnalyticsEventState.md#homepage)).
  - `name`: The event name (e.g., [ContainerAnalyticsEventName.DEFAULT](../variables/ContainerAnalyticsEventName.md#default)).
  - `data`: Optional metadata. Use [ContainerAnalyticsEventData](../variables/ContainerAnalyticsEventData.md) for standard keys.

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

A promise that resolves when the event has been successfully queued.

#### Remarks

You can use predefined constants to ensure consistency across the platform.

**Predefined Values:**
- **States:** [ContainerAnalyticsEventState](../variables/ContainerAnalyticsEventState.md)
- **Names:** [ContainerAnalyticsEventName](../variables/ContainerAnalyticsEventName.md)
- **Data Keys:** [ContainerAnalyticsEventData](../variables/ContainerAnalyticsEventData.md)

#### See

[ContainerAnalyticsEventState](../variables/ContainerAnalyticsEventState.md), [ContainerAnalyticsEventName](../variables/ContainerAnalyticsEventName.md), [ContainerAnalyticsEventData](../variables/ContainerAnalyticsEventData.md)

#### Example

```javascript
import {
  ContainerModule,
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
  ContainerAnalyticsEventData,
} from "@grabjs/superapp-sdk";

const containerModule = new ContainerModule();

// Example 1: Send a DEFAULT event for HOMEPAGE state
containerModule
  .sendAnalyticsEvent({
    state: ContainerAnalyticsEventState.HOMEPAGE,
    name: ContainerAnalyticsEventName.DEFAULT,
  })
  .then(({ result, error }) => {
    if (error) {
      console.error("Validation error:", error);
    }
  });

// Example 2: Send a BOOK event for CHECKOUT_PAGE state with standard data keys
containerModule
  .sendAnalyticsEvent({
    state: ContainerAnalyticsEventState.CHECKOUT_PAGE,
    name: "BOOK",
    data: {
      [ContainerAnalyticsEventData.TRANSACTION_AMOUNT]: 100,
      [ContainerAnalyticsEventData.TRANSACTION_CURRENCY]: "SGD",
    },
  })
  .then(({ result, error }) => {
    if (error) {
      console.error("Validation error:", error);
    }
  });

// Example 3: Send a CLICK_RIDE event for CUSTOM state with custom metadata
containerModule
  .sendAnalyticsEvent({
    state: ContainerAnalyticsEventState.CUSTOM,
    name: "CLICK_RIDE",
    data: {
      [ContainerAnalyticsEventData.PAGE]: "LIST_RIDES",
      departure_time: "2025-06-01 08:00:00",
      arrival_time: "2025-06-01 10:30:00",
      departure_address: "6 Bayfront Ave, Singapore 018974",
      arrival_address:
        "Petronas Twin Tower, Kuala Lumpur City Centre, 50088 Kuala Lumpur, Malaysia",
    },
  })
  .then(({ result, error }) => {
    if (error) {
      console.error("Validation error:", error);
    }
  });
```

***

### isConnected()

> **isConnected**(): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Check if the web app is connected to the Grab app via JSBridge.

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`undefined`\>\>

Promise that resolves to [WrappedResponse](../type-aliases/WrappedResponse.md) with connection status.

#### Remarks

Call this method to verify the connection status before using other SDK features.

**Status Codes:**
- `200`: Connected to Grab app
- `424`: Not connected to Grab app or user agent not available

#### Example

```javascript
containerModule.isConnected()
  .then(({ status_code, error }) => {
    if (status_code === 200) {
      console.log("Connected to Grab app");
      // Enable SDK features
      enableSDKFeatures();
    } else if (status_code === 424) {
      console.log("Not connected to Grab app");
      // Show fallback UI
      showWebOnlyExperience();
    }
  });

// Example: Check connection on app init
async function initApp() {
  const { status_code } = await containerModule.isConnected();
  if (status_code === 200) {
    // Initialize SDK-dependent features
    await locationModule.getCoordinate();
  }
}
```

***

### getSessionParams()

> **getSessionParams**(): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`Record`\<`string`, `unknown`\>\>\>

Get the session parameters from the container.

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`Record`\<`string`, `unknown`\>\>\>

Promise that resolves to [WrappedResponse](../type-aliases/WrappedResponse.md) with session parameters attached to the current session.

#### Remarks

Session params can be in any format (primitive, base64 encoded string, etc).
Use this to retrieve configuration or state that was passed when opening the webview.

#### Example

```javascript
containerModule.getSessionParams()
  .then(({ result, error, status_code }) => {
    if (result) {
      // Session params can be in any format
      // e.g. stringified JSON object '{"param1": 123, "param2": "grab-test"}'
      const sessionParams = JSON.parse(result);
      console.log("Session parameters:", sessionParams);
      
      // Use params to configure the app
      if (sessionParams.param1) {
        configureFeature(sessionParams.param1);
      }
    } else if (error) {
      console.error("Error getting session params:", error);
    }
  });

// Example: Get user ID from session params
async function getUserId() {
  const { result } = await containerModule.getSessionParams();
  const params = JSON.parse(result || '{}');
  return params.userId;
}
```
