# @grabjs/superapp-sdk

SDK for Grab SuperApp WebView. Enables miniapps running inside the Grab app to interact with native capabilities (camera, location, identity, checkout, etc.) through a JavaScript bridge.

## Installation

```bash
npm install @grabjs/superapp-sdk
```

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

**Note:** Call `ScopeModule.reloadScopes()` after redirecting to a partner website to load permissions from GrabID. Without it, permission checks may not reflect the user's actual scopes.

## Full Documentation

See the [API documentation](docs/README.md) for the complete reference, including:

- All available modules and their methods
- Request and response formats
- Type definitions

---

## Overview

Communication between web-app and native Grab app happens via web bridge. Each request and response object must have a structure defined in this document.

### Currently available modules

- [CameraModule](docs/classes/CameraModule.md)
- [CheckoutModule](docs/classes/CheckoutModule.md)
- [ContainerModule](docs/classes/ContainerModule.md)
- [IdentityModule](docs/classes/IdentityModule.md)
- [LocaleModule](docs/classes/LocaleModule.md)
- [LocationModule](docs/classes/LocationModule.md)
- [MediaModule](docs/classes/MediaModule.md)
- [PlatformModule](docs/classes/PlatformModule.md)
- [ProfileModule](docs/classes/ProfileModule.md)
- [ScopeModule](docs/classes/ScopeModule.md)
- [StorageModule](docs/classes/StorageModule.md)
- [SystemWebViewKitModule](docs/classes/SystemWebViewKitModule.md)

### Response

Each response from the native bridge follows the same structure:

| Key         | Type                     | Description                                                                        |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------- |
| status_code | Integer                  | Response status code (see list of codes below)                                     |
| result      | Object or primitive type | Result object according to method specification (required for **200** status code) |
| error       | String                   | Error message (required for **non-200** status codes)                              |

#### Response status codes

| Code | Type              | Description                                                                     |
| ---- | ----------------- | ------------------------------------------------------------------------------- |
| 200  | OK                | Request successful, **result** value contains response data                     |
| 204  | No Content        | Request successful, **result** value doesn't contain data                       |
| 400  | Bad Request       | The request is malformed (e.g. missing **parameters**, missing **method** name) |
| 403  | Forbidden         | The client doesn't have permission to access this method                        |
| 424  | Failed Dependency | Underlying request returned an error                                            |
| 500  | Internal Error    | Unexpected internal error (e.g. failed to serialize response object)            |
