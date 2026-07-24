# NetworkModule

## API Reference

SDK module for making network requests through the native layer via `JSBridge`.

- `send(request: SendRequest): Promise<SendResponse>` — Sends a network request through `JSBridge`.

This method can return the following `status_code` values:
- `200` (OK): Request completed successfully. The `result` contains SendResult.
- `204` (No Content): Request completed successfully with no response body.
- `400` (Bad Request): Invalid request parameters.
- `401` (Unauthorized): Authentication required.
- `403` (Forbidden): Client is not authorized to make this request.
- `404` (Not Found): The requested endpoint was not found.
- `424` (Failed Dependency): Underlying native request failed.
- `426` (Upgrade Required): Feature requires a newer Grab app version.
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
