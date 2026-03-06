[@grabjs/superapp-sdk](../README.md) / isResponseForbidden

# Function: isResponseForbidden()

> **isResponseForbidden**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>): `response is BridgeStatusCode403Response`

Type guard that checks if the response is a forbidden error (status code 403).
Narrows the type to BridgeErrorResponse403.

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>

## Returns

`response is BridgeStatusCode403Response`

## Example

```typescript
const response = await cameraModule.scanQRCode(request);
if (isResponseForbidden(response)) {
  console.log('Forbidden:', response.error);
}
```
