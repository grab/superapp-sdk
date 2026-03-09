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

> **close**(): [`CloseResponse`](../type-aliases/CloseResponse.md)

Close the container and return to the previous screen.

#### Returns

[`CloseResponse`](../type-aliases/CloseResponse.md)

Confirmation that the container is closing.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Close the container
try {
  const response = await containerModule.close();

  switch (response.status_code) {
    case 200:
      console.log('Container closed successfully');
      break;
    case 501:
      console.log('Not in Grab app:', response.error);
      break;
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### getSessionParams()

> **getSessionParams**(): [`GetSessionParamsResponse`](../type-aliases/GetSessionParamsResponse.md)

Get the session parameters from the container.

#### Returns

[`GetSessionParamsResponse`](../type-aliases/GetSessionParamsResponse.md)

The session parameters as a JSON string that can be parsed into an object.

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
import { ContainerModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Get session parameters
try {
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
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### hideBackButton()

> **hideBackButton**(): [`HideBackButtonResponse`](../type-aliases/HideBackButtonResponse.md)

Hide the back button on the container header.

#### Returns

[`HideBackButtonResponse`](../type-aliases/HideBackButtonResponse.md)

Confirmation that the back button is now hidden.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Hide back button
try {
  const response = await containerModule.hideBackButton();

  switch (response.status_code) {
    case 200:
      console.log('Back button hidden successfully');
      break;
    case 501:
      console.log('Not in Grab app:', response.error);
      break;
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### hideLoader()

> **hideLoader**(): [`HideLoaderResponse`](../type-aliases/HideLoaderResponse.md)

Hide the full-screen loading indicator.

#### Returns

[`HideLoaderResponse`](../type-aliases/HideLoaderResponse.md)

Confirmation that the loader is now hidden.

#### Remarks

Should be called when the entry point has finished loading.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Hide loader
try {
  const response = await containerModule.hideLoader();

  switch (response.status_code) {
    case 200:
      console.log('Loader hidden successfully');
      break;
    case 501:
      console.log('Not in Grab app:', response.error);
      break;
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### hideRefreshButton()

> **hideRefreshButton**(): [`HideRefreshButtonResponse`](../type-aliases/HideRefreshButtonResponse.md)

Hide the refresh button on the container header.

#### Returns

[`HideRefreshButtonResponse`](../type-aliases/HideRefreshButtonResponse.md)

Confirmation that the refresh button is now hidden.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Hide refresh button
try {
  const response = await containerModule.hideRefreshButton();

  switch (response.status_code) {
    case 200:
      console.log('Refresh button hidden successfully');
      break;
    case 501:
      console.log('Not in Grab app:', response.error);
      break;
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### isConnected()

> **isConnected**(): [`IsConnectedResponse`](../type-aliases/IsConnectedResponse.md)

Check if the web app is connected to the Grab SuperApp via JSBridge.

#### Returns

[`IsConnectedResponse`](../type-aliases/IsConnectedResponse.md)

The connection status, indicating whether the MiniApp is running inside the Grab SuperApp.

#### Remarks

Call this method to verify the connection status before using other features.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Check connection status
try {
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
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### onContentLoaded()

> **onContentLoaded**(): [`OnContentLoadedResponse`](../type-aliases/OnContentLoadedResponse.md)

Notify the Grab SuperApp that the page content has loaded.

#### Returns

[`OnContentLoadedResponse`](../type-aliases/OnContentLoadedResponse.md)

Confirmation that the content loaded notification was sent.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Notify content loaded
try {
  const response = await containerModule.onContentLoaded();

  switch (response.status_code) {
    case 200:
      console.log('Content loaded notification sent successfully');
      break;
    case 501:
      console.log('Not in Grab app:', response.error);
      break;
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### onCtaTap()

> **onCtaTap**(`request`: `string`): [`OnCtaTapResponse`](../type-aliases/OnCtaTapResponse.md)

Notify the client that the user has tapped a call-to-action (CTA).

#### Parameters

##### request

`string`

The action identifier for the CTA that was tapped.

#### Returns

[`OnCtaTapResponse`](../type-aliases/OnCtaTapResponse.md)

Confirmation that the CTA tap was notified.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Notify CTA tap
try {
  const response = await containerModule.onCtaTap('AV_LANDING_PAGE_CONTINUE');

  switch (response.status_code) {
    case 200:
      console.log('CTA tap notified successfully');
      break;
    case 501:
      console.log('Not in Grab app:', response.error);
      break;
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### openExternalLink()

> **openExternalLink**(`request`: `string`): [`OpenExternalLinkResponse`](../type-aliases/OpenExternalLinkResponse.md)

Open a link in the external browser.

#### Parameters

##### request

`string`

The URL to open in the external browser.

#### Returns

[`OpenExternalLinkResponse`](../type-aliases/OpenExternalLinkResponse.md)

Confirmation of whether the external link was opened successfully.

#### Remarks

Call this method to open the specified URL in an external browser (outside of the Grab app).

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Open external link
try {
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
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### sendAnalyticsEvent()

> **sendAnalyticsEvent**(`request`: [`SendAnalyticsEventRequest`](../type-aliases/SendAnalyticsEventRequest.md)): [`SendAnalyticsEventResponse`](../type-aliases/SendAnalyticsEventResponse.md)

Use this method to track user interactions and page transitions.

#### Parameters

##### request

[`SendAnalyticsEventRequest`](../type-aliases/SendAnalyticsEventRequest.md)

Analytics event details including state, name, and optional data.

#### Returns

[`SendAnalyticsEventResponse`](../type-aliases/SendAnalyticsEventResponse.md)

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
  ContainerModule,
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
} from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const {
  ContainerModule,
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
} = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Send analytics event
try {
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
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### setBackgroundColor()

> **setBackgroundColor**(`request`: `string`): [`SetBackgroundColorResponse`](../type-aliases/SetBackgroundColorResponse.md)

Set the background color of the container header.

#### Parameters

##### request

`string`

The background color to set (hex format, e.g., '#ffffff').

#### Returns

[`SetBackgroundColorResponse`](../type-aliases/SetBackgroundColorResponse.md)

Confirmation that the background color was set.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Set background color
try {
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
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### setTitle()

> **setTitle**(`request`: `string`): [`SetTitleResponse`](../type-aliases/SetTitleResponse.md)

Set the title of the container header.

#### Parameters

##### request

`string`

The title text to display in the header.

#### Returns

[`SetTitleResponse`](../type-aliases/SetTitleResponse.md)

Confirmation that the title was set.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Set title
try {
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
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### showBackButton()

> **showBackButton**(): [`ShowBackButtonResponse`](../type-aliases/ShowBackButtonResponse.md)

Show the back button on the container header.

#### Returns

[`ShowBackButtonResponse`](../type-aliases/ShowBackButtonResponse.md)

Confirmation that the back button is now visible.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Show back button
try {
  const response = await containerModule.showBackButton();

  switch (response.status_code) {
    case 200:
      console.log('Back button shown successfully');
      break;
    case 501:
      console.log('Not in Grab app:', response.error);
      break;
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### showLoader()

> **showLoader**(): [`ShowLoaderResponse`](../type-aliases/ShowLoaderResponse.md)

Show the full-screen loading indicator.

#### Returns

[`ShowLoaderResponse`](../type-aliases/ShowLoaderResponse.md)

Confirmation that the loader is now visible.

#### Remarks

Remember to call [ContainerModule.hideLoader](#hideloader) when the operation completes.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Show loader
try {
  const response = await containerModule.showLoader();

  switch (response.status_code) {
    case 200:
      console.log('Loader shown successfully');
      break;
    case 501:
      console.log('Not in Grab app:', response.error);
      break;
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### showRefreshButton()

> **showRefreshButton**(): [`ShowRefreshButtonResponse`](../type-aliases/ShowRefreshButtonResponse.md)

Show the refresh button on the container header.

#### Returns

[`ShowRefreshButtonResponse`](../type-aliases/ShowRefreshButtonResponse.md)

Confirmation that the refresh button is now visible.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ContainerModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ContainerModule } = window.SuperAppSDK;

// Initialize the container module
const containerModule = new ContainerModule();

// Show refresh button
try {
  const response = await containerModule.showRefreshButton();

  switch (response.status_code) {
    case 200:
      console.log('Refresh button shown successfully');
      break;
    case 501:
      console.log('Not in Grab app:', response.error);
      break;
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```
