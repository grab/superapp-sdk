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

### invoke()

> **invoke**\<`T`\>(`options`: [`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>\>

Invokes a JSBridge method with optional app validation and response transformation.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>

The invoke options including method name, params, validation, and transformation.

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>\>

A promise resolving to the JSBridge response.

#### Remarks

- Always checks if running in Grab app (returns 501 if not).
- When `isSupported` returns false, returns 426 (Upgrade Required).
- When `transformResponse` is provided, applies it to successful responses.
- All errors are reported via the `status_code` field; this method never rejects.
- For streaming methods, use `invokeStream` instead.

#### Inherited from

[`BaseModule`](BaseModule.md).[`invoke`](BaseModule.md#invoke)

***

### invokeStream()

> **invokeStream**\<`T`\>(`options`: `Omit`\<[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>, `"transformResponse"`\>): [`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

Invokes a JSBridge streaming method that returns a `BridgeStream`.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

`Omit`\<[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>, `"transformResponse"`\>

The invoke options including method name, params, and validation.

#### Returns

[`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

A `BridgeStream` for receiving continuous data from the JSBridge.

#### Remarks

- Always checks if running in Grab app (returns 501 error response if not).
- When `isSupported` returns false, returns 426 error response.
- Returns a `BridgeStream` that can be subscribed to or awaited for the first value.
- All errors are reported via error responses in the stream; this method never rejects.

#### Inherited from

[`BaseModule`](BaseModule.md).[`invokeStream`](BaseModule.md#invokestream)

***

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

#### Example

**Simple usage**
```typescript
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

> **playDRMContent**(`data`: [`DRMContentConfig`](../type-aliases/DRMContentConfig.md)): `Promise`\<[`PlayDRMContentResponse`](../type-aliases/PlayDRMContentResponse.md)\>

Plays DRM-protected media content in the native media player.

#### Parameters

##### data

[`DRMContentConfig`](../type-aliases/DRMContentConfig.md)

Configuration for the DRM content including license URL and content metadata.

#### Returns

`Promise`\<[`PlayDRMContentResponse`](../type-aliases/PlayDRMContentResponse.md)\>

The playback initiation result, indicating if the DRM content started playing.

#### Example

**Simple usage**
```typescript
// Initialize the media module
const mediaModule = new MediaModule();

// Play DRM content
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
```
