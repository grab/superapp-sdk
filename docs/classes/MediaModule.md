[@grabjs/superapp-sdk](../README.md) / MediaModule

# Class: MediaModule

The MediaModule provides functionality to open a media player for DRM-protected content.

## Example

```javascript
import { MediaModule } from '@grabjs/superapp-sdk';

const mediaModule = new MediaModule();
```

## Extends

- `ModuleBase`

## Constructors

### Constructor

> **new MediaModule**(): `MediaModule`

#### Returns

`MediaModule`

#### Overrides

`ModuleBase.constructor`

## Methods

### playDRMContent()

> **playDRMContent**(`request`: [`PlayDRMContentRequest`](../type-aliases/PlayDRMContentRequest.md)): `Promise`\<[`PlayDRMContentResponse`](../type-aliases/PlayDRMContentResponse.md)\>

Play DRM-protected content in the native media player.

#### Parameters

##### request

[`PlayDRMContentRequest`](../type-aliases/PlayDRMContentRequest.md)

Video data containing URLs and identifiers.
  - `content`: Content URL for playback
  - `certificate`: DRM certificate URL
  - `license`: DRM licence URL
  - `titleId`: Playback item identifier

#### Returns

`Promise`\<[`PlayDRMContentResponse`](../type-aliases/PlayDRMContentResponse.md)\>

Promise that resolves to a stream of [PlayDRMContentResponse](../type-aliases/PlayDRMContentResponse.md) with playback status events.

#### Remarks

This method returns a data stream that emits events about the video playback status.

**Event Types:** (see [PlaybackEventType](../type-aliases/PlaybackEventType.md))
- `START_PLAYBACK`: Emitted when the video starts playing
- `STOP_PLAYBACK`: Emitted when the video stops playing
- `PROGRESS_PLAYBACK`: Emitted every 10 seconds during playback

**Event Data:**
- `type`: Type of the event ([PlaybackEventType](../type-aliases/PlaybackEventType.md))
- `titleId`: Playback item identifier
- `length`: Length of the video (in seconds)
- `position`: The current position of the video (in seconds)

#### See

[PlaybackEventType](../type-aliases/PlaybackEventType.md)

#### Example

```javascript
// Subscribe to playback events
try {
  mediaModule
    .playDRMContent({
      content: 'https://example.com/content.mpd',
      certificate: 'https://example.com/cert.cer',
      license: 'https://example.com/license',
      titleId: 'video-123'
    })
    .subscribe({
      next: ({ result, error, status_code }) => {
        if (result) {
          const { type, titleId, length, position } = result;
          
          if (type === 'START_PLAYBACK') {
            console.log('Video started:', titleId);
          } else if (type === 'PROGRESS_PLAYBACK') {
            console.log(`Progress: ${position}s / ${length}s`);
            updateProgressBar(position, length);
          } else if (type === 'STOP_PLAYBACK') {
            console.log('Video stopped');
          }
        } else if (error) {
          console.error('Playback error:', error);
        }
      },
      complete: () => {
        console.log('Playback stream completed');
      }
    });
} catch (e) {
  // Fallback for older app versions that don't support this method
  console.error('DRM playback not supported:', e);
}
```
