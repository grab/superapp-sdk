[@grabjs/superapp-sdk](../README.md) / ClearAuthorizationArtifactsResponse

# Type Alias: ClearAuthorizationArtifactsResponse

> **ClearAuthorizationArtifactsResponse** = [`BridgeResponse`](BridgeResponse.md)\<`204`, [`ClearAuthorizationArtifactsResult`](ClearAuthorizationArtifactsResult.md)\>

Response when clearing stored authorization artifacts.

## Remarks

This response returns status code `204` when artifacts are successfully cleared.

## Example

**Success response (204):**
```typescript
{ status_code: 204 }
```
