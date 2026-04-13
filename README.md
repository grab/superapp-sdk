## Overview

The SuperApp SDK enables web developers to build MiniApps that run within the Grab SuperApp WebView. It provides a type-safe bridge for communication between web applications and native Android/iOS capabilities.

Each module encapsulates a specific domain of functionality, offering strongly-typed APIs with consistent response patterns.

### Key Features

- **Type-Safe APIs** — Full TypeScript support with comprehensive type definitions
- **Modular Architecture** — Import only the modules you need
- **Consistent Response Pattern** — All methods return standardized bridge responses with HTTP-style status codes
- **Streaming Support** — Real-time data streams for location updates and media events
- **Automatic Fallbacks** — Graceful degradation when native features are unavailable

## Available Modules

- **[CameraModule](https://grab.github.io/superapp-sdk/classes/CameraModule.html)** — Access device camera capabilities for QR code scanning

- **[CheckoutModule](https://grab.github.io/superapp-sdk/classes/CheckoutModule.html)** — Trigger native checkout flows for payment processing

- **[ContainerModule](https://grab.github.io/superapp-sdk/classes/ContainerModule.html)** — Control the WebView container UI and lifecycle (header, loading indicators, analytics, connection verification)

- **[DeviceCapabilityModule](https://grab.github.io/superapp-sdk/classes/DeviceCapabilityModule.html)** — Query device hardware capabilities

- **[FileModule](https://grab.github.io/superapp-sdk/classes/FileModule.html)** — Handle file operations including downloading from remote URLs

- **[IdentityModule](https://grab.github.io/superapp-sdk/classes/IdentityModule.html)** — Authenticate users via GrabID OAuth2/OIDC with PKCE support

- **[LocaleModule](https://grab.github.io/superapp-sdk/classes/LocaleModule.html)** — Access device locale and localization settings

- **[LocationModule](https://grab.github.io/superapp-sdk/classes/LocationModule.html)** — Access device location services and subscribe to location updates

- **[MediaModule](https://grab.github.io/superapp-sdk/classes/MediaModule.html)** — Handle media playback including DRM-protected content

- **[PlatformModule](https://grab.github.io/superapp-sdk/classes/PlatformModule.html)** — Access platform information and navigation controls

- **[ProfileModule](https://grab.github.io/superapp-sdk/classes/ProfileModule.html)** — Access user profile information including email

- **[ScopeModule](https://grab.github.io/superapp-sdk/classes/ScopeModule.html)** — Manage permission scopes from GrabID

- **[SplashScreenModule](https://grab.github.io/superapp-sdk/classes/SplashScreenModule.html)** — Control the native splash/loading screen

- **[StorageModule](https://grab.github.io/superapp-sdk/classes/StorageModule.html)** — Persist key-value data locally with type-safe storage

- **[SystemWebViewKitModule](https://grab.github.io/superapp-sdk/classes/SystemWebViewKitModule.html)** — Handle system WebView operations and external browser redirections

- **[UserAttributesModule](https://grab.github.io/superapp-sdk/classes/UserAttributesModule.html)** — Access user attribute data

## Documentation

- [Setup Guide](https://grab.github.io/superapp-sdk/documents/Setup.html) — installation, importing, environment requirements
- [Core Concepts](https://grab.github.io/superapp-sdk/documents/Core_Concepts.html) — response pattern, status codes, type guards
- [Integration Guide](https://grab.github.io/superapp-sdk/documents/Integration_Guide.html) — initialization sequence, permission handling, navigation
- [AI-Assisted Development](https://grab.github.io/superapp-sdk/documents/AI-Assisted_Development.html) — using AI skills for faster development
