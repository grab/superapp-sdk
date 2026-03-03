[@grabjs/superapp-sdk](../README.md) / IdentityModule

# Class: IdentityModule

JSBridge module for authenticating users via GrabID.

## Remarks

Handles OAuth2/OIDC authentication flows with PKCE support, enabling MiniApps to obtain user identity tokens.
Supports both native in-app consent and web-based fallback flows.
Requires the MiniApp to be running within the Grab SuperApp's webview.

## Examples

**ES Module:**

```typescript
import { IdentityModule } from '@grabjs/superapp-sdk';
const identity = new IdentityModule();
```

**CDN (UMD):**

```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const identity = new SuperAppSDK.IdentityModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new IdentityModule**(): `IdentityModule`

#### Returns

`IdentityModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Accessors

### CODE_CHALLENGE_METHOD

#### Get Signature

> **get** **CODE_CHALLENGE_METHOD**(): `string`

##### Returns

`string`

---

### CODE_VERIFIER_LENGTH

#### Get Signature

> **get** **CODE_VERIFIER_LENGTH**(): `number`

##### Returns

`number`

---

### NAMESPACE

#### Get Signature

> **get** **NAMESPACE**(): `string`

##### Returns

`string`

---

### NONCE_LENGTH

#### Get Signature

> **get** **NONCE_LENGTH**(): `number`

##### Returns

`number`

---

### OPENID_CONFIG_ENDPOINTS

#### Get Signature

> **get** **OPENID_CONFIG_ENDPOINTS**(): \{ `production`: `string`; `staging`: `string`; \}

##### Returns

\{ `production`: `string`; `staging`: `string`; \}

###### production

> **production**: `string` = `'https://partner-api.grab.com/grabid/v1/oauth2/.well-known/openid-configuration'`

###### staging

> **staging**: `string` = `'https://partner-api.stg-myteksi.com/grabid/v1/oauth2/.well-known/openid-configuration'`

---

### STATE_LENGTH

#### Get Signature

> **get** **STATE_LENGTH**(): `number`

##### Returns

`number`

## Methods

### authorize()

> **authorize**(`request`: `any`): `Promise`\<[`BridgeNoResultResponse`](../type-aliases/BridgeNoResultResponse.md) \| \{ `error`: `any`; `status_code`: `number`; \} \| \{ `result`: `any`; `status_code`: `number`; \}\>

#### Parameters

##### request

`any`

#### Returns

`Promise`\<[`BridgeNoResultResponse`](../type-aliases/BridgeNoResultResponse.md) \| \{ `error`: `any`; `status_code`: `number`; \} \| \{ `result`: `any`; `status_code`: `number`; \}\>

---

### clearAuthorizationArtifacts()

> **clearAuthorizationArtifacts**(): `Promise`\<\{ `error`: `any`; `result`: `any`; `status_code`: `number`; \}\>

#### Returns

`Promise`\<\{ `error`: `any`; `result`: `any`; `status_code`: `number`; \}\>

---

### fetchAuthorizationEndpoint()

> **fetchAuthorizationEndpoint**(`environment`: `any`): `Promise`\<`any`\>

#### Parameters

##### environment

`any`

#### Returns

`Promise`\<`any`\>

---

### generatePKCEArtifacts()

> **generatePKCEArtifacts**(): \{ `codeChallenge`: `any`; `codeChallengeMethod`: `string`; `codeVerifier`: `any`; `nonce`: `string`; `state`: `string`; \}

#### Returns

\{ `codeChallenge`: `any`; `codeChallengeMethod`: `string`; `codeVerifier`: `any`; `nonce`: `string`; `state`: `string`; \}

##### codeChallenge

> **codeChallenge**: `any`

##### codeChallengeMethod

> **codeChallengeMethod**: `string`

##### codeVerifier

> **codeVerifier**: `any`

##### nonce

> **nonce**: `string`

##### state

> **state**: `string`

---

### getAuthorizationArtifacts()

> **getAuthorizationArtifacts**(): `Promise`\<\{ `error`: `any`; `result`: `any`; `status_code`: `number`; \}\>

#### Returns

`Promise`\<\{ `error`: `any`; `result`: `any`; `status_code`: `number`; \}\>

---

### getStorageItem()

> **getStorageItem**(`key`: `any`): `string`

#### Parameters

##### key

`any`

#### Returns

`string`

---

### performWebAuthorization()

> **performWebAuthorization**(`params`: `any`): `Promise`\<\{ `error`: `any`; `status_code`: `number`; \} \| \{ `result`: `any`; `status_code`: `number`; \}\>

#### Parameters

##### params

`any`

#### Returns

`Promise`\<\{ `error`: `any`; `status_code`: `number`; \} \| \{ `result`: `any`; `status_code`: `number`; \}\>

---

### setStorageItem()

> **setStorageItem**(`key`: `any`, `value`: `any`): `void`

#### Parameters

##### key

`any`

##### value

`any`

#### Returns

`void`

---

### storePKCEArtifacts()

> **storePKCEArtifacts**(`artifacts`: `any`): `void`

#### Parameters

##### artifacts

`any`

#### Returns

`void`

---

### base64URLEncode()

> `static` **base64URLEncode**(`str`: `any`): `any`

#### Parameters

##### str

`any`

#### Returns

`any`

---

### buildAuthorizeUrl()

> `static` **buildAuthorizeUrl**(`authorizationEndpoint`: `any`, `requestMap`: `any`): `string`

#### Parameters

##### authorizationEndpoint

`any`

##### requestMap

`any`

#### Returns

`string`

---

### generateCodeChallenge()

> `static` **generateCodeChallenge**(`codeVerifier`: `any`): `any`

#### Parameters

##### codeVerifier

`any`

#### Returns

`any`

---

### generateCodeVerifier()

> `static` **generateCodeVerifier**(`len`: `any`): `any`

#### Parameters

##### len

`any`

#### Returns

`any`

---

### generateRandomString()

> `static` **generateRandomString**(`length`: `any`): `string`

#### Parameters

##### length

`any`

#### Returns

`string`

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

### normalizeUrl()

> `static` **normalizeUrl**(`urlString`: `any`): `string`

#### Parameters

##### urlString

`any`

#### Returns

`string`

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

---

### performNativeAuthorization()

> `static` **performNativeAuthorization**(`invokeParams`: `any`): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

#### Parameters

##### invokeParams

`any`

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`any`\>\>

---

### shouldUseWebConsent()

> `static` **shouldUseWebConsent**(`request`: `any`): `boolean`

#### Parameters

##### request

`any`

#### Returns

`boolean`

---

### validateAuthorizeRequest()

> `static` **validateAuthorizeRequest**(`request`: `any`): `string`

#### Parameters

##### request

`any`

#### Returns

`string`

---

### validateRequiredString()

> `static` **validateRequiredString**(`value`: `any`, `fieldName`: `any`): `string`

#### Parameters

##### value

`any`

##### fieldName

`any`

#### Returns

`string`
