[@grabjs/superapp-sdk](../README.md) / DataStreamHandlers

# Type Alias: DataStreamHandlers\<T\>

> **DataStreamHandlers**\<`T`\> = `Readonly`\<\{ `complete?`: () => `unknown`; `next?`: (`data`: [`BridgeResponse`](BridgeResponse.md)\<`T`\>) => `unknown`; \}\>

Callbacks for handling stream events.

## Type Parameters

### T

`T`

The type of data emitted by the stream.

## Remarks

Pass these to `subscribe()` to receive data via `next` and completion via `complete`.
