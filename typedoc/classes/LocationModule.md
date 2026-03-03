[@grabjs/superapp-sdk](../README.md) / LocationModule

# Class: LocationModule

JSBridge module for accessing device location services.

## Remarks

Provides access to the device's geolocation data including coordinates and country code.
Requires the MiniApp to be running within the Grab SuperApp's webview.

## Examples

**ES Module:**

```typescript
import { LocationModule } from '@grabjs/superapp-sdk';
const location = new LocationModule();
```

**CDN (UMD):**

```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const location = new SuperAppSDK.LocationModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new LocationModule**(): `LocationModule`

#### Returns

`LocationModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### getCoordinate()

> **getCoordinate**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### getCountryCode()

> **getCountryCode**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### observeLocationChange()

> **observeLocationChange**(): [`DataStream`](../type-aliases/DataStream.md)\<`any`\>

#### Returns

[`DataStream`](../type-aliases/DataStream.md)\<`any`\>
