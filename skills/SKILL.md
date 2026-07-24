---
name: 'grabjs-superapp-sdk'
description: 'API reference for `@grabjs/superapp-sdk`. Use when building a MiniApp that runs in the Grab SuperApp WebView and needs to call native features (camera, payments, authorization, authentication, permission, location, device storage, container UI customization) via the Grab `JSBridge`. Keywords: miniapp, webview, android, ios, jsbridge, grab, superapp.'
license: 'MIT'
---

# @grabjs/superapp-sdk

Use this SDK to call native Grab SuperApp features from a MiniApp running in the WebView. Each module covers one domain (camera, payments, location, etc.) and communicates with the native layer via `JSBridge`.


## Setup

### Installation

Install `@grabjs/superapp-sdk` with your package manager of choice.

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

If you are not using a bundler, load the SDK from a CDN and access it via the `SuperAppSDK` global.
**Always pin to a specific version** (e.g., `@x.y.z`) — omitting the version always fetches the latest release, which may contain breaking changes.

```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
<script>
  const { ContainerModule, ScopeModule, isSuccess, isError } = window.SuperAppSDK;
</script>
```

## Core Concepts

SDK methods communicate with the native Grab SuperApp layer via `JSBridge`. They only work when your page is running inside the **Grab SuperApp WebView**. Calling a method outside that environment returns `{ status_code: 501 }`.

### Response Pattern

Every SDK method returns a response object with an HTTP-style `status_code`. SDK methods never throw — use type guards instead of try/catch.

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

### Type Guards

Type guards narrow the response type so TypeScript knows which fields are available:

| Guard                             | Matches                                                |
| --------------------------------- | ------------------------------------------------------ |
| `isSuccess(r)`                    | `200`, `204`                                           |
| `isOk(r)`                         | `200`                                                  |
| `isNoContent(r)`                  | `204`                                                  |
| `isRedirection(r)` / `isFound(r)` | `302`                                                  |
| `isClientError(r)`                | `400`, `401`, `403`, `404`, `424`, `426`               |
| `isServerError(r)`                | `500`, `501`                                           |
| `isError(r)`                      | `400`, `401`, `403`, `404`, `424`, `426`, `500`, `501` |

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

### Scopes and Permissions

The SDK categorizes permissions into two distinct types based on their execution context:

#### Permission Types

- **Backend Scopes** (`openid`, `profile.read`, `phone`)
  - **Purpose**: Access protected resources and user data via your server.
  - **Flow**: Requires a backend token exchange after authorization to retrieve data.
- **Mobile Scopes** (`mobile.geolocation`, `mobile.checkout`)
  - **Purpose**: Access native device capabilities directly within the MiniApp.
  - **Flow**: Grants in-app permission immediately; no backend exchange is necessary.

#### Authorization Patterns

When designing your MiniApp, you can choose between two common patterns for requesting scopes:

- **Upfront Authorization**
  - Request all required scopes during app initialisation, typically alongside backend sign-in.
  - _Best for_: Core permissions essential for the app to function.
- **Deferred Authorization**
  - Request scopes only when the user triggers a specific feature that requires them.
  - _Best for_: Optional permissions (e.g., location) to improve user experience and build trust.

#### Permission Verification Strategies

A scope the user has already granted can be revoked again at any time from the Grab app's settings, so a
method tagged `@requiredOAuthScope` can return `403` even if you checked access moments earlier. Recovering
spans two modules, not one: call `IdentityModule.authorize()` to re-request the scope, then
`ScopeModule.reloadScopes()` to refresh the SDK's internal permission state, then retry the original call.
See `references/IdentityModule.md` for `authorize()`'s signature and `references/ScopeModule.md` for
`reloadScopes()`'s.

## Integration Guide

This guide covers the recommended setup for a MiniApp entry point — loading scopes, configuring the container UI, signalling readiness, and handling permissions.

> **Note:** The [`demo`](https://github.com/grab/superapp-sdk/tree/master/demo) folder contains two complete MiniApp samples demonstrating these integration patterns in action — one using CDN (vanilla HTML/JS) and one using React. Both implement the same user flow: OAuth authorization, user profile display, deferred location permissions, and checkout payment.

### Initialization

Follow these steps when your MiniApp launches to configure the container, authenticate the user, and track the entry event.

```typescript
import {
  ContainerModule,
  ScopeModule,
  ContainerAnalyticsEventState,
  isSuccess,
} from '@grabjs/superapp-sdk';

const container = new ContainerModule();
const scope = new ScopeModule();

async function init() {
  // 1. Verify the environment
  const connection = await container.isConnected();
  if (!isSuccess(connection) || !connection.result?.connected) {
    // Handle case where app is opened outside Grab SuperApp
    return;
  }

  // 2. Configure the container UI
  await container.setTitle('My MiniApp');
  await container.setBackgroundColor('#FFFFFF');
  await container.hideBackButton();
  await container.hideRefreshButton();

  // 3. Dismiss the native loader
  await container.hideLoader();

  // 4. Track app launch
  await container.sendAnalyticsEvent({
    state: ContainerAnalyticsEventState.HOMEPAGE,
    name: 'DEFAULT',
  });

  // 5. Authenticate the user
  // (Implementation detailed in the Authentication section below)
  await signIn();

  // 6. Load permission scopes — always do this before making module calls
  await scope.reloadScopes();
}

init();
```

### Authentication

Trigger `IdentityModule.authorize()` to request user permissions, then `IdentityModule.clearAuthorizationArtifacts()`
and `ScopeModule.reloadScopes()` once your backend has exchanged the result for a session. See
`references/IdentityModule.md` for the full request/response shapes (including the native `in_place` vs. web
`302` redirect flows) and `references/ScopeModule.md` for `reloadScopes()`.

### Container UI & Navigation

Configure the native container's title, background, and back/refresh buttons, and track analytics events, via
`ContainerModule` — see `references/ContainerModule.md` for every method and its parameters.

`sendAnalyticsEvent()`'s `state` parameter (`ContainerAnalyticsEventState`) categorizes the event by journey
stage: `HOMEPAGE` (entry point/main landing page), `CHECKOUT_PAGE` (transaction confirmation/payment
selection), `BOOKING_COMPLETION` (post-transaction/success page), or `CUSTOM` (any other interaction outside
the standard flow).

### Checkout

The checkout flow is a two-step process split across two systems: your **backend** first initializes a
transaction using your partner credentials against the
[GrabPay API](https://developer.grab.com/docs/partner-apps/pages/developer-resources/payment/), then your
**frontend** triggers the native payment interface with `CheckoutModule.triggerCheckout()`, passing the
response your backend returned. See `references/CheckoutModule.md` for the frontend call's exact signature.


## Module Index

| Module | Purpose | Reference file |
| :--- | :--- | :--- |
| `CameraModule` | SDK module for accessing the device camera via `JSBridge`. | `references/CameraModule.md` |
| `CheckoutModule` | SDK module for triggering native payment flows via `JSBridge`. | `references/CheckoutModule.md` |
| `ContainerModule` | SDK module for controlling the WebView container via `JSBridge`. | `references/ContainerModule.md` |
| `DeviceModule` | SDK module for querying native device information via `JSBridge`. | `references/DeviceModule.md` |
| `FileModule` | SDK module for downloading files to the user's device via `JSBridge`. | `references/FileModule.md` |
| `IdentityModule` | SDK module for authenticating users with GrabID via `JSBridge`. | `references/IdentityModule.md` |
| `LocaleModule` | SDK module for accessing device locale settings via `JSBridge`. | `references/LocaleModule.md` |
| `LocationModule` | SDK module for accessing device location services via `JSBridge`. | `references/LocationModule.md` |
| `Logger` | Provides scoped logging for SDK modules. | `references/Logger.md` |
| `MediaModule` | SDK module for playing DRM-protected media content via `JSBridge`. | `references/MediaModule.md` |
| `NetworkModule` | SDK module for making network requests through the native layer via `JSBridge`. | `references/NetworkModule.md` |
| `PlatformModule` | SDK module for controlling platform navigation via `JSBridge`. | `references/PlatformModule.md` |
| `ProfileModule` | SDK module for accessing user profile information via `JSBridge`. | `references/ProfileModule.md` |
| `ScopeModule` | SDK module for checking and refreshing API access permissions via `JSBridge`. | `references/ScopeModule.md` |
| `SplashScreenModule` | SDK module for controlling the native splash / Lottie loading screen via `JSBridge`. | `references/SplashScreenModule.md` |
| `StorageModule` | SDK module for persisting key-value data to native storage via `JSBridge`. | `references/StorageModule.md` |
| `SystemWebViewKitModule` | SDK module for opening URLs in the device's system browser via `JSBridge`. | `references/SystemWebViewKitModule.md` |
| `UserAttributesModule` | SDK module for reading user-related attributes from native code via `JSBridge`. | `references/UserAttributesModule.md` |

New modules automatically get their own reference file — no script or tag changes needed.


## Functions

Type guards for narrowing SDK response types (see Core Concepts → Type Guards for usage).

#### `hasResult`
Type guard to check if an SDK response has a `result` that is neither `null` nor `undefined`.
```ts
hasResult<T>(response: T): response is Extract<T, { result: {} }>
```

#### `isClientError`
Type guard to check if an SDK response has a client error status code (`400`, `401`, `403`, `404`, `424`, `426`).
```ts
isClientError<T>(response: T): response is Extract<T, { status_code: 400 | 401 | 403 | 404 | 424 | 426 }>
```

#### `isError`
Type guard to check if an SDK response has an error status code (`400`, `401`, `403`, `404`, `424`, `426`, `500`, `501`).
```ts
isError<T>(response: T): response is Extract<T, { error: string }>
```

#### `isFound`
Type guard to check if an SDK response has a `302` status code.
```ts
isFound<T>(response: T): response is Extract<T, { status_code: 302 }>
```

#### `isNoContent`
Type guard to check if an SDK response has a `204` status code.
```ts
isNoContent<T>(response: T): response is Extract<T, { status_code: 204 }>
```

#### `isOk`
Type guard to check if an SDK response has a `200` status code.
```ts
isOk<T>(response: T): response is Extract<T, { status_code: 200 }>
```

#### `isRedirection`
Type guard to check if an SDK response has a `302` status code.
```ts
isRedirection<T>(response: T): response is Extract<T, { status_code: 302 }>
```

#### `isServerError`
Type guard to check if an SDK response has a server error status code (`500`, `501`).
```ts
isServerError<T>(response: T): response is Extract<T, { status_code: 500 | 501 }>
```

#### `isSuccess`
Type guard to check if an SDK response has a success status code (`200`, `204`).
```ts
isSuccess<T>(response: T): response is Extract<T, { status_code: 200 | 204 }>
```
