[@grabjs/superapp-sdk](../README.md) / BridgeResponse

# Type Alias: BridgeResponse\<T\>

> **BridgeResponse**\<`T`\> = [`BridgeSuccessResponse`](BridgeSuccessResponse.md)\<`T`\> \| [`BridgeNoResultResponse`](BridgeNoResultResponse.md) \| [`BridgeErrorResponse`](BridgeErrorResponse.md)

Universal response format for all JSBridge methods.

## Type Parameters

### T

`T`

## Remarks

All JSBridge method calls resolve to this union type.
