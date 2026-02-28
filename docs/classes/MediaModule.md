[@grabjs/superapp-sdk](../README.md) / MediaModule

# Class: MediaModule

Provides functionality to open a media player for DRM-protected content.

## Remarks

The MediaModule enables miniapps to play Digital Rights Management (DRM) protected video
content through the Grab app's native media player. Playback events are streamed back to
provide real-time status updates.

## Examples

**ES Module:**
```typescript
import { MediaModule } from '@grabjs/superapp-sdk';

const mediaModule = new MediaModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const mediaModule = new SuperAppSDK.MediaModule();
</script>
```

## Extends

- `BaseModule`

## Constructors

### Constructor

> **new MediaModule**(): `MediaModule`

#### Returns

`MediaModule`

#### Overrides

`BaseModule.constructor`

## Methods

### playDRMContent()

> **playDRMContent**(`request`: [`PlayDRMContentRequest`](../type-aliases/PlayDRMContentRequest.md)): `Promise`\<[`PlayDRMContentResponse`](../type-aliases/PlayDRMContentResponse.md)\>

Play DRM-protected content in the native media player.

#### Parameters

##### request

[`PlayDRMContentRequest`](../type-aliases/PlayDRMContentRequest.md)

Video data for DRM content playback.

#### Returns

`Promise`\<[`PlayDRMContentResponse`](../type-aliases/PlayDRMContentResponse.md)\>

Promise that resolves to [PlayDRMContentResponse](../type-aliases/PlayDRMContentResponse.md).

#### Remarks

This method initiates DRM content playback and returns the initial response.

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

#### Examples

Basic usage:
```typescript
try {
  const response = await mediaModule.playDRMContent({
    content: 'https://example.com/content.mpd',
    certificate: 'https://example.com/cert.cer',
    license: 'https://example.com/license',
    titleId: 'video-123'
  });
  if (response.status_code === 200) {
    const { type, position, length } = response.result;
    console.log(`Playback event: ${type} at ${position}s / ${length}s`);
  }
} catch (error) {
  console.error('DRM playback not supported:', error);
}
```

Handling the response:
```typescript
try {
  const response = await mediaModule.playDRMContent({
    content: 'https://example.com/content.mpd',
    certificate: 'https://example.com/cert.cer',
    license: 'https://example.com/license',
    titleId: 'video-123'
  });

  switch (response.status_code) {
    case 200:
      const { type, titleId, length, position } = response.result;
      if (type === 'START_PLAYBACK') {
        console.log('Video started:', titleId);
      } else if (type === 'PROGRESS_PLAYBACK') {
        console.log(`Progress: ${position}s / ${length}s`);
        updateProgressBar(position, length);
      } else if (type === 'STOP_PLAYBACK') {
        console.log('Video stopped');
      }
      break;
    case 400:
      console.error('Invalid request:', response.error);
      break;
    case 403:
      console.error('DRM permission denied:', response.error);
      break;
    case 500:
      console.error('Playback error:', response.error);
      break;
  }
} catch (error) {
  console.error('DRM playback not supported:', error);
}
```
