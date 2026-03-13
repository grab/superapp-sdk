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

Confirmation that the container is closing.

#### Example

**Simple usage**
```typescript
// Initialize the container module
const containerModule = new ContainerModule();

// Close the container
const response = await containerModule.close();

switch (response.status_code) {
  case 200:
    console.log('Container closed successfully');
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
}
```

***

### getSessionParams()

> **getSessionParams**(): `Promise`\<[`GetSessionParamsResponse`](../type-aliases/GetSessionParamsResponse.md)\>

Get the session parameters from the container.

#### Returns

`Promise`\<[`GetSessionParamsResponse`](../type-aliases/GetSessionParamsResponse.md)\>

The session parameters as a JSON string that can be parsed into an object.

#### Remarks

The native layer returns session parameters as a JSON string.
Parse with `JSON.parse(result.result)` to use as an object.
Session parameters can contain primitives, base64 encoded strings, or nested objects.

#### Example

**Simple usage**
```typescript
// Initialize the container module
const containerModule = new ContainerModule();

// Get session parameters
const response = await containerModule.getSessionParams();

switch (response.status_code) {
  case 200: {
    const sessionParams = JSON.parse(response.result?.result || '{}');
    console.log('Session params retrieved:', sessionParams);
    break;
  }
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
}
```

***

### hideBackButton()

> **hideBackButton**(): `Promise`\<[`HideBackButtonResponse`](../type-aliases/HideBackButtonResponse.md)\>

Hide the back button on the container header.

#### Returns

`Promise`\<[`HideBackButtonResponse`](../type-aliases/HideBackButtonResponse.md)\>

Confirmation that the back button is now hidden.

#### Example

**Simple usage**
```typescript
// Initialize the container module
const containerModule = new ContainerModule();

// Hide back button
const response = await containerModule.hideBackButton();

switch (response.status_code) {
  case 200:
    console.log('Back button hidden successfully');
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
}
```

***

### hideLoader()

> **hideLoader**(): `Promise`\<[`HideLoaderResponse`](../type-aliases/HideLoaderResponse.md)\>

Hide the full-screen loading indicator.

#### Returns

`Promise`\<[`HideLoaderResponse`](../type-aliases/HideLoaderResponse.md)\>

Confirmation that the loader is now hidden.

#### Remarks

Should be called when the entry point has finished loading.

#### Example

**Simple usage**
```typescript
// Initialize the container module
const containerModule = new ContainerModule();

// Hide loader
const response = await containerModule.hideLoader();

switch (response.status_code) {
  case 200:
    console.log('Loader hidden successfully');
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
}
```

***

### hideRefreshButton()

> **hideRefreshButton**(): `Promise`\<[`HideRefreshButtonResponse`](../type-aliases/HideRefreshButtonResponse.md)\>

Hide the refresh button on the container header.

#### Returns

`Promise`\<[`HideRefreshButtonResponse`](../type-aliases/HideRefreshButtonResponse.md)\>

Confirmation that the refresh button is now hidden.

#### Example

**Simple usage**
```typescript
// Initialize the container module
const containerModule = new ContainerModule();

// Hide refresh button
const response = await containerModule.hideRefreshButton();

switch (response.status_code) {
  case 200:
    console.log('Refresh button hidden successfully');
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
}
```

***

### isConnected()

> **isConnected**(): `Promise`\<[`IsConnectedResponse`](../type-aliases/IsConnectedResponse.md)\>

Check if the web app is connected to the Grab SuperApp via JSBridge.

#### Returns

`Promise`\<[`IsConnectedResponse`](../type-aliases/IsConnectedResponse.md)\>

The connection status, indicating whether the MiniApp is running inside the Grab SuperApp.

#### Remarks

Call this method to verify the connection status before using other features.

#### Example

**Simple usage**
```typescript
// Initialize the container module
const containerModule = new ContainerModule();

// Check connection status
const response = await containerModule.isConnected();

switch (response.status_code) {
  case 200:
    console.log('Connected to Grab SuperApp');
    break;
  case 404:
    console.log('Not connected to Grab SuperApp');
    break;
  default:
    console.log('Unexpected status code:', response);
}
```

***

### onContentLoaded()

> **onContentLoaded**(): `Promise`\<[`OnContentLoadedResponse`](../type-aliases/OnContentLoadedResponse.md)\>

Notify the Grab SuperApp that the page content has loaded.

#### Returns

`Promise`\<[`OnContentLoadedResponse`](../type-aliases/OnContentLoadedResponse.md)\>

Confirmation that the content loaded notification was sent.

#### Example

**Simple usage**
```typescript
// Initialize the container module
const containerModule = new ContainerModule();

// Notify content loaded
const response = await containerModule.onContentLoaded();

switch (response.status_code) {
  case 200:
    console.log('Content loaded notification sent successfully');
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
}
```

***

### onCtaTap()

> **onCtaTap**(`request`: `string`): `Promise`\<[`OnCtaTapResponse`](../type-aliases/OnCtaTapResponse.md)\>

Notify the client that the user has tapped a call-to-action (CTA).

#### Parameters

##### request

`string`

The action identifier for the CTA that was tapped.

#### Returns

`Promise`\<[`OnCtaTapResponse`](../type-aliases/OnCtaTapResponse.md)\>

Confirmation that the CTA tap was notified.

#### Example

**Simple usage**
```typescript
// Initialize the container module
const containerModule = new ContainerModule();

// Notify CTA tap
const response = await containerModule.onCtaTap('AV_LANDING_PAGE_CONTINUE');

switch (response.status_code) {
  case 200:
    console.log('CTA tap notified successfully');
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
}
```

***

### openExternalLink()

> **openExternalLink**(`request`: `string`): `Promise`\<[`OpenExternalLinkResponse`](../type-aliases/OpenExternalLinkResponse.md)\>

Open a link in the external browser.

#### Parameters

##### request

`string`

The URL to open in the external browser.

#### Returns

`Promise`\<[`OpenExternalLinkResponse`](../type-aliases/OpenExternalLinkResponse.md)\>

Confirmation of whether the external link was opened successfully.

#### Remarks

Call this method to open the specified URL in an external browser (outside of the Grab app).

#### Example

**Simple usage**
```typescript
// Initialize the container module
const containerModule = new ContainerModule();

// Open external link
const response = await containerModule.openExternalLink('https://grab.com');

switch (response.status_code) {
  case 200:
    console.log('External link opened successfully');
    break;
  case 400:
    console.log('Could not open external link:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```

***

### sendAnalyticsEvent()

> **sendAnalyticsEvent**(`request`: [`SendAnalyticsEventRequest`](../type-aliases/SendAnalyticsEventRequest.md)): `Promise`\<[`SendAnalyticsEventResponse`](../type-aliases/SendAnalyticsEventResponse.md)\>

Use this method to track user interactions and page transitions.

#### Parameters

##### request

[`SendAnalyticsEventRequest`](../type-aliases/SendAnalyticsEventRequest.md)

Analytics event details including state, name, and optional data.

#### Returns

`Promise`\<[`SendAnalyticsEventResponse`](../type-aliases/SendAnalyticsEventResponse.md)\>

Confirmation of whether the analytics event was sent successfully.

#### Remarks

You can use predefined constants to ensure consistency across the platform.

**Predefined Values:**
- **States:** [ContainerAnalyticsEventState](../variables/ContainerAnalyticsEventState.md)
- **Names:** [ContainerAnalyticsEventName](../variables/ContainerAnalyticsEventName.md)

#### Throws

Error when the JSBridge method fails unexpectedly.

#### See

[ContainerAnalyticsEventState](../variables/ContainerAnalyticsEventState.md), [ContainerAnalyticsEventName](../variables/ContainerAnalyticsEventName.md)

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import {
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
} from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const {
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
} = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Send analytics event
const response = await containerModule.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.HOMEPAGE,
  name: ContainerAnalyticsEventName.DEFAULT,
});

switch (response.status_code) {
  case 200:
    console.log('Analytics event sent successfully');
    break;
  case 400:
    console.log('Invalid analytics event parameters:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```

***

### setBackgroundColor()

> **setBackgroundColor**(`request`: `string`): `Promise`\<[`SetBackgroundColorResponse`](../type-aliases/SetBackgroundColorResponse.md)\>

Set the background color of the container header.

#### Parameters

##### request

`string`

The background color to set (hex format, e.g., '#ffffff').

#### Returns

`Promise`\<[`SetBackgroundColorResponse`](../type-aliases/SetBackgroundColorResponse.md)\>

Confirmation that the background color was set.

#### Example

**Simple usage**
```typescript
// Initialize the container module
const containerModule = new ContainerModule();

// Set background color
const response = await containerModule.setBackgroundColor('#ffffff');

switch (response.status_code) {
  case 200:
    console.log('Background color set successfully');
    break;
  case 400:
    console.log('Could not set background color:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```

***

### setTitle()

> **setTitle**(`request`: `string`): `Promise`\<[`SetTitleResponse`](../type-aliases/SetTitleResponse.md)\>

Set the title of the container header.

#### Parameters

##### request

`string`

The title text to display in the header.

#### Returns

`Promise`\<[`SetTitleResponse`](../type-aliases/SetTitleResponse.md)\>

Confirmation that the title was set.

#### Example

**Simple usage**
```typescript
// Initialize the container module
const containerModule = new ContainerModule();

// Set title
const response = await containerModule.setTitle('Home');

switch (response.status_code) {
  case 200:
    console.log('Title set successfully');
    break;
  case 400:
    console.log('Could not set title:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```

***

### showBackButton()

> **showBackButton**(): `Promise`\<[`ShowBackButtonResponse`](../type-aliases/ShowBackButtonResponse.md)\>

Show the back button on the container header.

#### Returns

`Promise`\<[`ShowBackButtonResponse`](../type-aliases/ShowBackButtonResponse.md)\>

Confirmation that the back button is now visible.

#### Example

**Simple usage**
```typescript
// Initialize the container module
const containerModule = new ContainerModule();

// Show back button
const response = await containerModule.showBackButton();

switch (response.status_code) {
  case 200:
    console.log('Back button shown successfully');
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
}
```

***

### showLoader()

> **showLoader**(): `Promise`\<[`ShowLoaderResponse`](../type-aliases/ShowLoaderResponse.md)\>

Show the full-screen loading indicator.

#### Returns

`Promise`\<[`ShowLoaderResponse`](../type-aliases/ShowLoaderResponse.md)\>

Confirmation that the loader is now visible.

#### Remarks

Remember to call [ContainerModule.hideLoader](#hideloader) when the operation completes.

#### Example

**Simple usage**
```typescript
// Initialize the container module
const containerModule = new ContainerModule();

// Show loader
const response = await containerModule.showLoader();

switch (response.status_code) {
  case 200:
    console.log('Loader shown successfully');
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
}
```

***

### showRefreshButton()

> **showRefreshButton**(): `Promise`\<[`ShowRefreshButtonResponse`](../type-aliases/ShowRefreshButtonResponse.md)\>

Show the refresh button on the container header.

#### Returns

`Promise`\<[`ShowRefreshButtonResponse`](../type-aliases/ShowRefreshButtonResponse.md)\>

Confirmation that the refresh button is now visible.

#### Example

**Simple usage**
```typescript
// Initialize the container module
const containerModule = new ContainerModule();

// Show refresh button
const response = await containerModule.showRefreshButton();

switch (response.status_code) {
  case 200:
    console.log('Refresh button shown successfully');
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
}
```
