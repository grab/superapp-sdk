[@grabjs/superapp-sdk](../README.md) / BridgeStream

# Type Alias: BridgeStream\<Codes, T\>

> **BridgeStream**\<`Codes`, `T`\> = `Readonly`\<\{ `subscribe`: (`handlers?`: [`BridgeStreamHandlers`](BridgeStreamHandlers.md)\<`Codes`, `T`\>) => [`Subscription`](Subscription.md); \}\> & `PromiseLike`\<[`BridgeResponse`](BridgeResponse.md)\<`Codes`, `T`\>\>

A stream for receiving continuous data from JSBridge methods (e.g., location updates).

## Type Parameters

### Codes

`Codes` *extends* [`BridgeStatusCode`](BridgeStatusCode.md) = [`BridgeStatusCode`](BridgeStatusCode.md)

The status codes that can be emitted by the stream.

### T

`T` = `void`

The type of data emitted by the stream.

## Remarks

Provides both Observable-like and Promise-like interfaces:
- Use `subscribe()` to receive all values over time
- Use `then()` or `await` to receive only the first value

Note: Each `subscribe()` call creates a fresh subscription, allowing multiple independent listeners.
