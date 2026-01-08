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
| environment | String | Yes | Environment ('staging' or 'production'). Used to fetch the authorization endpoint from the OpenID configuration |
| responseMode | String | No | Response mode ('redirect' or 'in_place') |

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
    // Authorization successful
    console.log("Auth Code:", result.code);
    console.log("State:", result.state);
  } else if (status_code === 499) {
    // User cancelled the authorization
    console.log("User cancelled");
  } else if (error) {
    // Authorization failed
    console.error("Auth error:", error);
  }
});
```

### 2. Get PKCE Artifacts

**Method name**: `getPKCEArtifacts`

**Description**

Retrieves the PKCE (Proof Key for Code Exchange) artifacts that were stored in localStorage during the authorization flow. These values are needed to complete the OAuth flow after the authorization redirect.

**Arguments**

None

**Return type**

| Name | Type | Description |
| --- | --- | --- |
| result | Object \| null | Object containing the PKCE artifacts (200), or null if not stored (204) or inconsistent (400) |
| error | String \| null | Error message if artifacts are inconsistent (400), otherwise null |
| status_code | Number | HTTP status code: 200 (success), 204 (no artifacts), or 400 (inconsistent state) |

**Result Object Properties**

When `status_code` is 200, the `result` object contains:

| Property | Type | Description |
| --- | --- | --- |
| state | String | The state parameter used for CSRF protection |
| codeVerifier | String | The PKCE code verifier used for token exchange |
| nonce | String | The nonce used for ID token verification |

**Status Codes**

- **200**: All three artifacts are present and returned in `result`
- **204**: No artifacts are stored (authorization has not been called yet)
- **400**: Inconsistent state detected (only some artifacts present, possible data corruption)

**Code example**

```javascript
import { IdentityModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only once and reuse across app.
const identityModule = new IdentityModule();

// After authorization redirect, retrieve the stored artifacts
const { result, status_code, error } = await identityModule.getPKCEArtifacts();

if (status_code === 200 && result) {
  // All artifacts present - proceed with token exchange
  const { state, codeVerifier, nonce } = result;
  console.log("State:", state);
  console.log("Code Verifier:", codeVerifier);
  console.log("Nonce:", nonce);
  
  // Use these values to:
  // 1. Verify the state parameter from the redirect matches state
  // 2. Exchange the authorization code for tokens using codeVerifier
  // 3. Validate the nonce in the ID token matches nonce
} else if (status_code === 204) {
  // No artifacts yet - user hasn't authorized
  console.log("No PKCE artifacts found. Authorization has not been initiated.");
} else if (status_code === 400) {
  // Inconsistent state - possible data corruption
  console.error("PKCE artifacts error:", error);
  // You may want to clear localStorage and restart the authorization flow
}
```

