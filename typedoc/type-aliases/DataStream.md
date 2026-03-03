[@grabjs/superapp-sdk](../README.md) / DataStream

# Type Alias: DataStream\<T\>

> **DataStream**\<`T`\> = `Readonly`\<\{ `subscribe`: (`handlers?`: [`DataStreamHandlers`](DataStreamHandlers.md)\<`T`\>) => [`Subscription`](Subscription.md); \}\> & `PromiseLike`\<[`BridgeResponse`](BridgeResponse.md)\<`T`\>\>

A stream for receiving continuous data from JSBridge methods (e.g., location updates).

## Type Parameters

### T

`T`

The type of data emitted by the stream.

## Remarks

Provides both Observable-like and Promise-like interfaces:

- Use `subscribe()` to receive all values over time
- Use `then()` or `await` to receive only the first value

Note: Each `subscribe()` call creates a fresh subscription, allowing multiple independent listeners.
