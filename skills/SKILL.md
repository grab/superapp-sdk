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
import { CameraModule, isSuccess, isError } from '@grabjs/superapp-sdk';

const camera = new CameraModule();
const response = await camera.scanQRCode({ title: 'Scan Payment QR' });

if (isSuccess(response)) {
  switch (response.status_code) {
    case 200:
      console.log('QR Code scanned:', response.result.qrCode);
      break;
    case 204:
      // operation completed with no content
      break;
  }
} else if (isError(response)) {
  // response.error: string is guaranteed
  switch (response.status_code) {
    case 403:
      // call IdentityModule.authorize() then ScopeModule.reloadScopes() before retrying
      break;
    default:
      console.error(`Error ${response.status_code}: ${response.error}`);
  }
}
```

### Status Codes

The SDK uses HTTP-style status codes for all responses:

| Code  | Type              | Description                                         |
| ----- | ----------------- | --------------------------------------------------- |
| `200` | OK                | Request successful, `result` contains response data |
| `204` | No Content        | Request successful, no data returned                |
| `302` | Redirect          | Redirect in progress                                |
| `400` | Bad Request       | Invalid request parameters                          |
| `401` | Unauthorized      | Authentication required                             |
| `403` | Forbidden         | Insufficient permissions for this operation         |
| `404` | Not Found         | Resource not found                                  |
| `424` | Failed Dependency | Underlying native request failed                    |
| `426` | Upgrade Required  | Requires newer Grab app version                     |
| `500` | Internal Error    | Unexpected SDK error                                |
| `501` | Not Implemented   | Method requires Grab SuperApp environment           |

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


## API Reference

### Classes

#### `CameraModule`
JSBridge module for accessing the device camera.
- `scanQRCode(request: { title?: string }): Promise<{ result: { qrCode: string }; status_code: 200 } | { status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Opens the native camera to scan a QR code.

#### `CheckoutModule`
JSBridge module for triggering native payment flows.
- `triggerCheckout(request: Record<string, unknown>): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { status: "success"; transactionID: string } | { errorCode: string; errorMessage: string; status: "failure"; transactionID: string } | { status: "pending"; transactionID: string } | { status: "userInitiatedCancel" }; status_code: 200 }>` — Triggers the native checkout flow for payment processing.

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
- `getCoordinate(): Promise<{ error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: { latitude: number; longitude: number }; status_code: 200 } | { error: string; status_code: 424 }>` — Get the current geographic coordinates of the device.
- `getCountryCode(): Promise<{ status_code: 204 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { result: string; status_code: 200 } | { error: string; status_code: 424 }>` — Get the country code based on the device's current location.
- `observeLocationChange(): ObserveLocationChangeResponse` — Subscribe to location change updates from the device.

#### `Logger`
Provides scoped logging for SDK modules.

#### `MediaModule`
JSBridge module for playing DRM-protected media content.
- `observePlayDRMContent(data: DRMContentConfig): ObserveDRMPlaybackResponse` — Observes DRM-protected media content playback events.
- `playDRMContent(data: DRMContentConfig): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { length: number; position: number; titleId: string; type: "START_PLAYBACK" | "PROGRESS_PLAYBACK" | "START_SEEK" | "STOP_SEEK" | "STOP_PLAYBACK" | "CLOSE_PLAYBACK" | "PAUSE_PLAYBACK" | "RESUME_PLAYBACK" | "FAST_FORWARD_PLAYBACK" | "REWIND_PLAYBACK" | "ERROR_PLAYBACK" | "CHANGE_VOLUME" }; status_code: 200 }>` — Plays DRM-protected media content in the native media player.

#### `NetworkModule`
JSBridge module for making network requests via the native bridge.
- `send(request: { body?: unknown; endpoint: string; headers?: Record<string, string>; method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"; query?: Record<string, string>; timeout?: number }): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 404 } | { error: string; status_code: 424 } | { result: Record<string, unknown>; status_code: 200 } | { error: string; status_code: 401 } | { error: string; status_code: 426 }>` — Sends a network request via the native bridge.

#### `PlatformModule`
JSBridge module for controlling platform navigation.
- `back(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 }>` — Triggers the native platform back navigation.
This navigates back in the native navigation stack.

#### `ProfileModule`
JSBridge module for accessing user profile information.
- `fetchEmail(): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 426 } | { result: { email: string }; status_code: 200 }>` — Fetches the user's email address from their Grab profile.
- `verifyEmail(request?: { email?: string; skipUserInput?: boolean }): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 403 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 426 } | { result: { email: string }; status_code: 200 }>` — Verifies the user's email address by triggering email capture bottom sheet and OTP verification.

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
- `getBoolean(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { value: boolean | null }; status_code: 200 }>` — Retrieves a boolean value from the native storage.
- `getDouble(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { value: number | null }; status_code: 200 }>` — Retrieves a double (floating point) value from the native storage.
- `getInt(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { value: number | null }; status_code: 200 }>` — Retrieves an integer value from the native storage.
- `getString(key: string): Promise<{ error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 } | { result: { value: string | null }; status_code: 200 }>` — Retrieves a string value from the native storage.
- `remove(key: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Removes a single value from the native storage by key.
- `removeAll(): Promise<{ status_code: 204 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Removes all values from the native storage.
- `setBoolean(key: string, value: boolean): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Stores a boolean value in the native storage.
- `setDouble(key: string, value: number): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Stores a double (floating point) value in the native storage.
- `setInt(key: string, value: number): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Stores an integer value in the native storage.
- `setString(key: string, value: string): Promise<{ status_code: 204 } | { error: string; status_code: 400 } | { error: string; status_code: 500 } | { error: string; status_code: 501 } | { error: string; status_code: 424 }>` — Stores a string value in the native storage.

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