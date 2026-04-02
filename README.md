## Overview

The SuperApp SDK enables web developers to build MiniApps that run within the Grab SuperApp WebView. It provides a type-safe bridge for communication between web applications and native Android/iOS capabilities.

Each module encapsulates a specific domain of functionality, offering strongly-typed APIs with consistent response patterns.

### Key Features

- **Type-Safe APIs** — Full TypeScript support with comprehensive type definitions
- **Modular Architecture** — Import only the modules you need
- **Consistent Response Pattern** — All methods return standardized bridge responses with HTTP-style status codes
- **Streaming Support** — Real-time data streams for location updates and media events
- **Automatic Fallbacks** — Graceful degradation when native features are unavailable

## Installation

### NPM (ES Modules)

```bash
npm install @grabjs/superapp-sdk
```

```typescript
import { ContainerModule, LocationModule } from '@grabjs/superapp-sdk';
```

### CDN (UMD Bundle)

```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const { ContainerModule, LocationModule } = window.SuperAppSDK;
</script>
```

## Usage

### Basic Module Initialization

All modules are instantiated with a simple constructor call:

```typescript
import { ContainerModule, LocationModule, IdentityModule } from '@grabjs/superapp-sdk';

const container = new ContainerModule();
const location = new LocationModule();
const identity = new IdentityModule();
```

### Handling Responses

All SDK methods return a standardized response with HTTP-style status codes. Use type guards for response handling and type narrowing:

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
      console.log('Scanning cancelled');
      break;
  }
} else if (isError(response)) {
  switch (response.status_code) {
    case 403:
      console.error('Camera permission denied:', response.error);
      break;
    default:
      console.error('Request failed:', response.error);
  }
}
```

### Working with Streams

Some modules provide streaming methods for real-time data:

```typescript
import { LocationModule, isSuccess } from '@grabjs/superapp-sdk';

const location = new LocationModule();

const subscription = location.observeLocationChange().subscribe({
  next: (response) => {
    if (isSuccess(response)) {
      console.log('Location:', response.result);
    }
  },
  complete: () => {
    console.log('Stream ended');
  },
});

// Unsubscribe when done
subscription.unsubscribe();
```

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

> **Important:** Always call `ScopeModule.reloadScopes()` on MiniApp launch and after OAuth before accessing protected resources — scopes are not loaded automatically.

## Response Status Codes

The SDK uses HTTP-style status codes for all responses:

| Code  | Type              | Description                                         |
| ----- | ----------------- | --------------------------------------------------- |
| `200` | OK                | Request successful, `result` contains response data |
| `204` | No Content        | Request successful, no data returned                |
| `302` | Redirect          | OAuth redirect in progress                          |
| `400` | Bad Request       | Invalid request parameters                          |
| `401` | Unauthorized      | Authentication required                             |
| `403` | Forbidden         | Insufficient permissions for this operation         |
| `404` | Not Found         | Resource not found                                  |
| `424` | Failed Dependency | Underlying native request failed                    |
| `426` | Upgrade Required  | Requires newer Grab app version                     |
| `500` | Internal Error    | Unexpected SDK error                                |
| `501` | Not Implemented   | Method requires Grab SuperApp environment           |

## Type Guards

The SDK provides type guards for response narrowing:

```typescript
import {
  isSuccess,
  isError,
  isOk,
  isNoContent,
  isClientError,
  isServerError,
  isFound,
  isRedirection,
} from '@grabjs/superapp-sdk';

if (isSuccess(response)) {
  // 200 or 204 — use isOk() / isNoContent() to narrow further
}
if (isError(response)) {
  // response.error: string is guaranteed
  // use isClientError() / isServerError() to narrow further
}
if (isRedirection(response)) {
  // 302 — use isFound() to narrow further
}
```

## Best Practices

1. **Always check for success with type guards** before accessing `response.result`. Use `isSuccess()` and `isError()` for type-safe response handling.

2. **Never use try/catch for SDK errors** — SDK methods never throw. All failures are returned as responses with a numeric `status_code` and an `error` field.

3. **Call `reloadScopes()` when your MiniApp launches and after OAuth** before accessing protected resources.

4. **Unsubscribe from streams** when your component unmounts or you no longer need updates.
