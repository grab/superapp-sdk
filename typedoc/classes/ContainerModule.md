[@grabjs/superapp-sdk](../README.md) / ContainerModule

# Class: ContainerModule

JSBridge module for controlling the webview container.

## Remarks

Provides methods to interact with the webview container.
This code must run on the Grab SuperApp's webview to function correctly.

## Examples

**ES Module:**
```typescript
import { ContainerModule } from '@grabjs/superapp-sdk';
const containerModule = new ContainerModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const containerModule = new SuperAppSDK.ContainerModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new ContainerModule**(): `ContainerModule`

#### Returns

`ContainerModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### close()

> **close**(): `Promise`\<[`CloseResponse`](../type-aliases/CloseResponse.md)\>

Close the container and return to the previous screen.

#### Returns

`Promise`\<[`CloseResponse`](../type-aliases/CloseResponse.md)\>

Resolves when the container closes and the webview is dismissed, or with error information if the request fails.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Close after completing a task
```typescript
await containerModule.close();
```

Close button handler
```typescript
closeButton.addEventListener('click', async () => {
  await containerModule.close();
});
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await containerModule.close();
  switch (status_code) {
    case 200:
      console.log('Container closed successfully');
      break;
    default:
      console.log(`Could not close container${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not close container${error ? `: ${error}` : ''}`);
}
```

***

### getSessionParams()

> **getSessionParams**(): `Promise`\<[`GetSessionParamsResponse`](../type-aliases/GetSessionParamsResponse.md)\>

Get the session parameters from the container.

#### Returns

`Promise`\<[`GetSessionParamsResponse`](../type-aliases/GetSessionParamsResponse.md)\>

Resolves with session parameters from the container, or with error information if the request fails.

#### Remarks

The native layer returns session parameters as a JSON string.
Parse with `JSON.parse(result.result)` to use as an object.
Session parameters can contain primitives, base64 encoded strings, or nested objects.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Get session parameters
```typescript
const { result } = await containerModule.getSessionParams();
if (result?.result) {
  const sessionParams = JSON.parse(result.result);
  console.log("Session parameters:", sessionParams);
  if (sessionParams.param1) {
    configureFeature(sessionParams.param1);
  }
}
```

Get user ID from session params
```typescript
const { result } = await containerModule.getSessionParams();
const params = JSON.parse(result?.result || '{}');
return params.userId;
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await containerModule.getSessionParams();
  switch (status_code) {
    case 200:
      const sessionParams = JSON.parse(result?.result || '{}');
      console.log('Session params retrieved:', sessionParams);
      break;
    default:
      console.log(`Could not get session params${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not get session params${error ? `: ${error}` : ''}`);
}
```

***

### hideBackButton()

> **hideBackButton**(): `Promise`\<[`HideBackButtonResponse`](../type-aliases/HideBackButtonResponse.md)\>

Hide the back button on the container header.

#### Returns

`Promise`\<[`HideBackButtonResponse`](../type-aliases/HideBackButtonResponse.md)\>

Resolves when the back button is hidden, or with error information if the request fails.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Hide back button
```typescript
await containerModule.hideBackButton();
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await containerModule.hideBackButton();
  switch (status_code) {
    case 200:
      console.log('Back button hidden successfully');
      break;
    default:
      console.log(`Could not hide back button${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not hide back button${error ? `: ${error}` : ''}`);
}
```

***

### hideLoader()

> **hideLoader**(): `Promise`\<[`HideLoaderResponse`](../type-aliases/HideLoaderResponse.md)\>

Hide the full-screen loading indicator.

#### Returns

`Promise`\<[`HideLoaderResponse`](../type-aliases/HideLoaderResponse.md)\>

Resolves when the loading indicator is hidden, or with error information if the request fails.

#### Remarks

Should be called when the entry point has finished loading.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Hide loader
```typescript
await containerModule.hideLoader();
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await containerModule.hideLoader();
  switch (status_code) {
    case 200:
      console.log('Loader hidden successfully');
      break;
    default:
      console.log(`Could not hide loader${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not hide loader${error ? `: ${error}` : ''}`);
}
```

***

### hideRefreshButton()

> **hideRefreshButton**(): `Promise`\<[`HideRefreshButtonResponse`](../type-aliases/HideRefreshButtonResponse.md)\>

Hide the refresh button on the container header.

#### Returns

`Promise`\<[`HideRefreshButtonResponse`](../type-aliases/HideRefreshButtonResponse.md)\>

Resolves when the refresh button is hidden, or with error information if the request fails.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Hide refresh button
```typescript
await containerModule.hideRefreshButton();
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await containerModule.hideRefreshButton();
  switch (status_code) {
    case 200:
      console.log('Refresh button hidden successfully');
      break;
    default:
      console.log(`Could not hide refresh button${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not hide refresh button${error ? `: ${error}` : ''}`);
}
```

***

### isConnected()

> **isConnected**(): `Promise`\<[`IsConnectedResponse`](../type-aliases/IsConnectedResponse.md)\>

Check if the web app is connected to the Grab SuperApp via JSBridge.

#### Returns

`Promise`\<[`IsConnectedResponse`](../type-aliases/IsConnectedResponse.md)\>

Resolves with the JSBridge connection status to the Grab SuperApp, or with error information if the request fails.

#### Remarks

Call this method to verify the connection status before using other features.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Check connection status
```typescript
const response = await containerModule.isConnected();
```

Handling the response
```typescript
try {
  const response = await containerModule.isConnected();
  if (response.status_code === 200) {
    console.log('Connected to Grab SuperApp');
  } else {
    console.log('Not connected to Grab SuperApp');
  }
} catch (error) {
  console.log(`Could not check connection${error ? `: ${error}` : ''}`);
}
```

***

### onContentLoaded()

> **onContentLoaded**(): `Promise`\<[`OnContentLoadedResponse`](../type-aliases/OnContentLoadedResponse.md)\>

Notify the Grab SuperApp that the page content has loaded.

#### Returns

`Promise`\<[`OnContentLoadedResponse`](../type-aliases/OnContentLoadedResponse.md)\>

Resolves when the content loaded notification is sent, or with error information if the request fails.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Notify on page load
```typescript
await containerModule.onContentLoaded();
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await containerModule.onContentLoaded();
  switch (status_code) {
    case 200:
      console.log('Content loaded notification sent successfully');
      break;
    default:
      console.log(`Could not notify content loaded${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not notify content loaded${error ? `: ${error}` : ''}`);
}
```

***

### onCtaTap()

> **onCtaTap**(`request`: `string`): `Promise`\<[`OnCtaTapResponse`](../type-aliases/OnCtaTapResponse.md)\>

Notify the client that the user has tapped a call-to-action (CTA).

#### Parameters

##### request

`string`

CTA action identifier (e.g., "AV_LANDING_PAGE_CONTINUE", "BOOKING_CONFIRMED").

#### Returns

`Promise`\<[`OnCtaTapResponse`](../type-aliases/OnCtaTapResponse.md)\>

Resolves when the CTA tap notification is sent, or with error information if the request fails.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Notify CTA tap
```typescript
await containerModule.onCtaTap("AV_LANDING_PAGE_CONTINUE");
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await containerModule.onCtaTap(action);
  switch (status_code) {
    case 200:
      console.log('CTA tap notified successfully');
      break;
    default:
      console.log(`Could not notify CTA tap${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not notify CTA tap${error ? `: ${error}` : ''}`);
}
```

***

### openExternalLink()

> **openExternalLink**(`request`: `string`): `Promise`\<[`OpenExternalLinkResponse`](../type-aliases/OpenExternalLinkResponse.md)\>

Open a link in the external browser.

#### Parameters

##### request

`string`

URL to open in external browser.

#### Returns

`Promise`\<[`OpenExternalLinkResponse`](../type-aliases/OpenExternalLinkResponse.md)\>

Resolves when the external browser opens with the URL, or with error information if the request fails.

#### Remarks

Call this method to open the specified URL in an external browser (outside of the Grab app).

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Open external link
```typescript
await containerModule.openExternalLink("https://grab.com");
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await containerModule.openExternalLink(url);
  switch (status_code) {
    case 200:
      console.log('External link opened successfully');
      break;
    default:
      console.log(`Could not open external link${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not open external link${error ? `: ${error}` : ''}`);
}
```

***

### sendAnalyticsEvent()

> **sendAnalyticsEvent**(`request`: [`SendAnalyticsEventRequest`](../type-aliases/SendAnalyticsEventRequest.md)): `Promise`\<[`SendAnalyticsEventResponse`](../type-aliases/SendAnalyticsEventResponse.md)\>

Use this method to track user interactions and page transitions.

#### Parameters

##### request

[`SendAnalyticsEventRequest`](../type-aliases/SendAnalyticsEventRequest.md)

Details of the analytics event to be sent to the container.

#### Returns

`Promise`\<[`SendAnalyticsEventResponse`](../type-aliases/SendAnalyticsEventResponse.md)\>

Resolves when the analytics event is sent to the container, or with error information if the request fails.

#### Remarks

You can use predefined constants to ensure consistency across the platform.

**Predefined Values:**
- **States:** [ContainerAnalyticsEventState](../variables/ContainerAnalyticsEventState.md)
- **Names:** [ContainerAnalyticsEventName](../variables/ContainerAnalyticsEventName.md)
- **Data Keys:** [ContainerAnalyticsEventData](../variables/ContainerAnalyticsEventData.md)

#### Throws

Error when the JSBridge method fails unexpectedly.

#### See

[ContainerAnalyticsEventState](../variables/ContainerAnalyticsEventState.md), [ContainerAnalyticsEventName](../variables/ContainerAnalyticsEventName.md), [ContainerAnalyticsEventData](../variables/ContainerAnalyticsEventData.md)

#### Examples

Send a DEFAULT event for HOMEPAGE state
```typescript
import {
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
} from "@grabjs/superapp-sdk";

await containerModule.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.HOMEPAGE,
  name: ContainerAnalyticsEventName.DEFAULT,
});
```

Send a BOOK event for CHECKOUT_PAGE state with standard data keys
```typescript
import {
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventData,
} from "@grabjs/superapp-sdk";

await containerModule.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.CHECKOUT_PAGE,
  name: "BOOK",
  data: {
    [ContainerAnalyticsEventData.TRANSACTION_AMOUNT]: 100,
    [ContainerAnalyticsEventData.TRANSACTION_CURRENCY]: "SGD",
  },
});
```

Send a CLICK_RIDE event for CUSTOM state with custom metadata
```typescript
import {
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventData,
} from "@grabjs/superapp-sdk";

await containerModule.sendAnalyticsEvent({
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
});
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await containerModule.sendAnalyticsEvent(params);
  switch (status_code) {
    case 200:
      console.log('Analytics event sent successfully');
      break;
    default:
      console.log(`Could not send analytics event${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not send analytics event${error ? `: ${error}` : ''}`);
}
```

***

### setBackgroundColor()

> **setBackgroundColor**(`request`: `string`): `Promise`\<[`SetBackgroundColorResponse`](../type-aliases/SetBackgroundColorResponse.md)\>

Set the background color of the container header.

#### Parameters

##### request

`string`

Hexadecimal color value (e.g., "#ffffff", "#000000").

#### Returns

`Promise`\<[`SetBackgroundColorResponse`](../type-aliases/SetBackgroundColorResponse.md)\>

Resolves when the background color has been applied, or with error information if the request fails.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Set background color to white
```typescript
await containerModule.setBackgroundColor("#ffffff");
```

Set background color to dark
```typescript
await containerModule.setBackgroundColor("#1a1a1a");
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await containerModule.setBackgroundColor(backgroundColor);
  switch (status_code) {
    case 200:
      console.log('Background color set successfully');
      break;
    default:
      console.log(`Could not set background color${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not set background color${error ? `: ${error}` : ''}`);
}
```

***

### setTitle()

> **setTitle**(`request`: `string`): `Promise`\<[`SetTitleResponse`](../type-aliases/SetTitleResponse.md)\>

Set the title of the container header.

#### Parameters

##### request

`string`

Title of the page.

#### Returns

`Promise`\<[`SetTitleResponse`](../type-aliases/SetTitleResponse.md)\>

Resolves when the title has been set in the navigation bar, or with error information if the request fails.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Set title
```typescript
await containerModule.setTitle("Home");
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await containerModule.setTitle(title);
  switch (status_code) {
    case 200:
      console.log('Title set successfully');
      break;
    default:
      console.log(`Could not set title${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not set title${error ? `: ${error}` : ''}`);
}
```

***

### showBackButton()

> **showBackButton**(): `Promise`\<[`ShowBackButtonResponse`](../type-aliases/ShowBackButtonResponse.md)\>

Show the back button on the container header.

#### Returns

`Promise`\<[`ShowBackButtonResponse`](../type-aliases/ShowBackButtonResponse.md)\>

Resolves when the back button is shown, or with error information if the request fails.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Show back button
```typescript
await containerModule.showBackButton();
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await containerModule.showBackButton();
  switch (status_code) {
    case 200:
      console.log('Back button shown successfully');
      break;
    default:
      console.log(`Could not show back button${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not show back button${error ? `: ${error}` : ''}`);
}
```

***

### showLoader()

> **showLoader**(): `Promise`\<[`ShowLoaderResponse`](../type-aliases/ShowLoaderResponse.md)\>

Show the full-screen loading indicator.

#### Returns

`Promise`\<[`ShowLoaderResponse`](../type-aliases/ShowLoaderResponse.md)\>

Resolves when the loading indicator is displayed, or with error information if the request fails.

#### Remarks

Remember to call [ContainerModule.hideLoader](#hideloader) when the operation completes.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Show loader indicator
```typescript
await containerModule.showLoader();
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await containerModule.showLoader();
  switch (status_code) {
    case 200:
      console.log('Loader shown successfully');
      break;
    default:
      console.log(`Could not show loader${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not show loader${error ? `: ${error}` : ''}`);
}
```

***

### showRefreshButton()

> **showRefreshButton**(): `Promise`\<[`ShowRefreshButtonResponse`](../type-aliases/ShowRefreshButtonResponse.md)\>

Show the refresh button on the container header.

#### Returns

`Promise`\<[`ShowRefreshButtonResponse`](../type-aliases/ShowRefreshButtonResponse.md)\>

Resolves when the refresh button is shown, or with error information if the request fails.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Show refresh button
```typescript
await containerModule.showRefreshButton();
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await containerModule.showRefreshButton();
  switch (status_code) {
    case 200:
      console.log('Refresh button shown successfully');
      break;
    default:
      console.log(`Could not show refresh button${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not show refresh button${error ? `: ${error}` : ''}`);
}
```
