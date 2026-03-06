[@grabjs/superapp-sdk](../README.md) / isResponseSuccess

# Function: isResponseSuccess()

> **isResponseSuccess**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>): `response is BridgeSuccessResponse<T>`

Type guard that checks if the response is a success (status code 200 or 204).
Narrows the type to BridgeSuccessResponse<T> | BridgeNoResultResponse, excluding errors and redirects.

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>

## Returns

`response is BridgeSuccessResponse<T>`

## Example

```typescript
const response = await cameraModule.scanQRCode(request);
if (isResponseSuccess(response)) {
  // Response is not an error, check isResponseOk() to access result
}
```
