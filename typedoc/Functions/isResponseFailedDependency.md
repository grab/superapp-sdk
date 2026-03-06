[@grabjs/superapp-sdk](../README.md) / isResponseFailedDependency

# Function: isResponseFailedDependency()

> **isResponseFailedDependency**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>): `response is BridgeStatusCode424Response`

Type guard that checks if the response is a failed dependency error (status code 424).
Narrows the type to BridgeErrorResponse424.

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>

## Returns

`response is BridgeStatusCode424Response`

## Example

```typescript
const response = await cameraModule.scanQRCode(request);
if (isResponseFailedDependency(response)) {
  console.log('Failed dependency:', response.error);
}
```
