[@grabjs/superapp-sdk](../README.md) / isResponseOk

# Function: isResponseOk()

> **isResponseOk**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>): `response is BridgeStatusCode200Response<T>`

Type guard that checks if the response is OK (status code 200).
Narrows the type to BridgeSuccessResponse<T>, giving access to the result.

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>

## Returns

`response is BridgeStatusCode200Response<T>`

## Example

```typescript
const response = await cameraModule.scanQRCode(request);
if (isResponseOk(response)) {
  console.log('QR Code:', response.result.qrCode);
}
```
