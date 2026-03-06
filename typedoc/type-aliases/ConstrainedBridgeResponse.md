[@grabjs/superapp-sdk](../README.md) / ConstrainedBridgeResponse

# Type Alias: ConstrainedBridgeResponse\<T, Codes\>

> **ConstrainedBridgeResponse**\<`T`, `Codes`\> = [`StatusCodeMap`](StatusCodeMap.md)\<`T`\>\[`Codes`\]

Create a constrained JSBridge response type with only specific status codes.

## Type Parameters

### T

`T`

### Codes

`Codes` *extends* keyof [`StatusCodeMap`](StatusCodeMap.md)\<`T`\>

## Example

```typescript
// Only status code 200
type OnlySuccess = ConstrainedBridgeResponse<string, 200>;

// Only status codes 200 and 500
type SuccessOrServerError = ConstrainedBridgeResponse<string, 200 | 500>;

// Only error status codes
type OnlyErrors = ConstrainedBridgeResponse<string, 400 | 403 | 424 | 500>;
```
