---
name: 'grabjs-superapp-sdk'
description: 'API reference for `@grabjs/superapp-sdk`. Use when building a MiniApp that runs in the Grab SuperApp WebView and needs to call native features (camera, payments, authorization, authentication, permission, location, device storage, container UI customization) via the Grab `JSBridge`. Keywords: miniapp, webview, android, ios, jsbridge, grab, superapp.'
license: 'MIT'
---

# @grabjs/superapp-sdk

Use this SDK to call native Grab SuperApp features from a MiniApp running in the WebView. Each module covers one domain (camera, payments, location, etc.) and communicates with the native layer via `JSBridge`.


## Guides

| Guide | Contents | File |
| :--- | :--- | :--- |
| Setup | Installation and importing (ES Modules and CDN) | `references/guides/setup.md` |
| Core Concepts | Response pattern, status codes, type guards, streams, scopes and permissions | `references/guides/concepts.md` |
| Integration Guide | Initialization, authentication, container UI, external links, analytics event tracking, checkout flow | `references/guides/integration.md` |


## Module Index

| Module | Purpose | Reference file |
| :--- | :--- | :--- |
| `CameraModule` | SDK module for accessing the device camera via `JSBridge`. | `references/modules/CameraModule.md` |
| `CheckoutModule` | SDK module for triggering native payment flows via `JSBridge`. | `references/modules/CheckoutModule.md` |
| `ContainerModule` | SDK module for controlling the WebView container via `JSBridge`. | `references/modules/ContainerModule.md` |
| `DeviceModule` | SDK module for querying native device information via `JSBridge`. | `references/modules/DeviceModule.md` |
| `FileModule` | SDK module for downloading files to the user's device via `JSBridge`. | `references/modules/FileModule.md` |
| `IdentityModule` | SDK module for authenticating users with GrabID via `JSBridge`. | `references/modules/IdentityModule.md` |
| `LocaleModule` | SDK module for accessing device locale settings via `JSBridge`. | `references/modules/LocaleModule.md` |
| `LocationModule` | SDK module for accessing device location services via `JSBridge`. | `references/modules/LocationModule.md` |
| `LoyaltyModule` | SDK module for Loyalty features via `JSBridge`. | `references/modules/LoyaltyModule.md` |
| `MediaModule` | SDK module for playing DRM-protected media content via `JSBridge`. | `references/modules/MediaModule.md` |
| `NetworkModule` | SDK module for making network requests through the native layer via `JSBridge`. | `references/modules/NetworkModule.md` |
| `PlatformModule` | SDK module for controlling platform navigation via `JSBridge`. | `references/modules/PlatformModule.md` |
| `ProfileModule` | SDK module for accessing user profile information via `JSBridge`. | `references/modules/ProfileModule.md` |
| `ScopeModule` | SDK module for checking and refreshing API access permissions via `JSBridge`. | `references/modules/ScopeModule.md` |
| `SplashScreenModule` | SDK module for controlling the native splash / Lottie loading screen via `JSBridge`. | `references/modules/SplashScreenModule.md` |
| `StorageModule` | SDK module for persisting key-value data to native storage via `JSBridge`. | `references/modules/StorageModule.md` |
| `SystemWebViewKitModule` | SDK module for opening URLs in the device's system browser via `JSBridge`. | `references/modules/SystemWebViewKitModule.md` |
| `UserAttributesModule` | SDK module for reading user-related attributes from native code via `JSBridge`. | `references/modules/UserAttributesModule.md` |
