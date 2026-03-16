[@grabjs/superapp-sdk](../README.md) / BridgeStreamHandlers

# Type Alias: BridgeStreamHandlers\<Codes, T\>

> **BridgeStreamHandlers**\<`Codes`, `T`\> = `Readonly`\<\{ `complete?`: () => `unknown`; `next?`: (`data`: [`BridgeResponse`](BridgeResponse.md)\<`Codes`, `T`\>) => `unknown`; \}\>

Callbacks for handling stream events.

## Type Parameters

### Codes

`Codes` *extends* [`BridgeStatusCode`](BridgeStatusCode.md) = [`BridgeStatusCode`](BridgeStatusCode.md)

The status codes that can be emitted by the stream.

### T

`T` = `void`

The type of data emitted by the stream.

## Remarks

Pass these to `subscribe()` to receive data via `next` and completion via `complete`.
