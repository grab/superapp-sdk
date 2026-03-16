[@grabjs/superapp-sdk](../README.md) / ObserveLocationChangeResponse

# Type Alias: ObserveLocationChangeResponse

> **ObserveLocationChangeResponse** = [`BridgeStream`](BridgeStream.md)\<`200` \| `424` \| `500` \| `501`, [`GetCoordinateResult`](GetCoordinateResult.md)\>

Response when observing the device coordinates.

## Remarks

This is a `BridgeStream` that can be:
- Subscribed to via `.subscribe()` for continuous updates
- Awaited via `await` to get the first value only

The stream can emit the same status codes as [GetCoordinateResponse](GetCoordinateResponse.md).
