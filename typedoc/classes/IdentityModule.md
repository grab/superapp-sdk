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

### CODE\_CHALLENGE\_METHOD

#### Get Signature

> **get** **CODE\_CHALLENGE\_METHOD**(): `string`

##### Returns

`string`

***

### CODE\_VERIFIER\_LENGTH

#### Get Signature

> **get** **CODE\_VERIFIER\_LENGTH**(): `number`

##### Returns

`number`

***

### NAMESPACE

#### Get Signature

> **get** **NAMESPACE**(): `string`

##### Returns

`string`

***

### NONCE\_LENGTH

#### Get Signature

> **get** **NONCE\_LENGTH**(): `number`

##### Returns

`number`

***

### OPENID\_CONFIG\_ENDPOINTS

#### Get Signature

> **get** **OPENID\_CONFIG\_ENDPOINTS**(): \{ `production`: `string`; `staging`: `string`; \}

##### Returns

\{ `production`: `string`; `staging`: `string`; \}

###### production

> **production**: `string` = `'https://partner-api.grab.com/grabid/v1/oauth2/.well-known/openid-configuration'`

###### staging

> **staging**: `string` = `'https://partner-api.stg-myteksi.com/grabid/v1/oauth2/.well-known/openid-configuration'`

***

### STATE\_LENGTH

#### Get Signature

> **get** **STATE\_LENGTH**(): `number`

##### Returns

`number`

## Methods

### authorize()

> **authorize**(`request`: [`AuthorizeRequest`](../type-aliases/AuthorizeRequest.md)): `Promise`\<[`AuthorizeResponse`](../type-aliases/AuthorizeResponse.md)\>

Initiates an OAuth2 authorization flow with PKCE (Proof Key for Code Exchange).
This method handles both native in-app consent and web-based fallback flows.

#### Parameters

##### request

[`AuthorizeRequest`](../type-aliases/AuthorizeRequest.md)

The authorization request parameters including client ID, redirect URI,
                 scopes, and environment.

#### Returns

`Promise`\<[`AuthorizeResponse`](../type-aliases/AuthorizeResponse.md)\>

Resolves when the authorization flow is initiated.
         - Status 200: Authorization completed successfully (native in_place flow)
         - Status 302: Redirect initiated (web flow or redirect response mode)
         - Status 204: User cancelled the authorization
         - Status 400/401/403: Authorization failed with error details

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Remarks

**Important Note on redirectUri and responseMode:**

The actual `redirectUri` used during authorization may differ from the one you provide,
depending on the flow:

- `responseMode: 'in_place'` when native flow is available: Uses the current page URL
  (normalized) as the `redirectUri`, overriding your provided value
- `responseMode: 'in_place'` falling back to web flow if native flow is not available:
  Uses your provided `redirectUri`
- `responseMode: 'redirect'`: Always uses your provided `redirectUri`

To ensure successful token exchange (which requires matching `redirectUri` values),
always retrieve the actual `redirectUri` from `getAuthorizationArtifacts()`
after authorization completes.

**Consent Selection Rules (Native vs Web):**

- If the user agent does not match the Grab app pattern, the SDK uses web consent
- If the app version in the user agent is below 5.396.0 (iOS or Android),
  the SDK uses web consent
- For supported versions, the SDK attempts native consent first and falls back to
  web on specific native errors (400, 401, 403)

#### Examples

Initiate authorization with redirect mode
```typescript
const response = await identityModule.authorize({
  clientId: 'your-client-id',
  redirectUri: 'https://your-app.com/callback',
  scope: 'openid profile',
  environment: 'production',
  responseMode: 'redirect'
});
```

Handling the response
```typescript
const { result, error, status_code } = await identityModule.authorize({
  clientId: 'your-client-id',
  redirectUri: 'https://your-app.com/callback',
  scope: 'openid profile',
  environment: 'production',
  responseMode: 'redirect'
});

if (status_code === 200 && result) {
  // Authorization successful (in_place mode with native flow)
  console.log('Auth Code:', result.code);
  console.log('State:', result.state);
} else if (status_code === 302) {
  // Authorization redirect initiated (web flow or redirect response mode)
  // The page will redirect to the authorization server
} else if (status_code === 204) {
  // User cancelled the authorization
  console.log('User cancelled');
} else if (error) {
  // Authorization failed
  console.error('Auth error:', error);
}
```

***

### clearAuthorizationArtifacts()

> **clearAuthorizationArtifacts**(): `Promise`\<[`ClearAuthorizationArtifactsResponse`](../type-aliases/ClearAuthorizationArtifactsResponse.md)\>

Clears all stored PKCE authorization artifacts from local storage.
This should be called after a successful token exchange or when you need to
reset the authorization state (e.g., on error or logout).

#### Returns

`Promise`\<[`ClearAuthorizationArtifactsResponse`](../type-aliases/ClearAuthorizationArtifactsResponse.md)\>

Resolves with status 204 when artifacts are cleared successfully.
         The result and error fields will always be null for this operation.

#### Example

Clear stored authorization artifacts after successful token exchange
```typescript
const { status_code } = await identityModule.clearAuthorizationArtifacts();
if (status_code === 204) {
  console.log('Authorization artifacts cleared');
}
```

***

### fetchAuthorizationEndpoint()

> **fetchAuthorizationEndpoint**(`environment`: `any`): `Promise`\<`any`\>

#### Parameters

##### environment

`any`

#### Returns

`Promise`\<`any`\>

***

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

***

### getAuthorizationArtifacts()

> **getAuthorizationArtifacts**(): `Promise`\<[`GetAuthorizationArtifactsResponse`](../type-aliases/GetAuthorizationArtifactsResponse.md)\>

Retrieves stored PKCE authorization artifacts from local storage.
These artifacts are used to complete the OAuth2 authorization code exchange.

#### Returns

`Promise`\<[`GetAuthorizationArtifactsResponse`](../type-aliases/GetAuthorizationArtifactsResponse.md)\>

Resolves with the stored artifacts if all are present (status 200),
         no content if none are present (status 204),
         or an error if artifacts are inconsistent (status 400).

#### Remarks

**Important:** The `redirectUri` returned by this method is the actual redirect URI
that was sent to the authorization server. This may differ from the `redirectUri`
you provided to `authorize()` if you used `responseMode: 'in_place'` with native flow.
You must use this returned `redirectUri` for token exchange to ensure OAuth compliance.

#### Example

Retrieve stored authorization artifacts after authorization redirect
```typescript
const { result, status_code, error } = await identityModule.getAuthorizationArtifacts();

if (status_code === 200 && result) {
  // All artifacts present - proceed with token exchange
  const { state, codeVerifier, nonce, redirectUri } = result;
  console.log('State:', state);
  console.log('Code Verifier:', codeVerifier);
  console.log('Nonce:', nonce);
  console.log('Redirect URI:', redirectUri);
} else if (status_code === 204) {
  // No artifacts yet - user hasn't authorized
  console.log('No authorization artifacts found. Authorization has not been initiated.');
} else if (status_code === 400) {
  // Inconsistent state - possible data corruption
  console.error('Authorization artifacts error:', error);
}
```

***

### getStorageItem()

> **getStorageItem**(`key`: `any`): `string`

#### Parameters

##### key

`any`

#### Returns

`string`

***

### performNativeAuthorization()

> **performNativeAuthorization**(`invokeParams`: `any`): `Promise`\<[`AuthorizeResponse`](../type-aliases/AuthorizeResponse.md)\>

#### Parameters

##### invokeParams

`any`

#### Returns

`Promise`\<[`AuthorizeResponse`](../type-aliases/AuthorizeResponse.md)\>

***

### performWebAuthorization()

> **performWebAuthorization**(`params`: `any`): `Promise`\<[`AuthorizeResponse`](../type-aliases/AuthorizeResponse.md)\>

#### Parameters

##### params

`any`

#### Returns

`Promise`\<[`AuthorizeResponse`](../type-aliases/AuthorizeResponse.md)\>

***

### setStorageItem()

> **setStorageItem**(`key`: `any`, `value`: `any`): `void`

#### Parameters

##### key

`any`

##### value

`any`

#### Returns

`void`

***

### storePKCEArtifacts()

> **storePKCEArtifacts**(`artifacts`: `any`): `void`

#### Parameters

##### artifacts

`any`

#### Returns

`void`

***

### base64URLEncode()

> `static` **base64URLEncode**(`str`: `any`): `any`

#### Parameters

##### str

`any`

#### Returns

`any`

***

### buildAuthorizeUrl()

> `static` **buildAuthorizeUrl**(`authorizationEndpoint`: `any`, `requestMap`: `any`): `string`

#### Parameters

##### authorizationEndpoint

`any`

##### requestMap

`any`

#### Returns

`string`

***

### generateCodeChallenge()

> `static` **generateCodeChallenge**(`codeVerifier`: `any`): `any`

#### Parameters

##### codeVerifier

`any`

#### Returns

`any`

***

### generateCodeVerifier()

> `static` **generateCodeVerifier**(`len`: `any`): `any`

#### Parameters

##### len

`any`

#### Returns

`any`

***

### generateRandomString()

> `static` **generateRandomString**(`length`: `any`): `string`

#### Parameters

##### length

`any`

#### Returns

`string`

***

### normalizeUrl()

> `static` **normalizeUrl**(`urlString`: `any`): `string`

#### Parameters

##### urlString

`any`

#### Returns

`string`

***

### shouldUseWebConsent()

> `static` **shouldUseWebConsent**(`request`: `any`): `boolean`

#### Parameters

##### request

`any`

#### Returns

`boolean`

***

### validateAuthorizeRequest()

> `static` **validateAuthorizeRequest**(`request`: `any`): `string`

#### Parameters

##### request

`any`

#### Returns

`string`

***

### validateRequiredString()

> `static` **validateRequiredString**(`value`: `any`, `fieldName`: `any`): `string`

#### Parameters

##### value

`any`

##### fieldName

`any`

#### Returns

`string`
