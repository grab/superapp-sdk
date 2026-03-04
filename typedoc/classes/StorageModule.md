[@grabjs/superapp-sdk](../README.md) / StorageModule

# Class: StorageModule

JSBridge module for persisting key-value data to native storage.

## Remarks

Stores data in the native app's persistent storage, allowing data to survive webview restarts.
Requires the MiniApp to be running within the Grab SuperApp's webview.

## Examples

**ES Module:**
```typescript
import { StorageModule } from '@grabjs/superapp-sdk';
const storage = new StorageModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const storage = new SuperAppSDK.StorageModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new StorageModule**(): `StorageModule`

#### Returns

`StorageModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### getBoolean()

> **getBoolean**(`key`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

#### Parameters

##### key

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

***

### getDouble()

> **getDouble**(`key`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

#### Parameters

##### key

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

***

### getInt()

> **getInt**(`key`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

#### Parameters

##### key

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

***

### getString()

> **getString**(`key`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

#### Parameters

##### key

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

***

### remove()

> **remove**(`key`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

#### Parameters

##### key

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

***

### removeAll()

> **removeAll**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

***

### setBoolean()

> **setBoolean**(`key`: `any`, `value`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

#### Parameters

##### key

`any`

##### value

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

***

### setDouble()

> **setDouble**(`key`: `any`, `value`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

#### Parameters

##### key

`any`

##### value

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

***

### setInt()

> **setInt**(`key`: `any`, `value`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

#### Parameters

##### key

`any`

##### value

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

***

### setString()

> **setString**(`key`: `any`, `value`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>

#### Parameters

##### key

`any`

##### value

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`unknown`\>\> \| [`DataStream`](../type-aliases/DataStream.md)\<`unknown`\>
