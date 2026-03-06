[@grabjs/superapp-sdk](../README.md) / DRMPlaybackEvent

# Type Alias: DRMPlaybackEvent

> **DRMPlaybackEvent** = \{ `data?`: `Record`\<`string`, `unknown`\>; `eventType`: `string`; \}

Result object for DRM playback events.

## Properties

### data?

> `optional` **data**: `Record`\<`string`, `unknown`\>

Additional event data as key-value pairs.

***

### eventType

> **eventType**: `string`

The type of playback event (e.g., 'started', 'paused', 'ended', 'error').
