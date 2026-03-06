[@grabjs/superapp-sdk](../README.md) / isResponseError

# Function: isResponseError()

> **isResponseError**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>): `response is BridgeErrorResponse`

Type guard that checks if the response is an error (status code 4xx or 5xx).
Narrows the type to BridgeErrorResponse, giving access to the error message.

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>

## Returns

`response is BridgeErrorResponse`

## Example

```typescript
const response = await cameraModule.scanQRCode(request);
if (isResponseError(response)) {
  console.log('Error:', response.error);
}
```
