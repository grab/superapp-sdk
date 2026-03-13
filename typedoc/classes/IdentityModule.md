[@grabjs/superapp-sdk](../README.md) / IdentityModule

# Class: IdentityModule

JSBridge module for authenticating users via GrabID.

## Remarks

Handles OAuth2/OIDC authentication flows with PKCE support, enabling MiniApps to obtain user identity tokens.
Supports both native in-app consent and web-based fallback flows.
This code must run on the Grab SuperApp's webview to function correctly.

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

## Methods

### authorize()

> **authorize**(`request`: [`AuthorizeRequest`](../type-aliases/AuthorizeRequest.md)): `Promise`\<[`AuthorizeResponse`](../type-aliases/AuthorizeResponse.md)\>

Initiates an OAuth2 authorization flow with PKCE (Proof Key for Code Exchange).
This method handles both native in-app consent and web-based fallback flows.

#### Parameters

##### request

[`AuthorizeRequest`](../type-aliases/AuthorizeRequest.md)

Authorization parameters including client ID, redirect URI, scope, and environment.

#### Returns

`Promise`\<[`AuthorizeResponse`](../type-aliases/AuthorizeResponse.md)\>

The authorization result, containing the authorization code on success or redirect status.

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

#### Example

**Simple usage**
```typescript
// Initialize the identity module
const identityModule = new IdentityModule();

// Initiate authorization with redirect mode
const response = await identityModule.authorize({
  clientId: 'your-client-id',
  redirectUri: 'https://your-app.com/callback',
  scope: 'openid profile',
  environment: 'production',
  responseMode: 'redirect'
  });

switch (response.status_code) {
  case 200:
    // Authorization successful (in_place mode with native flow)
    console.log('Auth Code:', response.result.code);
    console.log('State:', response.result.state);
    break;
  case 302:
    // Redirect in progress (web flow with responseMode: 'redirect')
    // The page will be redirected to the authorization URL
    console.log('Redirecting to authorization...');
    break;
  case 204:
    // User cancelled or flow completed without result data
    console.log('Authorization cancelled or no content');
    break;
  case 400:
    // Authorization failed
    console.error('Auth error:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```

***

### clearAuthorizationArtifacts()

> **clearAuthorizationArtifacts**(): `Promise`\<[`BridgeStatusCode204Response`](../type-aliases/BridgeStatusCode204Response.md)\>

Clears all stored PKCE authorization artifacts from local storage.
This should be called after a successful token exchange or when you need to
reset the authorization state (e.g., on error or logout).

#### Returns

`Promise`\<[`BridgeStatusCode204Response`](../type-aliases/BridgeStatusCode204Response.md)\>

Confirmation that the authorization artifacts have been cleared.

#### Example

**Simple usage**
```typescript
// Initialize the identity module
const identityModule = new IdentityModule();

// Clear stored authorization artifacts after successful token exchange
const response = await identityModule.clearAuthorizationArtifacts();

if (response.status_code === 204) {
  console.log('Authorization artifacts cleared');
}
```

***

### getAuthorizationArtifacts()

> **getAuthorizationArtifacts**(): `Promise`\<[`GetAuthorizationArtifactsResponse`](../type-aliases/GetAuthorizationArtifactsResponse.md)\>

Retrieves stored PKCE authorization artifacts from local storage.
These artifacts are used to complete the OAuth2 authorization code exchange.

#### Returns

`Promise`\<[`GetAuthorizationArtifactsResponse`](../type-aliases/GetAuthorizationArtifactsResponse.md)\>

The stored PKCE artifacts including state, code verifier, nonce, and redirect URI.

#### Remarks

**Important:** The `redirectUri` returned by this method is the actual redirect URI
that was sent to the authorization server. This may differ from the `redirectUri`
you provided to `authorize()` if you used `responseMode: 'in_place'` with native flow.
You must use this returned `redirectUri` for token exchange to ensure OAuth compliance.

#### Example

**Simple usage**
```typescript
// Initialize the identity module
const identityModule = new IdentityModule();

// Retrieve stored authorization artifacts after authorization redirect
const response = await identityModule.getAuthorizationArtifacts();

switch (response.status_code) {
  case 200:
    // All artifacts present - proceed with token exchange
    const { state, codeVerifier, nonce, redirectUri } = response.result;
    console.log('State:', state);
    console.log('Code Verifier:', codeVerifier);
    console.log('Nonce:', nonce);
    console.log('Redirect URI:', redirectUri);
    break;
  case 204:
    // No artifacts yet - user hasn't authorized
    console.log('No authorization artifacts found. Authorization has not been initiated.');
    break;
  case 400:
    // Inconsistent state - possible data corruption
    console.error('Authorization artifacts error:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```
