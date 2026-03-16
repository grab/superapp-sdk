[@grabjs/superapp-sdk](../README.md) / isErrorResponse

# Function: isErrorResponse()

> **isErrorResponse**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>): `response is BridgeError`

Type guard to check if a JSBridge response is an error (4xx or 5xx status codes).

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

The JSBridge response to check

## Returns

`response is BridgeError`

True if the response is any error (4xx or 5xx), false otherwise

## Example

```typescript
const response = await someBridgeMethod();
if (isErrorResponse(response)) {
  // response is narrowed to BridgeError
  console.error('Error:', response.error);
} else {
  // response is successful or redirect
  console.log('Success!');
}
```
