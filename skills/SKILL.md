---
name: 'grabjs-superapp-sdk'
description: 'API reference for `@grabjs/superapp-sdk`. Use when building a MiniApp that runs in the Grab SuperApp WebView and needs to call native features (camera, payments, authorization, authentication, permission, location, device storage, container UI customization) via the Grab `JSBridge`. Keywords: miniapp, webview, android, ios, jsbridge, grab, superapp.'
license: 'MIT'
---

# @grabjs/superapp-sdk

Use this SDK to call native Grab SuperApp features from a MiniApp running in the WebView. Each module covers one domain (camera, payments, location, etc.) and communicates with the native layer via `JSBridge`.


### Installation

Install `@grabjs/superapp-sdk` with your package manager of choice.

#### ES Modules (recommended)

Import only the modules you need:

Type guards and response types are also available as named exports:

#### CDN (UMD Bundle)

If you are not using a bundler, load the SDK from a CDN and access it via the `SuperAppSDK` global.
**Always pin to a specific version** (e.g., `@x.y.z`) — omitting the version always fetches the latest release, which may contain breaking changes.

## Core Concepts

SDK methods communicate with the native Grab SuperApp layer via `JSBridge`. They only work when your page is running inside the **Grab SuperApp WebView**. Calling a method outside that environment returns `{ status_code: 501 }`.

### Response Pattern

Every SDK method returns a response object with an HTTP-style `status_code`. SDK methods never throw — use type guards instead of try/catch.

### Status Codes

The SDK uses HTTP-style status codes for all responses:

| Code  | Type              | Description                                            |
| :---- | :---------------- | :----------------------------------------------------- |
| `200` | OK                | Request successful, `result` contains response data    |
| `204` | No Content        | Request successful, no data returned                   |
| `302` | Redirect          | Redirect in progress                                   |
| `400` | Bad Request       | Invalid request parameters                             |
| `401` | Unauthorized      | Authentication required                                |
| `403` | Forbidden         | Method requires a scope the client hasn't been granted |
| `404` | Not Found         | Resource not found                                     |
| `424` | Failed Dependency | Underlying native request failed                       |
| `426` | Upgrade Required  | Grab app version too old                               |
| `500` | Internal Error    | Unexpected SDK error                                   |
| `501` | Not Implemented   | Outside Grab SuperApp environment                      |

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

### Streams

Some modules provide streaming methods for real-time data (location updates, media events). Subscribe to receive values over time:

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

You can verify permissions either proactively before calling a method, or reactively by handling errors.

##### Proactive Checking

Proactively verify if the current session has the necessary permissions for a method using `ScopeModule.hasAccessTo()`. This is recommended before calling gated methods, as users can revoke permissions at any time via the Grab app settings.

##### Reactive Checking (Handling 403 Forbidden)

Some methods require specific permissions. If the user hasn't granted the required scope, the method returns `403`. You must request authorization and reload scopes before retrying:

1. Call `IdentityModule.authorize()` to request the scope.
2. Call `ScopeModule.reloadScopes()` to refresh the SDK's internal permission state.
3. Retry the original method call.

## Integration Guide

This guide covers the recommended setup for a MiniApp entry point — loading scopes, configuring the container UI, signalling readiness, and handling permissions.

> **Note:** The [`demo`](https://github.com/grab/superapp-sdk/tree/master/demo) folder contains two complete MiniApp samples demonstrating these integration patterns in action — one using CDN (vanilla HTML/JS) and one using React. Both implement the same user flow: OAuth authorization, user profile display, deferred location permissions, and checkout payment.

### Initialization

Follow these steps when your MiniApp launches to configure the container, authenticate the user, and track the entry event.

### Authentication

Trigger `IdentityModule.authorize()` to start the authorization process and request user permissions.

When authorization completes with `status_code: 200` (native `in_place` flow), `response.result` already includes `code`, `state`, and the PKCE values (`codeVerifier`, `nonce`, `redirectUri`), so you do not need `getAuthorizationArtifacts()`.

If the flow uses the web redirect instead (`status_code: 302`), the page navigates away; after the redirect lands on your callback URL, read the `code` from the query string and retrieve the stored PKCE artifacts with `IdentityModule.getAuthorizationArtifacts()`.

In either case, send those values to your backend so it can exchange the authorization code for tokens, validate the `id_token`, fetch user info, and establish the user's session.

After the session is established, call `IdentityModule.clearAuthorizationArtifacts()` and `ScopeModule.reloadScopes()` so your MiniApp can begin using the newly granted permissions.

Use `isRedirection` for `302`: that branch is separate from `isSuccess`, which only matches `200` and `204` for `authorize()`.

### Container UI & Navigation

Control the native container's appearance and behavior to match your MiniApp's branding and navigation flow.

#### Title and Background

Set the title and background color for the native container.

#### Back and Refresh Buttons

Hide these buttons when your MiniApp manages its own navigation or requires a focused, non-refreshable view. Restore them when appropriate.

#### Closing the MiniApp

Programmatically close the MiniApp and return the user to the Grab SuperApp.

### Opening External Links

Use `ContainerModule.openExternalLink()` to open URLs in the system browser instead of navigating away from the MiniApp WebView.

### Analytics Event Tracking

Track user interactions to monitor performance and conversion. Events are categorised by journey stage using `ContainerAnalyticsEventState`.

#### Journey Stages

| State                | Description                                      |
| :------------------- | :----------------------------------------------- |
| `HOMEPAGE`           | Entry point or main landing page.                |
| `CHECKOUT_PAGE`      | Transaction confirmation or payment selection.   |
| `BOOKING_COMPLETION` | Post-transaction or success page.                |
| `CUSTOM`             | Any other interaction outside the standard flow. |

#### Best Practices

- Track system events automatically when users navigate to the corresponding pages.
- Always include required data fields for transaction events to enable accurate revenue tracking.
- Use descriptive names for custom events that clearly indicate the user action being tracked.
- Never include Personally Identifiable Information (PII) in event data.

### Checkout

The checkout flow is a two-step process: your backend first initializes a transaction using your partner credentials, then your frontend triggers the native payment interface using the response from your backend.

For the complete API reference, see [GrabPay API](https://developer.grab.com/docs/partner-apps/pages/developer-resources/payment/) and [CheckoutModule](https://grab.github.io/superapp-sdk/classes/CheckoutModule.html).


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
| `LoyaltyModule` | SDK module for Loyalty features via `JSBridge`. | `references/LoyaltyModule.md` |
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
