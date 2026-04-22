---
title: Core Concepts
---

# Core Concepts

SDK methods communicate with the native Grab SuperApp via JSBridge. They only work when your page is running inside the **Grab SuperApp WebView**. Calling a method outside that environment returns `{ status_code: 501 }`.

## Response Pattern

Every SDK method returns a bridge response object with an HTTP-style `status_code`. SDK methods never throw — use type guards instead of try/catch.

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

## Handling 403 Forbidden

Methods tagged with `@requiredOAuthScope` require specific permissions. If the user hasn't granted the required scope, the method returns `403`. You must request authorization and reload scopes before retrying:

1. Call `IdentityModule.authorize()` to request the scope.
2. Call `ScopeModule.reloadScopes()` to refresh the SDK's internal permission state.
3. Retry the original method call.

```typescript
import {
  LocationModule,
  IdentityModule,
  ScopeModule,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

const location = new LocationModule();
const identity = new IdentityModule();
const scope = new ScopeModule();

const response = await location.getCoordinate();

if (isError(response) && response.status_code === 403) {
  // 1. Request authorization for the required scope
  const auth = await identity.authorize({
    clientId: 'your-client-id',
    redirectUri: 'https://your-app.com/callback',
    scope: 'mobile.geolocation', // The scope defined in @requiredOAuthScope
    environment: 'production',
    responseMode: 'in_place',
  });

  if (isSuccess(auth)) {
    // 2. Reload scopes so the new permission is available
    await scope.reloadScopes();

    // 3. Retry the original call
    const retry = await location.getCoordinate();
    if (isSuccess(retry)) {
      console.log('Result:', retry.result);
    }
  }
}
```

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
