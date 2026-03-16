[@grabjs/superapp-sdk](../README.md) / isClientError

# Function: isClientError()

> **isClientError**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>): `response is BridgeClientError`

Type guard to check if a JSBridge response is a client error (4xx status codes).

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

The JSBridge response to check

## Returns

`response is BridgeClientError`

True if the response is a client error (400, 401, 403, 404, 424, 426), false otherwise

## Example

```typescript
const response = await someBridgeMethod();
if (isClientError(response)) {
  // response is narrowed to BridgeClientError
  console.error('Client error:', response.error);
}
```
