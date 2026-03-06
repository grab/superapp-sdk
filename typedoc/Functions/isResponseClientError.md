[@grabjs/superapp-sdk](../README.md) / isResponseClientError

# Function: isResponseClientError()

> **isResponseClientError**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>): `response is BridgeClientErrorResponse`

Type guard that checks if the response is a client error (status code 400, 403, 404, or 424).
Narrows the type to client error responses.

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>

## Returns

`response is BridgeClientErrorResponse`

## Example

```typescript
const response = await cameraModule.scanQRCode(request);
if (isResponseClientError(response)) {
  console.log('Client error:', response.status_code, response.error);
}
```
