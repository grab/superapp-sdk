[@grabjs/superapp-sdk](../README.md) / BridgeResponse

# Type Alias: BridgeResponse\<Codes, T\>

> **BridgeResponse**\<`Codes`, `T`\> = [`StatusCodeMap`](StatusCodeMap.md)\<`T`\>\[`Codes`\]

Universal response type for JSBridge method callbacks.

## Type Parameters

### Codes

`Codes` *extends* [`BridgeStatusCode`](BridgeStatusCode.md) = [`BridgeStatusCode`](BridgeStatusCode.md)

### T

`T` = `void`

## Remarks

Represents the response shape from a JSBridge method call. Use with specific status codes
to constrain which responses are possible, or use `BridgeStatusCode` for the full union.

This type works for both single (non-streaming) responses and as the item type
emitted by [BridgeStream](BridgeStream.md).

Status codes come first in the type parameters for better readability at module call sites.

## Example

```typescript
// Constrained to specific status codes (common case)
type SuccessOrError = BridgeResponse<200 | 500, string>;

// Only success
type OnlySuccess = BridgeResponse<200, string>;

// Unconstrained - all status codes possible (internal use)
type AnyResponse = BridgeResponse<BridgeStatusCode, string>;
```
