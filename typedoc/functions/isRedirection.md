[@grabjs/superapp-sdk](../README.md) / isRedirection

# Function: isRedirection()

> **isRedirection**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>): `response is ResponseStatusCode302`

Type guard to check if a JSBridge response is a redirect (status code 302).

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

The JSBridge response to check

## Returns

`response is ResponseStatusCode302`

True if the response is a redirect (302), false otherwise

## Example

```typescript
const response = await someBridgeMethod();
if (isRedirection(response)) {
  // response is narrowed to BridgeRedirection
  console.log('Redirecting...');
}
```
