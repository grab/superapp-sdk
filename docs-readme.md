# SuperApp SDK API Documentation

The Grab SuperApp SDK enables miniapps running inside the Grab app to interact with native capabilities through a JavaScript bridge.

## Available Modules

The SDK provides the following modules for accessing native features:

- **[CameraModule](/docs/classes/CameraModule.md)** - QR code scanning
- **[CheckoutModule](/docs/classes/CheckoutModule.md)** - Trigger checkout flows
- **[ContainerModule](/docs/classes/ContainerModule.md)** - Control webview container appearance and behavior
- **[IdentityModule](/docs/classes/IdentityModule.md)** - OAuth authorization and identity management
- **[LocaleModule](/docs/classes/LocaleModule.md)** - Get user's language and locale
- **[LocationModule](/docs/classes/LocationModule.md)** - Access user's location
- **[MediaModule](/docs/classes/MediaModule.md)** - Play DRM-protected content
- **[PlatformModule](/docs/classes/PlatformModule.md)** - Platform navigation controls
- **[ProfileModule](/docs/classes/ProfileModule.md)** - Access user profile information
- **[ScopeModule](/docs/classes/ScopeModule.md)** - Check user permissions
- **[StorageModule](/docs/classes/StorageModule.md)** - Persistent key-value storage
- **[SystemWebViewKitModule](/docs/classes/SystemWebViewKitModule.md)** - Open system web view

## Quick Start

```javascript
import { LocationModule, ScopeModule } from '@grabjs/superapp-sdk';

// Load scopes after redirect (required for permission checks)
const scopeModule = new ScopeModule();
await scopeModule.reloadScopes();

// Use modules to access native features
const locationModule = new LocationModule();
const response = await locationModule.getCoordinate();
if (response.status_code === 200) {
  console.log('Coordinates:', response.result);
}
```

**Note:** Call `ScopeModule.reloadScopes()` after redirecting to a partner website to load permissions from GrabID.

For complete API details, explore the classes and interfaces listed in the navigation.
