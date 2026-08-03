# NetworkModule

## API Reference

SDK module for making network requests through the native layer via `JSBridge`.

- `send(request: SendRequest): Promise<SendResponse>` — Sends a network request through `JSBridge`.

The network response containing the result data or error information. See SendResponse.

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
