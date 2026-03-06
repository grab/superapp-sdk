[@grabjs/superapp-sdk](../README.md) / isResponseNoContent

# Function: isResponseNoContent()

> **isResponseNoContent**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>): `response is BridgeStatusCode204Response`

Type guard that checks if the response has no content (status code 204).
This typically means the operation completed with no content to return.

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>

## Returns

`response is BridgeStatusCode204Response`

## Example

```typescript
const response = await cameraModule.scanQRCode(request);
if (isResponseNoContent(response)) {
  console.log('No content available');
}
```
