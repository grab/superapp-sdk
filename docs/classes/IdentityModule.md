[@grabjs/superapp-sdk](../README.md) / IdentityModule

# Class: IdentityModule

Provides functionality related to user identity and OAuth authorization flows.

## Remarks

This module handles both native and web-based authorization flows with automatic fallback mechanisms.
It manages PKCE (Proof Key for Code Exchange) artifacts and supports different response modes for flexibility.

## Examples

**ES Module:**
```typescript
import { IdentityModule } from '@grabjs/superapp-sdk';

const identityModule = new IdentityModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const identityModule = new SuperAppSDK.IdentityModule();
</script>
```

## Extends

- `BaseModule`

## Constructors

### Constructor

> **new IdentityModule**(): `IdentityModule`

#### Returns

`IdentityModule`

#### Overrides

`BaseModule.constructor`

## Methods

### authorize()

> **authorize**(`request`: [`AuthorizeRequest`](../type-aliases/AuthorizeRequest.md)): `Promise`\<[`AuthorizeResponse`](../type-aliases/AuthorizeResponse.md)\>

Initiates the OAuth authorization flow with support for both native and web consent.

#### Parameters

##### request

[`AuthorizeRequest`](../type-aliases/AuthorizeRequest.md)

Authorization request parameters.

#### Returns

`Promise`\<[`AuthorizeResponse`](../type-aliases/AuthorizeResponse.md)\>

Promise that resolves to [AuthorizeResponse](../type-aliases/AuthorizeResponse.md).

#### Remarks

**Important Note on `redirectUri` and `responseMode`:**

The actual `redirectUri` used during authorization may differ from the one you provide, depending on the flow:
- **`responseMode: 'in_place'` when native flow is available**: Uses the current page URL (normalized) as the `redirectUri`, overriding your provided value
- **`responseMode: 'in_place'` falling back to web flow if native flow is not available**: Uses your provided `redirectUri`
- **`responseMode: 'redirect'`**: Always uses your provided `redirectUri`

To ensure successful token exchange (which requires matching `redirectUri` values), **always retrieve the actual `redirectUri` from [getAuthorizationArtifacts](#getauthorizationartifacts)** after authorization completes.

**Consent Selection Rules (Native vs Web):**
- If the user agent does not match the Grab app pattern, the SDK uses **web consent**.
- If `environment` is `staging`, the SDK **skips version gating** and attempts native consent.
- Otherwise, if the app version in the user agent is below **5.396.0** (iOS or Android), the SDK uses **web consent**.
- For supported versions, the SDK attempts **native consent** first and falls back to web on specific native errors.

#### See

[Environment](../type-aliases/Environment.md), [ResponseMode](../type-aliases/ResponseMode.md)

#### Examples

Using redirect response mode
```typescript
try {
  const request = {
    clientId: "your-client-id",
    scope: "profile openid",
    redirectUri: "https://your-redirect-uri.com",
    environment: "production",
    responseMode: "redirect"
  };

  const { result, error, status_code } = await identityModule.authorize(request);
  if (status_code === 200 && result) {
    console.log("Auth Code:", result.code);
    console.log("State:", result.state);
  } else if (status_code === 302) {
    console.log("Authorization redirect initiated");
  } else if (status_code === 204) {
    console.log("User cancelled");
  }
} catch (error) {
  console.error(error);
}
```

Using in_place response mode
```typescript
try {
  const inPlaceRequest = {
    clientId: "your-client-id",
    scope: "profile openid",
    redirectUri: "https://your-redirect-uri.com",
    environment: "production",
    responseMode: "in_place"
  };

  const response = await identityModule.authorize(inPlaceRequest);
  if (response.status_code === 200 && response.result) {
    const { redirectUri } = await identityModule.getAuthorizationArtifacts();
    console.log("Actual redirect URI:", redirectUri);
  }
} catch (error) {
  console.error(error);
}
```

***

### getAuthorizationArtifacts()

> **getAuthorizationArtifacts**(): `Promise`\<[`GetAuthorizationArtifactsResponse`](../type-aliases/GetAuthorizationArtifactsResponse.md)\>

Retrieves the authorization artifacts that were stored in localStorage during the authorization flow.

#### Returns

`Promise`\<[`GetAuthorizationArtifactsResponse`](../type-aliases/GetAuthorizationArtifactsResponse.md)\>

Promise that resolves to [GetAuthorizationArtifactsResponse](../type-aliases/GetAuthorizationArtifactsResponse.md) with stored artifacts.

#### Remarks

These artifacts include PKCE (Proof Key for Code Exchange) values and the actual `redirectUri` that was used.
These values are needed to complete the OAuth token exchange after the authorization redirect.

**Important:** The `redirectUri` returned by this method is the **actual** redirect URI that was sent to the authorization server.
This may differ from the `redirectUri` you provided to [authorize](#authorize) if you used `responseMode: 'in_place'` with native flow.
You **must** use this returned `redirectUri` for token exchange to ensure OAuth compliance.

#### Example

```typescript
try {
  const { result, status_code, error } = await identityModule.getAuthorizationArtifacts();

  if (status_code === 200 && result) {
    const { state, codeVerifier, nonce, redirectUri } = result;
    console.log("State:", state);
    console.log("Code Verifier:", codeVerifier);
    console.log("Nonce:", nonce);
    console.log("Redirect URI:", redirectUri);

    await exchangeToken({
      code: authCode,
      codeVerifier,
      redirectUri,
    });
  } else if (status_code === 204) {
    console.log("No authorization artifacts found.");
  } else if (status_code === 400) {
    console.error("Authorization artifacts error:", error);
  }
} catch (error) {
  console.error(error);
}
```

***

### clearAuthorizationArtifacts()

> **clearAuthorizationArtifacts**(): `Promise`\<[`ClearAuthorizationArtifactsSuccessResponse`](../type-aliases/ClearAuthorizationArtifactsSuccessResponse.md)\>

Clears all stored authorization artifacts from localStorage.

#### Returns

`Promise`\<[`ClearAuthorizationArtifactsSuccessResponse`](../type-aliases/ClearAuthorizationArtifactsSuccessResponse.md)\>

Promise that resolves to [ClearAuthorizationArtifactsResponse](../type-aliases/ClearAuthorizationArtifactsResponse.md) with status code 204.

#### Remarks

This should be called after a successful token exchange or when you need to reset the authorization state
(e.g., on error or logout).

#### Example

```typescript
try {
  const { status_code } = await identityModule.clearAuthorizationArtifacts();
  if (status_code === 204) {
    console.log("Authorization artifacts cleared successfully");
  }
} catch (error) {
  console.error(error);
}
```
