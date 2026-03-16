[@grabjs/superapp-sdk](../README.md) / isSuccess

# Function: isSuccess()

> **isSuccess**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>): `response is BridgeSuccessResponse<T>`

Type guard to check if a JSBridge response is successful (status codes 200 or 204).

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

The JSBridge response to check

## Returns

`response is BridgeSuccessResponse<T>`

True if the response is successful (200 or 204), false otherwise

## Example

```typescript
const response = await someBridgeMethod();
if (isSuccess(response)) {
  // response is narrowed to BridgeSuccessResponse<T>
  if (response.status_code === 200) {
    console.log(response.result);
  }
}
```
