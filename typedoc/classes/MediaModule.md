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

The DRM content configuration.

#### Returns

[`ObserveDRMPlaybackResponse`](../type-aliases/ObserveDRMPlaybackResponse.md)

A `DataStream` that emits playback events as the media plays.
Emits `200` responses with video player events.
Use `subscribe()` to listen for events.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { MediaModule, isResponseOk } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { MediaModule, isResponseOk } = window.SuperAppSDK;

// Initialize the media module
const mediaModule = new MediaModule();

// Observe DRM content playback
const subscription = mediaModule.observePlayDRMContent({
  // DRM content configuration
}).subscribe({
  next: (response) => {
    if (isResponseOk(response)) {
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

> **playDRMContent**(`data`: [`DRMContentConfig`](../type-aliases/DRMContentConfig.md)): `Promise`\<[`PlayDRMContentResponse`](../type-aliases/PlayDRMContentResponse.md)\>

Plays DRM-protected media content in the native media player.

#### Parameters

##### data

[`DRMContentConfig`](../type-aliases/DRMContentConfig.md)

The DRM content configuration.

#### Returns

`Promise`\<[`PlayDRMContentResponse`](../type-aliases/PlayDRMContentResponse.md)\>

A promise that resolves to a response with one of the following possible status codes:
- `200`: Playback initiated (streaming)
- `204`: Invalid parameters

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { MediaModule, isResponseOk, isResponseNoContent } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { MediaModule, isResponseOk, isResponseNoContent } = window.SuperAppSDK;

// Initialize the media module
const mediaModule = new MediaModule();

// Play DRM content
try {
  const response = await mediaModule.playDRMContent({
    // DRM content configuration
  });

  if (isResponseOk(response)) {
    console.log('Playback initiated');
  } else if (isResponseNoContent(response)) {
    console.log('Invalid parameters');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```
