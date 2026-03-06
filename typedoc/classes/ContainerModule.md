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

> **close**(): `Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

Close the container and return to the previous screen.

#### Returns

`Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

A promise that resolves to a `200` status code when the container closes.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule, isResponseOk } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Close the container
try {
  const response = await containerModule.close();

  if (isResponseOk(response)) {
    console.log('Container closed successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### getSessionParams()

> **getSessionParams**(): `Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<[`GetSessionParamsResult`](../type-aliases/GetSessionParamsResult.md)\>\>

Get the session parameters from the container.

#### Returns

`Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<[`GetSessionParamsResult`](../type-aliases/GetSessionParamsResult.md)\>\>

A promise that resolves to a `200` status code with session parameters.

#### Remarks

The native layer returns session parameters as a JSON string.
Parse with `JSON.parse(result.result)` to use as an object.
Session parameters can contain primitives, base64 encoded strings, or nested objects.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule, isResponseOk } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Get session parameters
try {
  const response = await containerModule.getSessionParams();

  if (isResponseOk(response)) {
    const sessionParams = JSON.parse(response.result?.result || '{}');
    console.log('Session params retrieved:', sessionParams);
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### hideBackButton()

> **hideBackButton**(): `Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

Hide the back button on the container header.

#### Returns

`Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

A promise that resolves to a `200` status code when the back button is hidden.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule, isResponseOk } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Hide back button
try {
  const response = await containerModule.hideBackButton();

  if (isResponseOk(response)) {
    console.log('Back button hidden successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### hideLoader()

> **hideLoader**(): `Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

Hide the full-screen loading indicator.

#### Returns

`Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

A promise that resolves to a `200` status code when the loading indicator is hidden.

#### Remarks

Should be called when the entry point has finished loading.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule, isResponseOk } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Hide loader
try {
  const response = await containerModule.hideLoader();

  if (isResponseOk(response)) {
    console.log('Loader hidden successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### hideRefreshButton()

> **hideRefreshButton**(): `Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

Hide the refresh button on the container header.

#### Returns

`Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

A promise that resolves to a `200` status code when the refresh button is hidden.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule, isResponseOk } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Hide refresh button
try {
  const response = await containerModule.hideRefreshButton();

  if (isResponseOk(response)) {
    console.log('Refresh button hidden successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### isConnected()

> **isConnected**(): `Promise`\<[`IsConnectedResponse`](../type-aliases/IsConnectedResponse.md)\>

Check if the web app is connected to the Grab SuperApp via JSBridge.

#### Returns

`Promise`\<[`IsConnectedResponse`](../type-aliases/IsConnectedResponse.md)\>

A promise that resolves to a response with one of the following possible status codes:
- `200`: Connected to Grab SuperApp
- `404`: Not connected to Grab SuperApp

#### Remarks

Call this method to verify the connection status before using other features.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule, isResponseOk, isResponseError } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Check connection status
try {
  const response = await containerModule.isConnected();

  if (isResponseError(response)) {
    console.log('Not connected to Grab SuperApp');
  } else if (isResponseOk(response)) {
    console.log('Connected to Grab SuperApp');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### onContentLoaded()

> **onContentLoaded**(): `Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

Notify the Grab SuperApp that the page content has loaded.

#### Returns

`Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

A promise that resolves to a `200` status code when the notification is sent.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule, isResponseOk } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Notify content loaded
try {
  const response = await containerModule.onContentLoaded();

  if (isResponseOk(response)) {
    console.log('Content loaded notification sent successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### onCtaTap()

> **onCtaTap**(`request`: `string`): `Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

Notify the client that the user has tapped a call-to-action (CTA).

#### Parameters

##### request

`string`

The CTA action configuration.

#### Returns

`Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

A promise that resolves to a `200` response when the CTA tap notification is sent.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule, isResponseOk } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Notify CTA tap
try {
  const response = await containerModule.onCtaTap('AV_LANDING_PAGE_CONTINUE');

  if (isResponseOk(response)) {
    console.log('CTA tap notified successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### openExternalLink()

> **openExternalLink**(`request`: `string`): `Promise`\<[`OpenExternalLinkResponse`](../type-aliases/OpenExternalLinkResponse.md)\>

Open a link in the external browser.

#### Parameters

##### request

`string`

The URL configuration.

#### Returns

`Promise`\<[`OpenExternalLinkResponse`](../type-aliases/OpenExternalLinkResponse.md)\>

A promise that resolves to a response with one of the following possible status codes:
- `200`: External link opened successfully
- `400`: URL parameter not found

#### Remarks

Call this method to open the specified URL in an external browser (outside of the Grab app).

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule, isResponseOk, isResponseError } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Open external link
try {
  const response = await containerModule.openExternalLink('https://grab.com');

  if (isResponseError(response)) {
    console.log('Could not open external link:', response.error);
  } else if (isResponseOk(response)) {
    console.log('External link opened successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### sendAnalyticsEvent()

> **sendAnalyticsEvent**(`request`: [`SendAnalyticsEventRequest`](../type-aliases/SendAnalyticsEventRequest.md)): `Promise`\<[`SendAnalyticsEventResponse`](../type-aliases/SendAnalyticsEventResponse.md)\>

Use this method to track user interactions and page transitions.

#### Parameters

##### request

[`SendAnalyticsEventRequest`](../type-aliases/SendAnalyticsEventRequest.md)

The analytics event configuration.

#### Returns

`Promise`\<[`SendAnalyticsEventResponse`](../type-aliases/SendAnalyticsEventResponse.md)\>

A promise that resolves to a `200` response when the analytics event is sent.

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

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import {
  ContainerModule,
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
  isResponseOk
} from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const {
  ContainerModule,
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
  isResponseOk
} = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Send analytics event
try {
  const response = await containerModule.sendAnalyticsEvent({
    state: ContainerAnalyticsEventState.HOMEPAGE,
    name: ContainerAnalyticsEventName.DEFAULT,
  });

  if (isResponseOk(response)) {
    console.log('Analytics event sent successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### setBackgroundColor()

> **setBackgroundColor**(`request`: `string`): `Promise`\<[`SetBackgroundColorResponse`](../type-aliases/SetBackgroundColorResponse.md)\>

Set the background color of the container header.

#### Parameters

##### request

`string`

The background color configuration.

#### Returns

`Promise`\<[`SetBackgroundColorResponse`](../type-aliases/SetBackgroundColorResponse.md)\>

A promise that resolves to a response with one of the following possible status codes:
- `200`: Background color set successfully
- `400`: Invalid background color

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule, isResponseOk, isResponseError } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Set background color
try {
  const response = await containerModule.setBackgroundColor('#ffffff');

  if (isResponseError(response)) {
    console.log('Could not set background color:', response.error);
  } else if (isResponseOk(response)) {
    console.log('Background color set successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### setTitle()

> **setTitle**(`request`: `string`): `Promise`\<[`SetTitleResponse`](../type-aliases/SetTitleResponse.md)\>

Set the title of the container header.

#### Parameters

##### request

`string`

The title configuration.

#### Returns

`Promise`\<[`SetTitleResponse`](../type-aliases/SetTitleResponse.md)\>

A promise that resolves to a response with one of the following possible status codes:
- `200`: Title set successfully
- `400`: Invalid title parameter

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule, isResponseOk, isResponseError } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Set title
try {
  const response = await containerModule.setTitle('Home');

  if (isResponseError(response)) {
    console.log('Could not set title:', response.error);
  } else if (isResponseOk(response)) {
    console.log('Title set successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### showBackButton()

> **showBackButton**(): `Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

Show the back button on the container header.

#### Returns

`Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

A promise that resolves to a `200` status code when the back button is shown.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule, isResponseOk } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Show back button
try {
  const response = await containerModule.showBackButton();

  if (isResponseOk(response)) {
    console.log('Back button shown successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### showLoader()

> **showLoader**(): `Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

Show the full-screen loading indicator.

#### Returns

`Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

A promise that resolves to a `200` status code when the loading indicator is displayed.

#### Remarks

Remember to call [ContainerModule.hideLoader](#hideloader) when the operation completes.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule, isResponseOk } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Show loader
try {
  const response = await containerModule.showLoader();

  if (isResponseOk(response)) {
    console.log('Loader shown successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### showRefreshButton()

> **showRefreshButton**(): `Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

Show the refresh button on the container header.

#### Returns

`Promise`\<[`BridgeStatusCode200Response`](../type-aliases/BridgeStatusCode200Response.md)\<`void`\>\>

A promise that resolves to a `200` status code when the refresh button is shown.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule, isResponseOk } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule, isResponseOk } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Show refresh button
try {
  const response = await containerModule.showRefreshButton();

  if (isResponseOk(response)) {
    console.log('Refresh button shown successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```
