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
| authorizationEndpoint | String | Yes | Endpoint for web authorization fallback |
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
  authorizationEndpoint: "https://api.grab.com/grabid/v1/oauth2/authorize",
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
