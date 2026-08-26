# PlatformModule

## API Reference

SDK module for controlling platform navigation via `JSBridge`.

- `back(): Promise<BackResponse>` — Triggers the native platform back navigation.
This navigates back in the native navigation stack.

This method can return the following `status_code` values:
- `204` (No Content): Back navigation triggered successfully.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { PlatformModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the platform module
const platform = new PlatformModule();

// Trigger back navigation
const response = await platform.back();

// Handle the response
if (isSuccess(response)) {
  console.log('Back navigation triggered');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```
