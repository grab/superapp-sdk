# IdentityModule

## Description

The IdentityModule provides functionality related to user identity.

## Methods

### 1. Authorize

**Method name**: `authorize`

**Arguments**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| request | Object | Yes | Authorization request parameters |

**Request Object Properties**

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| clientId | String | Yes | Client ID for authorization |
| scope | String | Yes | Scope of the authorization |
| redirectUri | String | Yes | Redirect URI for authorization callback |
| environment | String | Yes | Environment ('staging' or 'production'). Used to fetch the authorization endpoint from the OpenID configuration for the web flow |
| responseMode | String | No | Response mode ('redirect' or 'in_place'). Defaults to 'redirect' if not specified |

**Important Note on `redirectUri` and `responseMode`:**

The actual `redirectUri` used during authorization may differ from the one you provide, depending on the flow:

- **`responseMode: 'in_place'` with native authorization available**: Uses the current page URL (normalized) as the `redirectUri`, overriding your provided value
- **`responseMode: 'in_place'` falling back to web flow**: Uses your provided `redirectUri`
- **`responseMode: 'redirect'`**: Always uses your provided `redirectUri`

To ensure successful token exchange (which requires matching `redirectUri` values), **always retrieve the actual `redirectUri` from `getAuthorizationArtifacts()`** after authorization completes.

**Return type**

| Name | Type | Description |
| --- | --- | --- |
| result | Object | Result of the authorization |
| error | String | Error message if authorization fails |
| status_code | Number | HTTP status code (e.g. 200 for success, 499 for user cancellation) |

**Result Object Properties**

| Property | Type | Description |
| --- | --- | --- |
| state | String | The state parameter returned from the server |
| code | String | The authorization code returned from the server |

**Code example**

```javascript
import { IdentityModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const identityModule = new IdentityModule();

const request = {
  clientId: "your-client-id",
  scope: "profile openid",
  redirectUri: "https://your-redirect-uri.com",
  environment: "production", // or "staging"
  responseMode: "redirect"
};

identityModule.authorize(request).then(({ result, error, status_code }) => {
  if (status_code === 200 && result) {
    // Authorization successful (in_place mode with native authorization)
    console.log("Auth Code:", result.code);
    console.log("State:", result.state);
    
    // Important: Get the actual redirectUri used for token exchange
    const artifacts = await identityModule.getAuthorizationArtifacts();
    console.log("Actual redirectUri:", artifacts.result.redirectUri);
  } else if (status_code === 302) {
    // Authorization redirect initiated (web flow or redirect mode)
    // The page will redirect to the authorization server
    // After callback, use getAuthorizationArtifacts() to retrieve stored values
  } else if (status_code === 499) {
    // User cancelled the authorization
    console.log("User cancelled");
  } else if (error) {
    // Authorization failed
    console.error("Auth error:", error);
  }
});
```

### 2. Get Authorization Artifacts

**Method name**: `getAuthorizationArtifacts`

**Description**

Retrieves the authorization artifacts that were stored in localStorage during the authorization flow. These include PKCE (Proof Key for Code Exchange) values and the actual `redirectUri` that was used. These values are needed to complete the OAuth token exchange after the authorization redirect.

**Important:** The `redirectUri` returned by this method is the **actual** redirect URI that was sent to the authorization server. This may differ from the `redirectUri` you provided to `authorize()` if you used `responseMode: 'in_place'` with native authorization. You **must** use this returned `redirectUri` for token exchange to ensure OAuth compliance.

**Arguments**

None

**Return type**

| Name | Type | Description |
| --- | --- | --- |
| result | Object \| null | Object containing the authorization artifacts (200), or null if not stored (204) or inconsistent (400) |
| error | String \| null | Error message if artifacts are inconsistent (400), otherwise null |
| status_code | Number | HTTP status code: 200 (success), 204 (no artifacts), or 400 (inconsistent state) |

**Result Object Properties**

When `status_code` is 200, the `result` object contains:

| Property | Type | Description |
| --- | --- | --- |
| state | String | The state parameter used for CSRF protection |
| codeVerifier | String | The PKCE code verifier used for token exchange |
| nonce | String | The nonce used for ID token verification |
| redirectUri | String | The actual redirect URI that was used during authorization |

**Status Codes**

- **200**: All four artifacts are present and returned in `result`
- **204**: No artifacts are stored (authorization has not been called yet)
- **400**: Inconsistent state detected (only some artifacts present, possible data corruption)

**Code example**

```javascript
import { IdentityModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only once and reuse across app.
const identityModule = new IdentityModule();

// After authorization redirect, retrieve the stored artifacts
const { result, status_code, error } = await identityModule.getAuthorizationArtifacts();

if (status_code === 200 && result) {
  // All artifacts present - proceed with token exchange
  const { state, codeVerifier, nonce, redirectUri } = result;
  console.log("State:", state);
  console.log("Code Verifier:", codeVerifier);
  console.log("Nonce:", nonce);
  console.log("Redirect URI:", redirectUri);
  
  // Use these values to:
  // 1. Verify the state parameter from the redirect matches state
  // 2. Exchange the authorization code for tokens using codeVerifier and redirectUri
  // 3. Validate the nonce in the ID token matches nonce
  
  // Example token exchange call:
  const tokenResponse = await fetch('https://token-endpoint.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: authorizationCode, // from URL callback
      redirect_uri: redirectUri, // MUST match the one used in authorization
      code_verifier: codeVerifier,
      client_id: 'your-client-id'
    })
  });
  
  // After successful token exchange, clean up
  identityModule.clearAuthorizationArtifacts();
} else if (status_code === 204) {
  // No artifacts yet - user hasn't authorized
  console.log("No authorization artifacts found. Authorization has not been initiated.");
} else if (status_code === 400) {
  // Inconsistent state - possible data corruption
  console.error("Authorization artifacts error:", error);
  // Clear artifacts and restart the authorization flow
  identityModule.clearAuthorizationArtifacts();
}
```

### 3. Clear Authorization Artifacts

**Method name**: `clearAuthorizationArtifacts`

**Description**

Clears all stored authorization artifacts from localStorage. This should be called after a successful token exchange or when you need to reset the authorization state (e.g., on error or logout).

**Arguments**

None

**Return type**

None (void)

**Code example**

```javascript
import { IdentityModule } from "@grabjs/superapp-sdk";

const identityModule = new IdentityModule();

// After successful token exchange or on error
identityModule.clearAuthorizationArtifacts();
console.log("Authorization artifacts cleared");
```

## Complete Authorization Flow Example

Here's a complete example showing the full OAuth authorization and token exchange flow:

```javascript
import { IdentityModule } from "@grabjs/superapp-sdk";

const identityModule = new IdentityModule();

// Step 1: Initiate authorization
async function startAuthorization() {
  const request = {
    clientId: "your-client-id",
    scope: "openid profile email",
    redirectUri: "https://your-app.com/callback",
    environment: "production",
    responseMode: "in_place" // or "redirect"
  };
  
  const { result, status_code, error } = await identityModule.authorize(request);
  
  if (status_code === 200) {
    // In-place authorization completed immediately (native flow)
    await handleAuthorizationCallback(result.code, result.state);
  } else if (status_code === 302) {
    // Redirect initiated - page will navigate to authorization server
    // After redirect back, handleAuthorizationCallback will be called
  } else if (error) {
    console.error("Authorization failed:", error);
  }
}

// Step 2: Handle authorization callback (after redirect or in-place completion)
async function handleAuthorizationCallback(code, stateFromUrl) {
  // Retrieve all stored artifacts including the actual redirectUri
  const { result, status_code, error } = await identityModule.getAuthorizationArtifacts();
  
  if (status_code !== 200 || !result) {
    console.error("Failed to retrieve authorization artifacts:", error);
    identityModule.clearAuthorizationArtifacts();
    return;
  }
  
  const { state, codeVerifier, nonce, redirectUri } = result;
  
  // Verify state matches (CSRF protection)
  if (state !== stateFromUrl) {
    console.error("State mismatch - possible CSRF attack");
    identityModule.clearAuthorizationArtifacts();
    return;
  }
  
  // Step 3: Exchange authorization code for tokens
  try {
    const tokenResponse = await fetch('https://partner-api.grab.com/grabid/v1/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri, // Use the actual redirectUri from artifacts
        code_verifier: codeVerifier,
        client_id: 'your-client-id'
      })
    });
    
    const tokens = await tokenResponse.json();
    
    // Step 4: Verify nonce in ID token
    // (decode and validate tokens.id_token, ensure nonce claim matches)
    
    console.log("Token exchange successful:", tokens);
    
    // Step 5: Clean up stored artifacts
    identityModule.clearAuthorizationArtifacts();
    
  } catch (error) {
    console.error("Token exchange failed:", error);
    identityModule.clearAuthorizationArtifacts();
  }
}
```

