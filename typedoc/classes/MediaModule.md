[@grabjs/superapp-sdk](../README.md) / MediaModule

# Class: MediaModule

JSBridge module for playing DRM-protected media content.

## Remarks

Provides access to the native media player with DRM support for secure content playback.
This code must run on the Grab SuperApp's webview to function correctly.

## Examples

**ES Module:**
```typescript
import { MediaModule } from '@grabjs/superapp-sdk';
const media = new MediaModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const media = new SuperAppSDK.MediaModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new MediaModule**(): `MediaModule`

#### Returns

`MediaModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### observePlayDRMContent()

> **observePlayDRMContent**(`data`: [`DRMContentConfig`](../type-aliases/DRMContentConfig.md)): [`ObserveDRMPlaybackResponse`](../type-aliases/ObserveDRMPlaybackResponse.md)

Observes DRM-protected media content playback events.

#### Parameters

##### data

[`DRMContentConfig`](../type-aliases/DRMContentConfig.md)

Configuration for the DRM content to observe.

#### Returns

[`ObserveDRMPlaybackResponse`](../type-aliases/ObserveDRMPlaybackResponse.md)

A stream that emits playback events as the media plays.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { MediaModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { MediaModule } = window.SuperAppSDK;

// Initialize the media module
const mediaModule = new MediaModule();

// Observe DRM content playback
const subscription = mediaModule.observePlayDRMContent({
  // DRM content configuration
}).subscribe({
  next: (response) => {
    if (response.status_code === 200) {
      console.log('Playback event:', response.result);
    }
  },
  complete: () => console.log('Playback completed')
});

// Later, to stop receiving events:
subscription.unsubscribe();
```

***

### playDRMContent()

> **playDRMContent**(`data`: [`DRMContentConfig`](../type-aliases/DRMContentConfig.md)): [`PlayDRMContentResponse`](../type-aliases/PlayDRMContentResponse.md)

Plays DRM-protected media content in the native media player.

#### Parameters

##### data

[`DRMContentConfig`](../type-aliases/DRMContentConfig.md)

Configuration for the DRM content including license URL and content metadata.

#### Returns

[`PlayDRMContentResponse`](../type-aliases/PlayDRMContentResponse.md)

The playback initiation result, indicating if the DRM content started playing.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { MediaModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { MediaModule } = window.SuperAppSDK;

// Initialize the media module
const mediaModule = new MediaModule();

// Play DRM content
try {
  const response = await mediaModule.playDRMContent({
    // DRM content configuration
  });

  switch (response.status_code) {
    case 200:
      console.log('Playback initiated');
      break;
    case 204:
      console.log('Invalid parameters');
      break;
    case 501:
      console.log('Not in Grab app:', response.error);
      break;
    default:
      console.log('Unexpected status code:', response);
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```
