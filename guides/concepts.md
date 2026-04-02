---
title: Core Concepts
---

# Core Concepts

SDK methods communicate with the native Grab SuperApp via JSBridge. They only work when your page is running inside the **Grab SuperApp WebView**. Calling a method outside that environment returns `{ status_code: 501 }`.

## Response Pattern

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

## Status Codes

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

## Type Guards

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

## Streams

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
