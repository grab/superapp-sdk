[@grabjs/superapp-sdk](../README.md) / ContainerModule

# Class: ContainerModule

JSBridge module for controlling the webview container.

## Remarks

Provides methods to customize the webview UI (title, background color, buttons), manage loading states, send analytics events, and control the webview lifecycle.
Requires the MiniApp to be running within the Grab SuperApp's webview.

## Examples

**ES Module:**

```typescript
import { ContainerModule } from '@grabjs/superapp-sdk';
const container = new ContainerModule();
```

**CDN (UMD):**

```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const container = new SuperAppSDK.ContainerModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new ContainerModule**(): `ContainerModule`

#### Returns

`ContainerModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### \_validateAnalyticsEvent()

> **\_validateAnalyticsEvent**(`eventDetails`: `any`): `"name is required"` \| `"name must be a string"` \| `"state is required"` \| `"state must be a string"` \| `"data must be undefined or an object"`

#### Parameters

##### eventDetails

`any`

#### Returns

`"name is required"` \| `"name must be a string"` \| `"state is required"` \| `"state must be a string"` \| `"data must be undefined or an object"`

---

### close()

> **close**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### getSessionParams()

> **getSessionParams**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### hideBackButton()

> **hideBackButton**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

---

### hideLoader()

> **hideLoader**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### hideRefreshButton()

> **hideRefreshButton**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### isConnected()

> **isConnected**(): \{ `then`: (`callback`: `any`) => `any`; \}

#### Returns

\{ `then`: (`callback`: `any`) => `any`; \}

##### then()

> **then**: (`callback`: `any`) => `any`

###### Parameters

###### callback

`any`

###### Returns

`any`

---

### onContentLoaded()

> **onContentLoaded**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### onCtaTap()

> **onCtaTap**(`action`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### action

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### openExternalLink()

> **openExternalLink**(`url`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### url

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### sendAnalyticsEvent()

> **sendAnalyticsEvent**(`eventDetails`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\> \| \{ `then`: (`callback`: `any`) => `any`; \}

#### Parameters

##### eventDetails

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\> \| \{ `then`: (`callback`: `any`) => `any`; \}

---

### setBackgroundColor()

> **setBackgroundColor**(`backgroundColor`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### backgroundColor

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### setTitle()

> **setTitle**(`title`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### title

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### showBackButton()

> **showBackButton**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### showLoader()

> **showLoader**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### showRefreshButton()

> **showRefreshButton**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>
