[@grabjs/superapp-sdk](../README.md) / isResponseNotFound

# Function: isResponseNotFound()

> **isResponseNotFound**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>): `response is BridgeStatusCode404Response`

Type guard that checks if the response is a not found error (status code 404).
Narrows the type to BridgeErrorResponse404.

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>

## Returns

`response is BridgeStatusCode404Response`

## Example

```typescript
const response = await cameraModule.scanQRCode(request);
if (isResponseNotFound(response)) {
  console.log('Not found:', response.error);
}
```
