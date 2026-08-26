---
name: 'grabjs-superapp-sdk'
description: 'API reference for `@grabjs/superapp-sdk`. Use when building a MiniApp that runs in the Grab SuperApp WebView and needs to call native features (camera, payments, authorization, authentication, permission, location, device storage, container UI customization) via the Grab `JSBridge`. Keywords: miniapp, webview, android, ios, jsbridge, grab, superapp.'
license: 'MIT'
---

# @grabjs/superapp-sdk

Use this SDK to call native Grab SuperApp features from a MiniApp running in the WebView. Each module covers one domain (camera, payments, location, etc.) and communicates with the native layer via `JSBridge`.


## Guides

| Guide | File |
| :--- | :--- |
| Setup | `guides/setup.md` |
| Core Concepts | `guides/concepts.md` |
| Integration Guide | `guides/integration.md` |


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
