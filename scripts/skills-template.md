---
name: 'grabjs-superapp-sdk'
description: 'API reference for @grabjs/superapp-sdk. Use when building a MiniApp that runs in the Grab SuperApp WebView and needs to call native features (camera, payments, authorization, authentication, permission, location, device storage, container UI customization) via the Grab JSBridge. Keywords: miniapp, webview, android, ios, jsbridge, grab, superapp.'
license: 'MIT'
---

# @grabjs/superapp-sdk

Use this SDK to call native Grab SuperApp features from a MiniApp running in the WebView. Each module covers one domain (camera, payments, location, etc.) and communicates with the native layer via JSBridge.

## Core Concepts

**Every method returns a bridge response** with an HTTP-style `status_code`. Never use try/catch — SDK methods never throw.

Use type guards to narrow the response before accessing fields:

```typescript
import { isSuccess, isError } from '@grabjs/superapp-sdk'; // isClientError, isServerError, isRedirection also available

if (isSuccess(response)) {
  switch (response.status_code) {
    case 200:
      console.log(response.result);
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

**Status codes**:

- `400` — invalid request parameters; check inputs before assuming a server error
- `403` — permission denied; call `IdentityModule.authorize()` for the required scope, then `ScopeModule.reloadScopes()` before retrying
- `426` — method requires a newer version of the Grab app; advise the user to upgrade
- `501` — running outside the Grab SuperApp WebView

## Common Patterns

**MiniApp initialization**: always call `ScopeModule.reloadScopes()` on launch before making any module calls — scopes are not loaded automatically.

**Subscribing to a stream** (location updates, media events):

```typescript
const subscription = locationModule.observeLocationChange().subscribe({
  next: (response) => {
    if (isSuccess(response)) console.log(response.result);
  },
  complete: () => console.log('Stream ended'),
});

// Always unsubscribe when done to conserve battery and resources:
subscription.unsubscribe();
```

You can also `await` a stream method directly to get its first value.

**Validating request parameters**: methods that accept a request object return `{ status_code: 400 }` when parameters are invalid.
