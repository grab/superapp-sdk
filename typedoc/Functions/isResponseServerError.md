[@grabjs/superapp-sdk](../README.md) / isResponseServerError

# Function: isResponseServerError()

> **isResponseServerError**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>): `response is BridgeStatusCode500Response`

Type guard that checks if the response is a server error (status code 500).
Narrows the type to server error response.

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>

## Returns

`response is BridgeStatusCode500Response`

## Example

```typescript
const response = await cameraModule.scanQRCode(request);
if (isResponseServerError(response)) {
  console.log('Server error - retry later:', response.error);
}
```
