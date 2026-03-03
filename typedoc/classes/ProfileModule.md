[@grabjs/superapp-sdk](../README.md) / ProfileModule

# Class: ProfileModule

JSBridge module for accessing user profile information.

## Remarks

Provides access to user profile data such as email verification.
Requires the MiniApp to be running within the Grab SuperApp's webview.

## Examples

**ES Module:**

```typescript
import { ProfileModule } from '@grabjs/superapp-sdk';
const profile = new ProfileModule();
```

**CDN (UMD):**

```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const profile = new SuperAppSDK.ProfileModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new ProfileModule**(): `ProfileModule`

#### Returns

`ProfileModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### fetchEmail()

> **fetchEmail**(): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\> \| `Promise`\<\{ `error`: `string`; `status_code`: `number`; \}\>

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\> \| `Promise`\<\{ `error`: `string`; `status_code`: `number`; \}\>

---

### verifyEmail()

> **verifyEmail**(`verifyEmailDetails`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\> \| `Promise`\<\{ `error`: `string`; `status_code`: `number`; \}\>

#### Parameters

##### verifyEmailDetails

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\> \| `Promise`\<\{ `error`: `string`; `status_code`: `number`; \}\>

---

### isSupported()

> `static` **isSupported**(): `boolean`

#### Returns

`boolean`

---

### isVersionBelow()

> `static` **isVersionBelow**(`current`: `any`, `min`: `any`): `boolean`

#### Parameters

##### current

`any`

##### min

`any`

#### Returns

`boolean`

---

### parseGrabUserAgent()

> `static` **parseGrabUserAgent**(`userAgent`: `any`): \{ `appName`: `string`; `major`: `number`; `minor`: `number`; `patch`: `number`; `platform`: `string`; \}

#### Parameters

##### userAgent

`any`

#### Returns

\{ `appName`: `string`; `major`: `number`; `minor`: `number`; `patch`: `number`; `platform`: `string`; \}

##### appName

> **appName**: `string`

##### major

> **major**: `number`

##### minor

> **minor**: `number`

##### patch

> **patch**: `number`

##### platform

> **platform**: `string`
