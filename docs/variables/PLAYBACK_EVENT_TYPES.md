[@grabjs/superapp-sdk](../README.md) / PLAYBACK\_EVENT\_TYPES

# Variable: PLAYBACK\_EVENT\_TYPES

> `const` **PLAYBACK\_EVENT\_TYPES**: \{ `START_PLAYBACK`: `"START_PLAYBACK"`; `STOP_PLAYBACK`: `"STOP_PLAYBACK"`; `PROGRESS_PLAYBACK`: `"PROGRESS_PLAYBACK"`; \}

Playback event type constants.

## Type Declaration

### START\_PLAYBACK

> `readonly` **START\_PLAYBACK**: `"START_PLAYBACK"` = `'START_PLAYBACK'`

Emitted when the video starts playing

### STOP\_PLAYBACK

> `readonly` **STOP\_PLAYBACK**: `"STOP_PLAYBACK"` = `'STOP_PLAYBACK'`

Emitted when the video stops playing

### PROGRESS\_PLAYBACK

> `readonly` **PROGRESS\_PLAYBACK**: `"PROGRESS_PLAYBACK"` = `'PROGRESS_PLAYBACK'`

Emitted every 10 seconds during playback

## Remarks

Use as both runtime values and for type narrowing. The `PlaybackEventType` type is derived from this object.
