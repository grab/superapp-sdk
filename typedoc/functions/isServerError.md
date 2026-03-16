[@grabjs/superapp-sdk](../README.md) / isServerError

# Function: isServerError()

> **isServerError**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>): `response is BridgeServerError`

Type guard to check if a JSBridge response is a server error (5xx status codes).

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

The JSBridge response to check

## Returns

`response is BridgeServerError`

True if the response is a server error (500, 501), false otherwise

## Example

```typescript
const response = await someBridgeMethod();
if (isServerError(response)) {
  // response is narrowed to BridgeServerError
  console.error('Server error:', response.error);
}
```
