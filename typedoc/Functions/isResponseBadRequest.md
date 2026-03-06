[@grabjs/superapp-sdk](../README.md) / isResponseBadRequest

# Function: isResponseBadRequest()

> **isResponseBadRequest**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>): `response is BridgeStatusCode400Response`

Type guard that checks if the response is a bad request error (status code 400).
Narrows the type to BridgeErrorResponse400.

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>

## Returns

`response is BridgeStatusCode400Response`

## Example

```typescript
const response = await cameraModule.scanQRCode(request);
if (isResponseBadRequest(response)) {
  console.log('Bad request:', response.error);
}
```
