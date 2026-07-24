---
title: Core Concepts
---

# Core Concepts

SDK methods communicate with the native Grab SuperApp layer via `JSBridge`. They only work when your page is running inside the **Grab SuperApp WebView**. Calling a method outside that environment returns `{ status_code: 501 }`.

## Response Pattern

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

## Status Codes

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

## Type Guards

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

## Scopes and Permissions

The SDK categorizes permissions into two distinct types based on their execution context:

### Permission Types

- **Backend Scopes** (`openid`, `profile.read`, `phone`)
  - **Purpose**: Access protected resources and user data via your server.
  - **Flow**: Requires a backend token exchange after authorization to retrieve data.
- **Mobile Scopes** (`mobile.geolocation`, `mobile.checkout`)
  - **Purpose**: Access native device capabilities directly within the MiniApp.
  - **Flow**: Grants in-app permission immediately; no backend exchange is necessary.

### Authorization Patterns

When designing your MiniApp, you can choose between two common patterns for requesting scopes:

- **Upfront Authorization**
  - Request all required scopes during app initialisation, typically alongside backend sign-in.
  - _Best for_: Core permissions essential for the app to function.
- **Deferred Authorization**
  - Request scopes only when the user triggers a specific feature that requires them.
  - _Best for_: Optional permissions (e.g., location) to improve user experience and build trust.

### Permission Verification Strategies

A scope the user has already granted can be revoked again at any time from the Grab app's settings, so a
method tagged `@requiredOAuthScope` can return `403` even if you checked access moments earlier. Recovering
spans two modules, not one: call `IdentityModule.authorize()` to re-request the scope, then
`ScopeModule.reloadScopes()` to refresh the SDK's internal permission state, then retry the original call.
See `references/IdentityModule.md` for `authorize()`'s signature and `references/ScopeModule.md` for
`reloadScopes()`'s.
