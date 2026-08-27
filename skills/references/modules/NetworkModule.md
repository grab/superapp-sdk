# NetworkModule

## API Reference

SDK module for making network requests through the native layer via `JSBridge`.

| Method | Returns | Description |
| :--- | :--- | :--- |
| `send(request: SendRequest)` | `Promise<SendResponse>` | Sends a network request through `JSBridge`. |

## `send`

Sends a network request through `JSBridge`.

**Signature:** `send(request: SendRequest): Promise<SendResponse>`

This method can return the following `status_code` values:
- `200` (OK): Request successful. The `result` contains the response data.
- `204` (No Content): Request successful, no data returned.
- `400` (Bad Request): Invalid request parameters.
- `401` (Unauthorized): Authentication required.
- `403` (Forbidden): Missing required OAuth scope.
- `404` (Not Found): Resource not found.
- `424` (Failed Dependency): Underlying native request failed.
- `426` (Upgrade Required): Grab app version too old.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { NetworkModule, isSuccess, isError, hasResult } from '@grabjs/superapp-sdk';

// Initialize the network module
const network = new NetworkModule();

// Send a POST request with headers and body
const response = await network.send({
  endpoint: 'https://api.example.com/users',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: { name: 'John', email: 'john@example.com' },
  timeout: 30
});

// Handle the response
if (isSuccess(response) && hasResult(response)) {
  console.log('Success:', response.result);
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```
