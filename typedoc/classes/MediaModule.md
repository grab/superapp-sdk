[@grabjs/superapp-sdk](../README.md) / MediaModule

# Class: MediaModule

JSBridge module for playing DRM-protected media content.

## Remarks

Provides access to the native media player with DRM support for secure content playback.
Requires the MiniApp to be running within the Grab SuperApp's webview.

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

> **observePlayDRMContent**(`data`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

#### Parameters

##### data

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

***

### playDRMContent()

> **playDRMContent**(`data`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

#### Parameters

##### data

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>
