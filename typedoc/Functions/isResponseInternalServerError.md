[@grabjs/superapp-sdk](../README.md) / isResponseInternalServerError

# Function: isResponseInternalServerError()

> **isResponseInternalServerError**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>): `response is BridgeStatusCode500Response`

Type guard that checks if the response is an internal server error (status code 500).
Narrows the type to BridgeErrorResponse500.

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
if (isResponseInternalServerError(response)) {
  console.log('Internal server error:', response.error);
}
```
