# IdentityModule

## API Reference

SDK module for authenticating users with GrabID via `JSBridge`.

- `authorize(request: AuthorizeRequest): Promise<AuthorizeResponse>` — Initiates an OAuth2 authorization flow with PKCE (Proof Key for Code Exchange).
This method handles both native in-app consent and web-based fallback flows.

This method can return the following `status_code` values:
- `200` (OK): Authorization completed successfully (native in_place flow). The `result` contains AuthorizeResult.
- `204` (No Content): User cancelled the authorization flow.
- `302` (Found): Redirect in progress (web redirect flow). The page will navigate away.
- `400` (Bad Request): Invalid request parameters.
- `403` (Forbidden): Client is not authorized for the requested scope.
- `500` (Internal Server Error): Unexpected error during native authorization.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { IdentityModule, isSuccess, isRedirection, isError } from '@grabjs/superapp-sdk';

// Initialize the identity module
const identity = new IdentityModule();

// Initiate authorization with redirect mode
const response = await identity.authorize({
  clientId: 'your-client-id',
  redirectUri: 'https://your-app.com/callback',
  scope: 'openid profile',
  environment: 'production',
  responseMode: 'redirect'
});

// Handle the response
if (isSuccess(response)) {
  switch (response.status_code) {
    case 200: {
      const { code, state, codeVerifier, nonce, redirectUri } = response.result;
      console.log('Auth Code:', code);
      console.log('State:', state);
      console.log('Code Verifier:', codeVerifier);
      console.log('Nonce:', nonce);
      console.log('Redirect URI:', redirectUri);
      break;
    }
    case 204:
      console.log('Authorization cancelled');
      break;
  }
} else if (isRedirection(response)) {
  console.log('Redirecting to authorization...');
} else if (isError(response)) {
  switch (response.status_code) {
    case 403:
      console.log('Client not authorized for requested scope');
      // Check OAuth client configuration and requested scopes
      break;
    default:
      console.error(`Error ${response.status_code}: ${response.error}`);
  }
} else {
  console.error('Unhandled response');
}
```

- `clearAuthorizationArtifacts(): Promise<SDKNoContentResponse>` — Clears all stored PKCE authorization artifacts from local storage.
This should be called after a successful token exchange or when you need to
reset the authorization state (e.g., on error or logout).

Confirmation that the authorization artifacts have been cleared. See ClearAuthorizationArtifactsResponse.

```typescript
import { IdentityModule, isSuccess } from '@grabjs/superapp-sdk';

// Initialize the identity module
const identity = new IdentityModule();

// Clear stored authorization artifacts after successful token exchange
const response = await identity.clearAuthorizationArtifacts();

// Handle the response
if (isSuccess(response)) {
  console.log('Authorization artifacts cleared');
}
```

- `getAuthorizationArtifacts(): Promise<GetAuthorizationArtifactsResponse>` — Retrieves stored PKCE authorization artifacts from local storage.
These artifacts are used to complete the OAuth2 authorization code exchange.

This method can return the following `status_code` values:
- `200` (OK): All artifacts present. The `result` contains GetAuthorizationArtifactsResult.
- `204` (No Content): No artifacts yet - authorization has not been initiated.
- `400` (Bad Request): Invalid request parameters.

```typescript
import { IdentityModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the identity module
const identity = new IdentityModule();

// Retrieve stored authorization artifacts after authorization redirect
const response = await identity.getAuthorizationArtifacts();

// Handle the response
if (isSuccess(response)) {
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
      console.log('No authorization artifacts found');
      break;
  }
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```
