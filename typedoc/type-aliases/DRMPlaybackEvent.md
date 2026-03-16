[@grabjs/superapp-sdk](../README.md) / DRMPlaybackEvent

# Type Alias: DRMPlaybackEvent

> **DRMPlaybackEvent** = \{ `data?`: `Record`\<`string`, `unknown`\>; `eventType`: `"started"` \| `"paused"` \| `"ended"` \| `"error"`; \}

Result object for DRM playback events.

## Examples

**Playback started event:**
```typescript
{ eventType: 'started' }
```

**Playback paused event:**
```typescript
{ eventType: 'paused' }
```

**Playback error event:**
```typescript
{
  eventType: 'error',
  data: { errorCode: 'DRM_LICENSE_ERROR', message: 'License expired' }
}
```

## Properties

### data?

> `optional` **data**: `Record`\<`string`, `unknown`\>

Additional event data as key-value pairs.

***

### eventType

> **eventType**: `"started"` \| `"paused"` \| `"ended"` \| `"error"`

The type of playback event.
