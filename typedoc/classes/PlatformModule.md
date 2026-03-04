[@grabjs/superapp-sdk](../README.md) / PlatformModule

# Class: PlatformModule

JSBridge module for controlling platform navigation.

## Remarks

Provides methods to interact with the native platform navigation stack, such as triggering the back action.
Requires the MiniApp to be running within the Grab SuperApp's webview.

## Examples

**ES Module:**
```typescript
import { PlatformModule } from '@grabjs/superapp-sdk';
const platform = new PlatformModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const platform = new SuperAppSDK.PlatformModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new PlatformModule**(): `PlatformModule`

#### Returns

`PlatformModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### back()

> **back**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>
