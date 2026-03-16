[@grabjs/superapp-sdk](../README.md) / ObserveDRMPlaybackResponse

# Type Alias: ObserveDRMPlaybackResponse

> **ObserveDRMPlaybackResponse** = [`BridgeStream`](BridgeStream.md)\<`200` \| `500` \| `501`, [`DRMPlaybackEvent`](DRMPlaybackEvent.md)\>

Response stream for observing DRM playback events.

## Remarks

This is a `BridgeStream` that can be:
- Subscribed to via `.subscribe()` for continuous updates
- Awaited via `await` to get the first value only

The stream can emit status codes 200 (event data), 500 (server error), or 501 (not implemented).
