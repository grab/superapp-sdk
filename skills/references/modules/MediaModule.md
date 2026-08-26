# MediaModule

## API Reference

SDK module for playing DRM-protected media content via `JSBridge`.

- `observePlayDRMContent(data: DRMContentConfig): ObserveDRMPlaybackResponse` — Observes DRM-protected media content playback events. (**OAuth Scope:** mobile.media)

This stream can emit the following `status_code` values:
- `200` (OK): Stream emitted a playback event. The `result` contains DRMPlaybackEvent.
- `500` (Internal Server Error): Stream emitted an unexpected error.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { MediaModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the media module
const media = new MediaModule();

// Observe DRM content playback
const subscription = media.observePlayDRMContent({
  // DRM content configuration
}).subscribe({
  next: (response) => {
    if (isSuccess(response)) {
      console.log('Playback event:', response.result);
    } else if (isError(response)) {
      console.error(`Error ${response.status_code}: ${response.error}`);
    }
  },
  complete: () => console.log('Playback completed')
});

// Later, to stop receiving events:
subscription.unsubscribe();
```

- `playDRMContent(data: DRMContentConfig): Promise<PlayDRMContentResponse>` — Plays DRM-protected media content in the native media player. (**OAuth Scope:** mobile.media)

This method can return the following `status_code` values:
- `200` (OK): Playback initiated successfully.
- `204` (No Content): Request completed.
- `400` (Bad Request): Invalid request parameters.
- `424` (Failed Dependency): Underlying native request failed.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { MediaModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the media module
const media = new MediaModule();

// Play DRM content
const response = await media.playDRMContent({
  // DRM content configuration
});

// Handle the response
if (isSuccess(response)) {
  switch (response.status_code) {
    case 200:
      console.log('Playback initiated');
      break;
    case 204:
      console.log('Invalid parameters');
      break;
  }
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```
