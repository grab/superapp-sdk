[@grabjs/superapp-sdk](../README.md) / ReloadScopesResponse

# Type Alias: ReloadScopesResponse

> **ReloadScopesResponse** = `Promise`\<[`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`ReloadScopesResult`](ReloadScopesResult.md), `200` \| `424` \| `501`\>\>

Response when reloading consented scopes.

## Remarks

This response can have the following status codes:
- `200`: Scopes reloaded successfully.
- `424`: ScopeKit error - unable to reload scopes due to a dependency error.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200):**
```typescript
{ status_code: 200 }
```

**Failed dependency response (424):**
```typescript
{
  status_code: 424,
  error: 'ScopeKit error'
}
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
