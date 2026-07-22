# Authentication & Permissions

Proactive/reactive permission checks, the full `IdentityModule.authorize()` flow, and the `IdentityModule`/`ScopeModule` API reference.

## Permission Verification Strategies

You can verify permissions either proactively before calling a method, or reactively by handling errors.

### Proactive Checking

Proactively verify if the current session has the necessary permissions for a method using `ScopeModule.hasAccessTo()`. This is recommended before calling gated methods, as users can revoke permissions at any time via the Grab app settings.

```typescript
const scope = new ScopeModule();
const hasAccess = await scope.hasAccessTo('LocationModule', 'getCoordinate');

if (isSuccess(hasAccess) && hasAccess.result) {
  // Permission is available, safe to call the method
  const location = await location.getCoordinate();
}
```

### Reactive Checking (Handling 403 Forbidden)

Methods tagged with `@requiredOAuthScope` require specific permissions. If the user hasn't granted the required scope, the method returns `403`. You must request authorization and reload scopes before retrying:

1. Call `IdentityModule.authorize()` to request the scope.
2. Call `ScopeModule.reloadScopes()` to refresh the SDK's internal permission state.
3. Retry the original method call.

```typescript
import {
  LocationModule,
  IdentityModule,
  ScopeModule,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

const location = new LocationModule();
const identity = new IdentityModule();
const scope = new ScopeModule();

const response = await location.getCoordinate();

if (isError(response) && response.status_code === 403) {
  // 1. Request authorization for the required scope
  const auth = await identity.authorize({
    clientId: 'your-client-id',
    redirectUri: 'https://your-app.com/callback',
    scope: 'mobile.geolocation', // The scope defined in @requiredOAuthScope
    environment: 'production',
    responseMode: 'in_place',
  });

  if (isSuccess(auth)) {
    // 2. Reload scopes so the new permission is available
    await scope.reloadScopes();

    // 3. Retry the original call
    const retry = await location.getCoordinate();
    if (isSuccess(retry)) {
      console.log('Result:', retry.result);
    }
  }
}
```

## Authentication

Trigger `IdentityModule.authorize()` to start the authorization process and request user permissions.

When authorization completes with `status_code: 200` (native `in_place` flow), `response.result` already includes `code`, `state`, and the PKCE values (`codeVerifier`, `nonce`, `redirectUri`), so you do not need `getAuthorizationArtifacts()`.

If the flow uses the web redirect instead (`status_code: 302`), the page navigates away; after the redirect lands on your callback URL, read the `code` from the query string and retrieve the stored PKCE artifacts with `IdentityModule.getAuthorizationArtifacts()`.

In either case, send those values to your backend so it can exchange the authorization code for tokens, validate the `id_token`, fetch user info, and establish the user's session.

After the session is established, call `IdentityModule.clearAuthorizationArtifacts()` and `ScopeModule.reloadScopes()` so your MiniApp can begin using the newly granted permissions.

Use `isRedirection` for `302`: that branch is separate from `isSuccess`, which only matches `200` and `204` for `authorize()`.

```typescript
import {
  IdentityModule,
  ScopeModule,
  isSuccess,
  isError,
  isRedirection,
} from '@grabjs/superapp-sdk';

const identity = new IdentityModule();
const scope = new ScopeModule();

async function signIn() {
  const response = await identity.authorize({
    clientId: 'your-client-id',
    redirectUri: 'https://your-miniapp.example.com/callback',
    scope: 'openid profile.read phone mobile.storage',
    environment: 'production',
    responseMode: 'in_place',
  });

  if (isSuccess(response)) {
    if (response.status_code === 200) {
      const { code, state, codeVerifier, nonce, redirectUri } = response.result;

      // 1. Send the values to your backend for token exchange (see Backend Token Exchange section below)
      // await myBackend.exchangeTokens({ code, codeVerifier, nonce, redirectUri, state });

      // 2. Clear artifacts and reload scopes
      await identity.clearAuthorizationArtifacts();
      await scope.reloadScopes();
    } else if (response.status_code === 204) {
      // User cancelled the authorization flow
      await identity.clearAuthorizationArtifacts();
    }
  } else if (isRedirection(response)) {
    // `302`: web consent — the SDK redirected the browser to GrabID. After the user returns to
    // `redirectUri` with `?code=...&state=...`, read the code from the URL and call
    // `getAuthorizationArtifacts()` for PKCE values, then exchange tokens (see paragraphs above).
    return;
  } else if (isError(response)) {
    console.error('Authorization failed:', response.error);
    await identity.clearAuthorizationArtifacts();
  }
}
```

## API Reference

#### `IdentityModule`
SDK module for authenticating users with GrabID via `JSBridge`.
- `authorize(request: AuthorizeRequest): Promise<AuthorizeResponse>` — Initiates an OAuth2 authorization flow with PKCE (Proof Key for Code Exchange).
This method handles both native in-app consent and web-based fallback flows.
- `clearAuthorizationArtifacts(): Promise<SDKNoContentResponse>` — Clears all stored PKCE authorization artifacts from local storage.
This should be called after a successful token exchange or when you need to
reset the authorization state (e.g., on error or logout).
- `getAuthorizationArtifacts(): Promise<GetAuthorizationArtifactsResponse>` — Retrieves stored PKCE authorization artifacts from local storage.
These artifacts are used to complete the OAuth2 authorization code exchange.

#### `ScopeModule`
SDK module for checking and refreshing API access permissions via `JSBridge`.
- `hasAccessTo(module: string, method: string): Promise<HasAccessToResponse>` — Checks if the current client has access to a specific `JSBridge` API method.
- `reloadScopes(): Promise<ReloadScopesResponse>` — Requests to reload the consented OAuth scopes for the current client.
This refreshes the permissions from the server.
