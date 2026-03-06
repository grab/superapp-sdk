[@grabjs/superapp-sdk](../README.md) / BridgeResponse

# Type Alias: BridgeResponse\<T\>

> **BridgeResponse**\<`T`\> = [`BridgeSuccessResponse`](BridgeSuccessResponse.md)\<`T`\> \| [`BridgeRedirectResponse`](BridgeRedirectResponse.md) \| [`BridgeClientErrorResponse`](BridgeClientErrorResponse.md) \| [`BridgeServerErrorResponse`](BridgeServerErrorResponse.md)

Universal response format for all JSBridge methods.

## Type Parameters

### T

`T`

## Remarks

All JSBridge method calls resolve to this type. After destructuring,
use type guards (e.g., if (error), if (status_code === 200)) to narrow the type.
