[@grabjs/superapp-sdk](../README.md) / GetAuthorizationArtifactsResponse

# Type Alias: GetAuthorizationArtifactsResponse

> **GetAuthorizationArtifactsResponse** = `Promise`\<[`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`GetAuthorizationArtifactsResult`](GetAuthorizationArtifactsResult.md), `200` \| `204` \| `400`\>\>

Response when retrieving stored authorization artifacts.

## Remarks

This response can have the following status codes:
- `200`: All artifacts present. The `result` contains the PKCE artifacts needed for token exchange.
- `204`: No artifacts yet - authorization has not been initiated.
- `400`: Inconsistent state - possible data corruption in storage.

## Examples

**Success response (200) - all artifacts present:**
```typescript
{
  status_code: 200,
  result: {
    state: 'csrf-state-xyz789',
    codeVerifier: 'code-verifier-123',
    nonce: 'nonce-abc',
    redirectUri: 'https://your-app.com/callback'
  }
}
```

**No content response (204) - no artifacts:**
```typescript
{ status_code: 204 }
```

**Bad request response (400) - inconsistent state:**
```typescript
{
  status_code: 400,
  error: 'Inconsistent authorization artifacts in storage'
}
```
