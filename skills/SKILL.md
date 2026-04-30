---
name: 'grabjs-superapp-sdk'
description: 'API reference for @grabjs/superapp-sdk. Use when building a MiniApp that runs in the Grab SuperApp WebView and needs to call native features (camera, payments, authorization, authentication, permission, location, device storage, container UI customization) via the Grab JSBridge. Keywords: miniapp, webview, android, ios, jsbridge, grab, superapp.'
license: 'MIT'
---

# @grabjs/superapp-sdk

Use this SDK to call native Grab SuperApp features from a MiniApp running in the WebView. Each module covers one domain (camera, payments, location, etc.) and communicates with the native layer via JSBridge.

## Setup

### Installation

#### NPM

```bash
npm install @grabjs/superapp-sdk
```

#### Yarn

```bash
yarn add @grabjs/superapp-sdk
```

### Importing

#### ES Modules (recommended)

Import only the modules you need:

```typescript
import { ContainerModule, ScopeModule } from '@grabjs/superapp-sdk';
```

Type guards and response types are also available as named exports:

```typescript
import { isSuccess, isError } from '@grabjs/superapp-sdk';
```

#### CDN (UMD Bundle)

If you are not using a bundler, load the SDK from a CDN and access it via the `SuperAppSDK` global:

```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const { ContainerModule, ScopeModule, isSuccess, isError } = window.SuperAppSDK;
</script>
```


## Core Concepts

SDK methods communicate with the native Grab SuperApp via JSBridge. They only work when your page is running inside the **Grab SuperApp WebView**. Calling a method outside that environment returns `{ status_code: 501 }`.

### Response Pattern

Every SDK method returns a bridge response object with an HTTP-style `status_code`. SDK methods never throw — use type guards instead of try/catch.

```typescript
import { ProfileModule, isSuccess, isError } from '@grabjs/superapp-sdk';

const profile = new ProfileModule();
const response = await profile.fetchEmail();

if (isSuccess(response)) {
  console.log('Result:', response.result);
} else if (isError(response)) {
  switch (response.status_code) {
    case 403:
      // Missing OAuth scope - call IdentityModule.authorize() then ScopeModule.reloadScopes()
      break;
    case 426:
      // Grab app version too old - prompt user to update their app
      break;
    default:
      console.error(`Error ${response.status_code}: ${response.error}`);
  }
}
```

### Status Codes

The SDK uses HTTP-style status codes for all responses:

| Code  | Type              | Description                                                 |
| :---- | :---------------- | :---------------------------------------------------------- |
| `200` | OK                | Request successful, `result` contains response data         |
| `204` | No Content        | Request successful, no data returned                        |
| `302` | Redirect          | Redirect in progress                                        |
| `400` | Bad Request       | Invalid request parameters                                  |
| `401` | Unauthorized      | Authentication required                                     |
| `403` | Forbidden         | Insufficient permission (see `@requiredOAuthScope` tag)     |
| `404` | Not Found         | Resource not found                                          |
| `424` | Failed Dependency | Underlying native request failed                            |
| `426` | Upgrade Required  | Grab app version too old (see `@minimumGrabAppVersion` tag) |
| `500` | Internal Error    | Unexpected SDK error                                        |
| `501` | Not Implemented   | Outside Grab SuperApp environment                           |

### Handling 403 Forbidden

Methods tagged with `@requiredOAuthScope` require specific permissions. If the user hasn't granted the required scope, the method returns `403`. You must request authorization and reload scopes before retrying:

1. Call `IdentityModule.authorize()` to request the scope.
2. Call `ScopeModule.reloadScopes()` to refresh the SDK's internal permission state.
3. Retry the original method call.

```typescript
import {
  LocationModule,
  IdentityModule,
  ScopeModule,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

const location = new LocationModule();
const identity = new IdentityModule();
const scope = new ScopeModule();

const response = await location.getCoordinate();

if (isError(response) && response.status_code === 403) {
  // 1. Request authorization for the required scope
  const auth = await identity.authorize({
    clientId: 'your-client-id',
    redirectUri: 'https://your-app.com/callback',
    scope: 'mobile.geolocation', // The scope defined in @requiredOAuthScope
    environment: 'production',
    responseMode: 'in_place',
  });

  if (isSuccess(auth)) {
    // 2. Reload scopes so the new permission is available
    await scope.reloadScopes();

    // 3. Retry the original call
    const retry = await location.getCoordinate();
    if (isSuccess(retry)) {
      console.log('Result:', retry.result);
    }
  }
}
```

### Type Guards

Type guards narrow the response type so TypeScript knows which fields are available:

| Guard                             | Matches                                  |
| --------------------------------- | ---------------------------------------- |
| `isSuccess(r)`                    | `200`, `204`                             |
| `isOk(r)`                         | `200`                                    |
| `isNoContent(r)`                  | `204`                                    |
| `isRedirection(r)` / `isFound(r)` | `302`                                    |
| `isClientError(r)`                | `400`, `401`, `403`, `404`, `424`, `426` |
| `isServerError(r)`                | `500`, `501`                             |
| `isError(r)`                      | any 4xx or 5xx                           |

```typescript
import { isSuccess, isOk, isNoContent, isError } from '@grabjs/superapp-sdk';

if (isSuccess(response)) {
  // narrow further if needed
  if (isOk(response)) console.log(response.result);
  if (isNoContent(response)) console.log('done, no data');
}

if (isError(response)) {
  // response.error: string is guaranteed here
  console.error(response.error);
}
```

### Streams

Some modules provide streaming methods for real-time data (location updates, media events). Subscribe to receive values over time:

```typescript
import { LocationModule, isSuccess } from '@grabjs/superapp-sdk';

const location = new LocationModule();

const subscription = location.observeLocationChange().subscribe({
  next: (response) => {
    if (isSuccess(response)) console.log(response.result);
  },
  complete: () => console.log('Stream ended'),
});

// Always unsubscribe when done to conserve battery and resources
subscription.unsubscribe();
```

You can also `await` a stream method directly to get its first value.


## Integration Guide

This guide covers the recommended setup for a MiniApp entry point — loading scopes, configuring the container UI, signalling readiness, and handling permissions.

### Entry Point Setup

Run these steps once when your MiniApp initialises, before rendering any content.

```typescript
import { ContainerModule, ScopeModule } from '@grabjs/superapp-sdk';

const container = new ContainerModule();
const scope = new ScopeModule();

async function init() {
  // 1. Load permission scopes — always do this first
  await scope.reloadScopes();

  // 2. Configure the container UI
  await container.setTitle('My MiniApp');
  await container.setBackgroundColor('#FFFFFF');
  await container.hideBackButton();

  // 3. Dismiss the native loader
  await container.hideLoader();
}

init();
```

#### Why `reloadScopes()` first?

Scopes are not loaded automatically. Any module call that requires a permission will return `403` until scopes are loaded. Always call `reloadScopes()` before making any other module calls.

### Handling Permissions

When a module call returns `403`, your app needs to request the required permission via `IdentityModule.authorize()`, then reload scopes before retrying.

```typescript
import { IdentityModule, ScopeModule, isSuccess, isError } from '@grabjs/superapp-sdk';

const identity = new IdentityModule();
const scope = new ScopeModule();

async function requestPermission() {
  const response = await identity.authorize({
    clientId: 'your-client-id',
    redirectUri: 'https://your-miniapp.example.com/callback',
    scope: 'required_scope',
    environment: 'production',
  });

  if (isSuccess(response)) {
    // Reload scopes after authorization so the new permission is available
    await scope.reloadScopes();
  } else if (isError(response)) {
    console.error('Authorization failed:', response.error);
  }
}
```

### Navigation

#### Controlling the back button

Hide the back button when your app manages its own navigation stack, and restore it when the user can safely go back:

```typescript
await container.hideBackButton();

// ... when the user can go back
await container.showBackButton();
```

#### Closing the MiniApp

```typescript
await container.close();
```

#### Opening external links

Use `openExternalLink` to open URLs in the system browser instead of navigating away from the WebView:

```typescript
const response = await container.openExternalLink('https://example.com');

if (isError(response)) {
  console.error('Failed to open link:', response.error);
}
```

### Analytics Event Tracking

Implement analytics events across your user journey to enable performance tracking and reporting. Events are sent via `ContainerModule.sendAnalyticsEvent()` and categorised by journey stage using `ContainerAnalyticsEventState`.

#### Required Events

##### Entry Point

###### Initiate action

Send the initiate event when users click call-to-action buttons to proceed:

```typescript
import {
  ContainerModule,
  ContainerAnalyticsEventState,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

// Event names are plain strings — define your own constants
const EventName = {
  INITIATE: 'INITIATE',
  TRANSACT: 'TRANSACT',
};

const containerModule = new ContainerModule();

// Send when the user clicks a call-to-action button
const response = await containerModule.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.HOMEPAGE,
  name: EventName.INITIATE,
});

if (isSuccess(response)) {
  // Event sent successfully
} else if (isError(response)) {
  console.error(`Failed to send event: ${response.error}`);
}
```

###### Custom interactions

Send custom events for additional interactions like banner clicks, category selections, or search queries. Include the `page` parameter and a descriptive event name:

```typescript
import {
  ContainerModule,
  ContainerAnalyticsEventState,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

const containerModule = new ContainerModule();

// Send for custom interactions such as banner clicks or category selections
const response = await containerModule.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.CUSTOM,
  name: 'BANNER_CLICK',
  data: {
    page: 'homepage',
    banner_id: 'promo-summer-2024',
    banner_position: 'top',
  },
});

if (isSuccess(response)) {
  // Event sent successfully
} else if (isError(response)) {
  console.error(`Failed to send event: ${response.error}`);
}
```

##### Conversion Point

###### Transaction confirmation

Send the transaction confirmation event when users click the final confirmation button:

```typescript
import {
  ContainerModule,
  ContainerAnalyticsEventState,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

// Event names are plain strings — define your own constants
const EventName = {
  INITIATE: 'INITIATE',
  TRANSACT: 'TRANSACT',
};

const containerModule = new ContainerModule();

// Send when the user clicks the final confirmation button
const response = await containerModule.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.CHECKOUT_PAGE,
  name: EventName.TRANSACT,
  data: {
    transaction_amount: 49.99,
    transaction_currency: 'SGD',
    transaction_id: 'TXN-2024-001234',
    payment_method: 'grabpay',
    item_count: 2,
  },
});

if (isSuccess(response)) {
  // Event sent successfully
} else if (isError(response)) {
  console.error(`Failed to send event: ${response.error}`);
}
```

###### Custom interactions

Send custom events for checkout interactions like promo code applications or payment method selections:

```typescript
import {
  ContainerModule,
  ContainerAnalyticsEventState,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

const containerModule = new ContainerModule();

// Send for custom checkout interactions such as promo code applications
const response = await containerModule.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.CUSTOM,
  name: 'PROMO_CODE_APPLIED',
  data: {
    page: 'checkout',
    promo_code: 'SAVE20',
    discount_amount: 10.0,
    discount_type: 'percentage',
  },
});

if (isSuccess(response)) {
  // Event sent successfully
} else if (isError(response)) {
  console.error(`Failed to send event: ${response.error}`);
}
```

##### Completion Point

###### Follow-up actions

Send custom events for post-transaction actions like downloading receipts or tracking orders:

```typescript
import {
  ContainerModule,
  ContainerAnalyticsEventState,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

const containerModule = new ContainerModule();

// Send for post-transaction actions such as downloading a receipt
const response = await containerModule.sendAnalyticsEvent({
  state: ContainerAnalyticsEventState.CUSTOM,
  name: 'RECEIPT_DOWNLOAD',
  data: {
    page: 'completion',
    transaction_id: 'TXN-2024-001234',
    format: 'pdf',
  },
});

if (isSuccess(response)) {
  // Event sent successfully
} else if (isError(response)) {
  console.error(`Failed to send event: ${response.error}`);
}
```

#### Best Practices

- Initialize `ContainerModule` once and reuse it throughout your application to optimize performance.
- Track system events automatically when users navigate to the corresponding pages.
- Always include required data fields for transaction events to enable accurate revenue tracking.
- Use descriptive names for custom events that clearly indicate the user action being tracked.
- Never include Personally Identifiable Information (PII) in event data.


## API Reference

### Classes

#### `CameraModule`
JSBridge module for accessing the device camera.
- `scanQRCode(request: { title?: string }): Promise<{ result: { qrCode: string }; status_code: 200 } | { status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Opens the native camera to scan a QR code.

#### `CheckoutModule`
JSBridge module for triggering native payment flows.
- `triggerCheckout(request: Record<string, unknown>): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { status: "success"; transactionID: string } | { errorCode: string; errorMessage: string; status: "failure"; transactionID: string } | { status: "pending"; transactionID: string } | { status: "userInitiatedCancel" }; status_code: 200 }>` — Triggers the native checkout flow for payment processing. (**OAuth Scope:** mobile.checkout)

#### `ContainerModule`
JSBridge module for controlling the WebView container.
- `close(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Close the container and return to the previous screen.
- `getSessionParams(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: string; status_code: 200 }>` — Get the session parameters from the container.
- `hideBackButton(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Hide the back button on the container header.
- `hideLoader(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Hide the full-screen loading indicator.
- `hideRefreshButton(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Hide the refresh button on the container header.
- `isConnected(): Promise<{ result: { connected: boolean }; status_code: 200 } | { error: string; status_code: 404 }>` — Check if the web app is connected to the Grab SuperApp via JSBridge.
- `onContentLoaded(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: boolean; status_code: 200 }>` — Notify the Grab SuperApp that the page content has loaded.
- `onCtaTap(request: string): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: boolean; status_code: 200 }>` — Notify the client that the user has tapped a call-to-action (CTA).
- `openExternalLink(request: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Open a link in the external browser.
- `sendAnalyticsEvent(request: { data?: Record<string, unknown>; name: string; state: string }): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Use this method to track user interactions and page transitions.
- `setBackgroundColor(request: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Set the background color of the container header.
- `setTitle(request: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Set the title of the container header.
- `showBackButton(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Show the back button on the container header.
- `showLoader(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Show the full-screen loading indicator.
- `showRefreshButton(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Show the refresh button on the container header.

#### `DeviceModule`
JSBridge module for querying native device information.
- `isEsimSupported(): Promise<{ error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: boolean; status_code: 200 }>` — Checks whether the current device supports eSIM.

#### `FileModule`
JSBridge module for downloading files to the user's device.
- `downloadFile(request: { fileName: string; fileUrl: string }): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Downloads a file via the native bridge.

#### `IdentityModule`
JSBridge module for authenticating users via GrabID.
- `authorize(request: { clientId: string; environment: "staging" | "production"; redirectUri: string; responseMode?: "redirect" | "in_place"; scope: string }): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { code: string; state: string }; status_code: 200 } | { status_code: 302 }>` — Initiates an OAuth2 authorization flow with PKCE (Proof Key for Code Exchange).
This method handles both native in-app consent and web-based fallback flows.
- `clearAuthorizationArtifacts(): Promise<{ status_code: 204 }>` — Clears all stored PKCE authorization artifacts from local storage.
This should be called after a successful token exchange or when you need to
reset the authorization state (e.g., on error or logout).
- `getAuthorizationArtifacts(): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { result: { codeVerifier: string; nonce: string; redirectUri: string; state: string }; status_code: 200 }>` — Retrieves stored PKCE authorization artifacts from local storage.
These artifacts are used to complete the OAuth2 authorization code exchange.

#### `LocaleModule`
JSBridge module for accessing device locale settings.
- `getLanguageLocaleIdentifier(): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: string; status_code: 200 }>` — Retrieves the current language locale identifier from the device.

#### `LocationModule`
JSBridge module for accessing device location services.
- `getCoordinate(): Promise<{ error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { latitude: number; longitude: number }; status_code: 200 } | { error: string; status_code: 424 }>` — Get the current geographic coordinates of the device. (**OAuth Scope:** mobile.geolocation)
- `getCountryCode(): Promise<{ status_code: 204 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: string; status_code: 200 } | { error: string; status_code: 424 }>` — Get the country code based on the device's current location. (**OAuth Scope:** mobile.geolocation)
- `observeLocationChange(): ObserveLocationChangeResponse` — Subscribe to location change updates from the device. (**OAuth Scope:** mobile.geolocation)

#### `Logger`
Provides scoped logging for SDK modules.

#### `MediaModule`
JSBridge module for playing DRM-protected media content.
- `observePlayDRMContent(data: DRMContentConfig): ObserveDRMPlaybackResponse` — Observes DRM-protected media content playback events. (**OAuth Scope:** mobile.media)
- `playDRMContent(data: DRMContentConfig): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { length: number; position: number; titleId: string; type: "START_PLAYBACK" | "PROGRESS_PLAYBACK" | "START_SEEK" | "STOP_SEEK" | "STOP_PLAYBACK" | "CLOSE_PLAYBACK" | "PAUSE_PLAYBACK" | "RESUME_PLAYBACK" | "FAST_FORWARD_PLAYBACK" | "REWIND_PLAYBACK" | "ERROR_PLAYBACK" | "CHANGE_VOLUME" }; status_code: 200 }>` — Plays DRM-protected media content in the native media player. (**OAuth Scope:** mobile.media)

#### `NetworkModule`
JSBridge module for making network requests via the native bridge.
- `send(request: { body?: unknown; endpoint: string; headers?: Record<string, string>; method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"; query?: Record<string, string>; timeout?: number }): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 404 } | { error: string; status_code: 424 } | { result: Record<string, unknown>; status_code: 200 } | { error: string; status_code: 401 } | { error: string; status_code: 426 }>` — Sends a network request via the native bridge.

#### `PlatformModule`
JSBridge module for controlling platform navigation.
- `back(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Triggers the native platform back navigation.
This navigates back in the native navigation stack.

#### `ProfileModule`
JSBridge module for accessing user profile information.
- `fetchEmail(): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 426 } | { result: { email: string }; status_code: 200 }>` — Fetches the user's email address from their Grab profile. (**OAuth Scope:** mobile.profile | **Minimum Grab App Version:** Android: 5.399.0, iOS: 5.399.0)
- `verifyEmail(request?: { email?: string; skipUserInput?: boolean }): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 426 } | { result: { email: string }; status_code: 200 }>` — Verifies the user's email address by triggering email capture bottom sheet and OTP verification. (**OAuth Scope:** mobile.profile | **Minimum Grab App Version:** Android: 5.399.0, iOS: 5.399.0)

#### `ScopeModule`
JSBridge module for checking and refreshing API access permissions.
- `hasAccessTo(module: string, method: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: boolean; status_code: 200 } | { error: string; status_code: 424 }>` — Checks if the current client has access to a specific JSBridge API method.
- `reloadScopes(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Requests to reload the consented OAuth scopes for the current client.
This refreshes the permissions from the server.

#### `SplashScreenModule`
JSBridge module for controlling the native splash / Lottie loading screen.
- `dismiss(): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Dismisses the native splash (Lottie) loading view if it is presented.

#### `StorageModule`
JSBridge module for persisting key-value data to native storage.
- `getBoolean(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { value: boolean | null }; status_code: 200 }>` — Retrieves a boolean value from the native storage. (**OAuth Scope:** mobile.storage)
- `getDouble(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { value: number | null }; status_code: 200 }>` — Retrieves a double (floating point) value from the native storage. (**OAuth Scope:** mobile.storage)
- `getInt(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { value: number | null }; status_code: 200 }>` — Retrieves an integer value from the native storage. (**OAuth Scope:** mobile.storage)
- `getString(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { value: string | null }; status_code: 200 }>` — Retrieves a string value from the native storage. (**OAuth Scope:** mobile.storage)
- `remove(key: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Removes a single value from the native storage by key. (**OAuth Scope:** mobile.storage)
- `removeAll(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Removes all values from the native storage. (**OAuth Scope:** mobile.storage)
- `setBoolean(key: string, value: boolean): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Stores a boolean value in the native storage. (**OAuth Scope:** mobile.storage)
- `setDouble(key: string, value: number): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Stores a double (floating point) value in the native storage. (**OAuth Scope:** mobile.storage)
- `setInt(key: string, value: number): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Stores an integer value in the native storage. (**OAuth Scope:** mobile.storage)
- `setString(key: string, value: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Stores a string value in the native storage. (**OAuth Scope:** mobile.storage)

#### `SystemWebViewKitModule`
JSBridge module for opening URLs in the device's system browser.
- `redirectToSystemWebView(request: { url: string }): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: string; status_code: 200 } | { error: string; status_code: 424 }>` — Opens a URL in the device's system web browser or web view.

#### `UserAttributesModule`
JSBridge module for reading user-related attributes from native code.
- `getSelectedTravelDestination(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: string; status_code: 200 }>` — Returns the currently selected travel destination as a lowercase ISO 3166-1 alpha-2 country code.

### Functions

#### `hasResult`
Type guard to check if a JSBridge response has a defined result (not null or undefined).
```ts
hasResult<T>(response: T): response is Extract<T, { result: {} }>
```

#### `isClientError`
Type guard to check if a JSBridge response is a client error (4xx status codes).
```ts
isClientError<T>(response: T): response is Extract<T, { status_code: 400 | 401 | 403 | 404 | 424 | 426 }>
```

#### `isError`
Type guard to check if a JSBridge response is an error (4xx or 5xx status codes).
```ts
isError<T>(response: T): response is Extract<T, { error: string }>
```

#### `isFound`
Type guard to check if a JSBridge response is a 302 Found redirect.
```ts
isFound<T>(response: T): response is Extract<T, { status_code: 302 }>
```

#### `isNoContent`
Type guard to check if a JSBridge response is a 204 No Content (operation succeeded with no result).
```ts
isNoContent<T>(response: T): response is Extract<T, { status_code: 204 }>
```

#### `isOk`
Type guard to check if a JSBridge response is a 200 OK (operation succeeded with a result).
```ts
isOk<T>(response: T): response is Extract<T, { status_code: 200 }>
```

#### `isRedirection`
Type guard to check if a JSBridge response is a redirect (status code 302).
```ts
isRedirection<T>(response: T): response is Extract<T, { status_code: 302 }>
```

#### `isServerError`
Type guard to check if a JSBridge response is a server error (5xx status codes).
```ts
isServerError<T>(response: T): response is Extract<T, { status_code: 500 | 501 }>
```

#### `isSuccess`
Type guard to check if a JSBridge response is successful (2xx status codes).
```ts
isSuccess<T>(response: T): response is Extract<T, { status_code: 200 | 204 }>
```