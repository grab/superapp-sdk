[@grabjs/superapp-sdk](../README.md) / IdentityModule

# Class: IdentityModule

The IdentityModule provides functionality related to user identity and OAuth authorization flows.

This module handles both native and web-based authorization flows with automatic fallback mechanisms.
It manages PKCE (Proof Key for Code Exchange) artifacts and supports different response modes for flexibility.

## Example

```javascript
import { IdentityModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only once and reuse across app.
const identityModule = new IdentityModule();
```

## Extends

- `ModuleBase`

## Constructors

### Constructor

> **new IdentityModule**(): `IdentityModule`

#### Returns

`IdentityModule`

#### Overrides

`ModuleBase.constructor`

## Methods

### authorize()

> **authorize**(`request`: [`AuthorizeRequest`](../type-aliases/AuthorizeRequest.md)): `Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`any`\>\>

Initiates the OAuth authorization flow with support for both native and web consent.

#### Parameters

##### request

[`AuthorizeRequest`](../type-aliases/AuthorizeRequest.md)

Authorization request parameters.
  - `clientId`: Client ID for authorization (required)
  - `scope`: Scope of the authorization (required)
  - `redirectUri`: Redirect URI for authorization callback (required)
  - `environment`: Environment ('staging' or 'production'). Used to fetch the authorization endpoint from the OpenID configuration for the web flow (required)
  - `responseMode`: Response mode ('redirect' or 'in_place'). Defaults to 'redirect' if not specified (optional)

#### Returns

`Promise`\<[`WrappedResponse`](../type-aliases/WrappedResponse.md)\<`any`\>\>

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

**Status Codes:**
- `200`: Authorization successful (in_place mode with native flow)
- `302`: Authorization redirect initiated (web flow or redirect response mode)
- `204`: User cancelled the authorization
- `400`: Invalid request or configuration error

#### See

[Environment](../type-aliases/Environment.md), [ResponseMode](../type-aliases/ResponseMode.md)

#### Example

```javascript
// Example 1: Using redirect response mode
const request = {
  clientId: "your-client-id",
  scope: "profile openid",
  redirectUri: "https://your-redirect-uri.com",
  environment: "production", // or "staging"
  responseMode: "redirect"
};

const { result, error, status_code } = await identityModule.authorize(request);
if (status_code === 200 && result) {
  // Authorization successful (in_place mode with native flow)
  console.log("Auth Code:", result.code);
  console.log("State:", result.state);
} else if (status_code === 302) {
  // Authorization redirect initiated (web flow or redirect response mode)
  // The page will redirect to the authorization server
} else if (status_code === 204) {
  // User cancelled the authorization
  console.log("User cancelled");
} else if (error) {
  // Authorization failed
  console.error("Auth error:", error);
}

// Example 2: Using in_place response mode
const inPlaceRequest = {
  clientId: "your-client-id",
  scope: "profile openid",
  redirectUri: "https://your-redirect-uri.com",
  environment: "production",
  responseMode: "in_place"
};

const response = await identityModule.authorize(inPlaceRequest);
if (response.status_code === 200 && response.result) {
  // Get the actual redirectUri used
  const { redirectUri } = await identityModule.getAuthorizationArtifacts();
  console.log("Actual redirect URI:", redirectUri);
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

**Status Codes:**
- `200`: All four artifacts are present and returned in `result`
- `204`: No artifacts are stored (authorization has not been called yet)
- `400`: Inconsistent state detected (only some artifacts present, possible data corruption)

#### Example

```javascript
// After authorization redirect, retrieve the stored artifacts
const { result, status_code, error } = await identityModule.getAuthorizationArtifacts();

if (status_code === 200 && result) {
  // All artifacts present - proceed with token exchange
  const { state, codeVerifier, nonce, redirectUri } = result;
  console.log("State:", state);
  console.log("Code Verifier:", codeVerifier);
  console.log("Nonce:", nonce);
  console.log("Redirect URI:", redirectUri);
  
  // Use these values for token exchange
  await exchangeToken({
    code: authCode,
    codeVerifier,
    redirectUri, // Use the actual redirectUri from artifacts
  });
} else if (status_code === 204) {
  // No artifacts yet - user hasn't authorized
  console.log("No authorization artifacts found.");
} else if (status_code === 400) {
  // Inconsistent state - possible data corruption
  console.error("Authorization artifacts error:", error);
}
```

***

### clearAuthorizationArtifacts()

> **clearAuthorizationArtifacts**(): `Promise`\<[`ClearAuthorizationArtifactsResponse`](../type-aliases/ClearAuthorizationArtifactsResponse.md)\>

Clears all stored authorization artifacts from localStorage.

#### Returns

`Promise`\<[`ClearAuthorizationArtifactsResponse`](../type-aliases/ClearAuthorizationArtifactsResponse.md)\>

Promise that resolves to [ClearAuthorizationArtifactsResponse](../type-aliases/ClearAuthorizationArtifactsResponse.md) with status code 204.

#### Remarks

This should be called after a successful token exchange or when you need to reset the authorization state
(e.g., on error or logout).

**Status Codes:**
- `204`: No Content - successful operation

#### Example

```javascript
// After successful token exchange
const { status_code } = await identityModule.clearAuthorizationArtifacts();
if (status_code === 204) {
  console.log("Authorization artifacts cleared successfully");
}

// On error or logout
try {
  await exchangeToken(params);
} catch (error) {
  console.error("Token exchange failed:", error);
  // Clear artifacts to reset state
  await identityModule.clearAuthorizationArtifacts();
}
```
