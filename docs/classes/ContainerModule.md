[@grabjs/superapp-sdk](../globals.md) / ContainerModule

# Class: ContainerModule

Provides APIs to interact with the webview container.

## Remarks

The ContainerModule enables miniapps to control the webview container's appearance and behavior,
including navigation controls, loading indicators, analytics tracking, and session management.

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

- `BaseModule`

## Constructors

### Constructor

> **new ContainerModule**(): `ContainerModule`

#### Returns

`ContainerModule`

#### Overrides

`BaseModule.constructor`

## Methods

### setBackgroundColor()

> **setBackgroundColor**(`backgroundColor`: `string`): `Promise`\<[`SetBackgroundColorResponse`](../type-aliases/SetBackgroundColorResponse.md)\>

Set the background color of the container.

#### Parameters

##### backgroundColor

`string`

Hexadecimal color value (e.g., "#ffffff", "#000000").

#### Returns

`Promise`\<[`SetBackgroundColorResponse`](../type-aliases/SetBackgroundColorResponse.md)\>

Promise that resolves to [SetBackgroundColorResponse](../type-aliases/SetBackgroundColorResponse.md) when background color is set.

#### Example

```typescript
try {
  await containerModule.setBackgroundColor("#ffffff");
  await containerModule.setBackgroundColor("#1a1a1a");
} catch (error) {
  console.error(error);
}
```

***

### setTitle()

> **setTitle**(`title`: `string`): `Promise`\<[`SetTitleResponse`](../type-aliases/SetTitleResponse.md)\>

Set the title of the container.

#### Parameters

##### title

`string`

Title text to display in the navigation bar.

#### Returns

`Promise`\<[`SetTitleResponse`](../type-aliases/SetTitleResponse.md)\>

Promise that resolves to [SetTitleResponse](../type-aliases/SetTitleResponse.md) when title is set.

#### Example

```typescript
try {
  await containerModule.setTitle("Home");
} catch (error) {
  console.error(error);
}
```

***

### hideBackButton()

> **hideBackButton**(): `Promise`\<[`HideBackButtonResponse`](../type-aliases/HideBackButtonResponse.md)\>

Hide the back button of the container.

#### Returns

`Promise`\<[`HideBackButtonResponse`](../type-aliases/HideBackButtonResponse.md)\>

Promise that resolves to [HideBackButtonResponse](../type-aliases/HideBackButtonResponse.md) when back button is hidden.

#### Example

```typescript
try {
  await containerModule.hideBackButton();
} catch (error) {
  console.error(error);
}
```

***

### showBackButton()

> **showBackButton**(): `Promise`\<[`ShowBackButtonResponse`](../type-aliases/ShowBackButtonResponse.md)\>

Show the back button of the container.

#### Returns

`Promise`\<[`ShowBackButtonResponse`](../type-aliases/ShowBackButtonResponse.md)\>

Promise that resolves to [ShowBackButtonResponse](../type-aliases/ShowBackButtonResponse.md) when back button is shown.

#### Example

```typescript
try {
  await containerModule.showBackButton();
} catch (error) {
  console.error(error);
}
```

***

### hideRefreshButton()

> **hideRefreshButton**(): `Promise`\<[`HideRefreshButtonResponse`](../type-aliases/HideRefreshButtonResponse.md)\>

Hide the refresh button of the container.

#### Returns

`Promise`\<[`HideRefreshButtonResponse`](../type-aliases/HideRefreshButtonResponse.md)\>

Promise that resolves to [HideRefreshButtonResponse](../type-aliases/HideRefreshButtonResponse.md) when refresh button is hidden.

#### Example

```typescript
try {
  await containerModule.hideRefreshButton();
} catch (error) {
  console.error(error);
}
```

***

### showRefreshButton()

> **showRefreshButton**(): `Promise`\<[`ShowRefreshButtonResponse`](../type-aliases/ShowRefreshButtonResponse.md)\>

Show the refresh button of the container.

#### Returns

`Promise`\<[`ShowRefreshButtonResponse`](../type-aliases/ShowRefreshButtonResponse.md)\>

Promise that resolves to [ShowRefreshButtonResponse](../type-aliases/ShowRefreshButtonResponse.md) when refresh button is shown.

#### Example

```typescript
try {
  await containerModule.showRefreshButton();
} catch (error) {
  console.error(error);
}
```

***

### close()

> **close**(): `Promise`\<[`CloseResponse`](../type-aliases/CloseResponse.md)\>

Close the container.

#### Returns

`Promise`\<[`CloseResponse`](../type-aliases/CloseResponse.md)\>

Promise that resolves to [CloseResponse](../type-aliases/CloseResponse.md) when container is closed.

#### Remarks

This method closes the current webview and returns the user to the previous screen.

#### Examples

Close after completing a task
```typescript
try {
  await containerModule.close();
} catch (error) {
  console.error(error);
}
```

Close button handler
```typescript
closeButton.addEventListener('click', async () => {
  try {
    await containerModule.close();
  } catch (error) {
    console.error(error);
  }
});
```

***

### onContentLoaded()

> **onContentLoaded**(): `Promise`\<[`OnContentLoadedResponse`](../type-aliases/OnContentLoadedResponse.md)\>

Notify the client that page content has loaded.

#### Returns

`Promise`\<[`OnContentLoadedResponse`](../type-aliases/OnContentLoadedResponse.md)\>

Promise that resolves to [OnContentLoadedResponse](../type-aliases/OnContentLoadedResponse.md) when notification is sent.

#### Remarks

Call this method to inform the container that the page content has finished loading.
This can be used to hide loading indicators or trigger post-load actions on the native side.

#### Example

```typescript
window.addEventListener('load', async () => {
  try {
    await containerModule.onContentLoaded();
  } catch (error) {
    console.error(error);
  }
});
```

***

### showLoader()

> **showLoader**(): `Promise`\<[`ShowLoaderResponse`](../type-aliases/ShowLoaderResponse.md)\>

Show the loader in the container.

#### Returns

`Promise`\<[`ShowLoaderResponse`](../type-aliases/ShowLoaderResponse.md)\>

Promise that resolves to [ShowLoaderResponse](../type-aliases/ShowLoaderResponse.md) when loader is shown.

#### Remarks

Call this method to notify the client to show a loading indicator.
Remember to call [hideLoader](#hideloader) when the operation completes.

#### Example

```typescript
async function fetchData() {
  try {
    await containerModule.showLoader();
    const data = await api.fetch();
    processData(data);
  } catch (error) {
    console.error(error);
  } finally {
    await containerModule.hideLoader();
  }
}
fetchData();
```

***

### hideLoader()

> **hideLoader**(): `Promise`\<[`HideLoaderResponse`](../type-aliases/HideLoaderResponse.md)\>

Hide the loader in the container.

#### Returns

`Promise`\<[`HideLoaderResponse`](../type-aliases/HideLoaderResponse.md)\>

Promise that resolves to [HideLoaderResponse](../type-aliases/HideLoaderResponse.md) when loader is hidden.

#### Remarks

Call this method to notify the client to hide the loading indicator.
Should be called after [showLoader](#showloader) when the operation completes.

#### Example

```typescript
try {
  await containerModule.hideLoader();
} catch (error) {
  console.error(error);
}
```

***

### openExternalLink()

> **openExternalLink**(`url`: `string`): `Promise`\<[`OpenExternalLinkResponse`](../type-aliases/OpenExternalLinkResponse.md)\>

Open a link in the external browser.

#### Parameters

##### url

`string`

URL to open in external browser.

#### Returns

`Promise`\<[`OpenExternalLinkResponse`](../type-aliases/OpenExternalLinkResponse.md)\>

Promise that resolves to [OpenExternalLinkResponse](../type-aliases/OpenExternalLinkResponse.md) when external link is opened.

#### Remarks

Call this method to tell the client to open the specified URL in an external browser
(outside of the Grab app).

#### Examples

Open external link
```typescript
try {
  await containerModule.openExternalLink("https://grab.com");
} catch (error) {
  console.error(error);
}
```

Open terms and conditions
```typescript
termsLink.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    await containerModule.openExternalLink("https://grab.com/terms");
  } catch (error) {
    console.error(error);
  }
});
```

***

### onCtaTap()

> **onCtaTap**(`action`: `string`): `Promise`\<[`OnCtaTapResponse`](../type-aliases/OnCtaTapResponse.md)\>

Notify the client that the user has tapped a call-to-action (CTA).

#### Parameters

##### action

`string`

CTA action identifier (e.g., "AV_LANDING_PAGE_CONTINUE", "BOOKING_CONFIRMED").

#### Returns

`Promise`\<[`OnCtaTapResponse`](../type-aliases/OnCtaTapResponse.md)\>

Promise that resolves to [OnCtaTapResponse](../type-aliases/OnCtaTapResponse.md) when CTA tap is notified.

#### Remarks

Call this method to notify the client that the user has continued the flow.
This is useful for analytics and tracking user engagement.

#### Examples

Notify CTA tap
```typescript
try {
  await containerModule.onCtaTap("AV_LANDING_PAGE_CONTINUE");
} catch (error) {
  console.error(error);
}
```

Notify on button click
```typescript
continueButton.addEventListener('click', async () => {
  try {
    await containerModule.onCtaTap("CONTINUE_TO_CHECKOUT");
    navigateToCheckout();
  } catch (error) {
    console.error(error);
  }
});
```

***

### sendAnalyticsEvent()

> **sendAnalyticsEvent**(`eventDetails`: [`AnalyticsEventDetails`](../interfaces/AnalyticsEventDetails.md)): `Promise`\<[`SendAnalyticsEventResponse`](../type-aliases/SendAnalyticsEventResponse.md)\>

Use this method to track user interactions and page transitions.

#### Parameters

##### eventDetails

[`AnalyticsEventDetails`](../interfaces/AnalyticsEventDetails.md)

Details for analytics events sent to the container.

#### Returns

`Promise`\<[`SendAnalyticsEventResponse`](../type-aliases/SendAnalyticsEventResponse.md)\>

A promise that resolves when the event has been successfully queued.

#### Remarks

You can use predefined constants to ensure consistency across the platform.

**Predefined Values:**
- **States:** [ContainerAnalyticsEventState](../variables/ContainerAnalyticsEventState.md)
- **Names:** [ContainerAnalyticsEventName](../variables/ContainerAnalyticsEventName.md)
- **Data Keys:** [ContainerAnalyticsEventData](../variables/ContainerAnalyticsEventData.md)

#### See

[ContainerAnalyticsEventState](../variables/ContainerAnalyticsEventState.md), [ContainerAnalyticsEventName](../variables/ContainerAnalyticsEventName.md), [ContainerAnalyticsEventData](../variables/ContainerAnalyticsEventData.md)

#### Examples

Send a DEFAULT event for HOMEPAGE state
```typescript
import {
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
} from "@grabjs/superapp-sdk";

try {
  await containerModule.sendAnalyticsEvent({
    state: ContainerAnalyticsEventState.HOMEPAGE,
    name: ContainerAnalyticsEventName.DEFAULT,
  });
} catch (error) {
  console.error(error);
}
```

Send a BOOK event for CHECKOUT_PAGE state with standard data keys
```typescript
import {
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventData,
} from "@grabjs/superapp-sdk";

try {
  await containerModule.sendAnalyticsEvent({
    state: ContainerAnalyticsEventState.CHECKOUT_PAGE,
    name: "BOOK",
    data: {
      [ContainerAnalyticsEventData.TRANSACTION_AMOUNT]: 100,
      [ContainerAnalyticsEventData.TRANSACTION_CURRENCY]: "SGD",
    },
  });
} catch (error) {
  console.error(error);
}
```

Send a CLICK_RIDE event for CUSTOM state with custom metadata
```typescript
import {
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventData,
} from "@grabjs/superapp-sdk";

try {
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
} catch (error) {
  console.error(error);
}
```

***

### isConnected()

> **isConnected**(): `Promise`\<[`IsConnectedResponse`](../type-aliases/IsConnectedResponse.md)\>

Check if the web app is connected to the Grab app via JSBridge.

#### Returns

`Promise`\<[`IsConnectedResponse`](../type-aliases/IsConnectedResponse.md)\>

Promise that resolves to [IsConnectedResponse](../type-aliases/IsConnectedResponse.md) with connection status.

#### Remarks

Call this method to verify the connection status before using other SDK features.

#### Examples

Check connection status
```typescript
try {
  const { status_code } = await containerModule.isConnected();
  if (status_code === 200) {
    console.log("Connected to Grab app");
    enableSDKFeatures();
  } else if (status_code === 424) {
    console.log("Not connected to Grab app");
    showWebOnlyExperience();
  }
} catch (error) {
  console.error(error);
}
```

Check connection on app init
```typescript
try {
  const { status_code } = await containerModule.isConnected();
  if (status_code === 200) {
    await locationModule.getCoordinate();
  }
} catch (error) {
  console.error(error);
}
```

***

### getSessionParams()

> **getSessionParams**(): `Promise`\<[`GetSessionParamsResponse`](../type-aliases/GetSessionParamsResponse.md)\>

Get the session parameters from the container.

#### Returns

`Promise`\<[`GetSessionParamsResponse`](../type-aliases/GetSessionParamsResponse.md)\>

Promise that resolves to [GetSessionParamsResponse](../type-aliases/GetSessionParamsResponse.md) with a JSON string in `result` on success.

#### Remarks

The native layer returns session parameters as a JSON string. Parse with `JSON.parse(result)` to
use as an object. Session params can contain primitives, base64 encoded strings, or nested objects.

#### Examples

Get session parameters
```typescript
try {
  const { result } = await containerModule.getSessionParams();
  if (result) {
    const sessionParams = JSON.parse(result);
    console.log("Session parameters:", sessionParams);
    if (sessionParams.param1) {
      configureFeature(sessionParams.param1);
    }
  }
} catch (error) {
  console.error(error);
}
```

Get user ID from session params
```typescript
try {
  const { result } = await containerModule.getSessionParams();
  const params = JSON.parse(result || '{}');
  return params.userId;
} catch (error) {
  console.error(error);
  return null;
}
```
