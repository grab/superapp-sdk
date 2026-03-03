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

> **getBoolean**(`key`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### key

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### getDouble()

> **getDouble**(`key`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### key

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### getInt()

> **getInt**(`key`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### key

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### getString()

> **getString**(`key`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### key

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### remove()

> **remove**(`key`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### key

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### removeAll()

> **removeAll**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### setBoolean()

> **setBoolean**(`key`: `any`, `value`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### key

`any`

##### value

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### setDouble()

> **setDouble**(`key`: `any`, `value`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### key

`any`

##### value

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### setInt()

> **setInt**(`key`: `any`, `value`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### key

`any`

##### value

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### setString()

> **setString**(`key`: `any`, `value`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### key

`any`

##### value

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>
