# ScopeModule

## API Reference

SDK module for checking and refreshing API access permissions via `JSBridge`.

- `hasAccessTo(module: string, method: string): Promise<HasAccessToResponse>` — Checks if the current client has access to a specific `JSBridge` API method.

This method can return the following `status_code` values:
- `200` (OK): Access check completed successfully. The `result` contains HasAccessToResult.
- `400` (Bad Request): Invalid request parameters.
- `424` (Failed Dependency): Dependency error occurred while checking access.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ScopeModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the scope module
const scope = new ScopeModule();

// Check access to CameraModule.scanQRCode
const response = await scope.hasAccessTo('CameraModule', 'scanQRCode');

// Handle the response
if (isSuccess(response)) {
  console.log('Has access:', response.result);
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `reloadScopes(): Promise<ReloadScopesResponse>` — Requests to reload the consented OAuth scopes for the current client.
This refreshes the permissions from the server.

This method can return the following `status_code` values:
- `204` (No Content): Scopes reloaded successfully.
- `424` (Failed Dependency): Dependency error occurred while reloading scopes.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { ScopeModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the scope module
const scope = new ScopeModule();

// Reload scopes
const response = await scope.reloadScopes();

// Handle the response
if (isSuccess(response)) {
  console.log('Scopes reloaded successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```
