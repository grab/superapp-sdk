[@grabjs/superapp-sdk](../README.md) / GetAuthorizationArtifactsResult

# Type Alias: GetAuthorizationArtifactsResult

> **GetAuthorizationArtifactsResult** = \{ `codeVerifier`: `string`; `nonce`: `string`; `redirectUri`: `string`; `state`: `string`; \} \| `null`

Result object containing the stored PKCE authorization artifacts.
These are used to complete the OAuth2 authorization code exchange.

## Type Declaration

\{ `codeVerifier`: `string`; `nonce`: `string`; `redirectUri`: `string`; `state`: `string`; \}

### codeVerifier

> **codeVerifier**: `string`

The code verifier for PKCE.

### nonce

> **nonce**: `string`

The nonce used in the authorization request.

### redirectUri

> **redirectUri**: `string`

The redirect URI used in the authorization request.

### state

> **state**: `string`

The state parameter used in the authorization request.

`null`
