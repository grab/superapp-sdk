[@grabjs/superapp-sdk](../README.md) / AuthorizeResponse

# Type Alias: AuthorizeResponse

> **AuthorizeResponse** = [`BridgeResponse`](BridgeResponse.md)\<`200` \| `302` \| `204` \| `400` \| `401` \| `403` \| `500` \| `501`, [`AuthorizeResult`](AuthorizeResult.md)\>

Response when initiating an authorization flow.

## Remarks

This response can have the following status codes:
- `200`: Authorization completed successfully (native in_place flow). The `result` contains the authorization code and state.
- `302`: Redirect in progress (web redirect flow). The page will navigate away.
- `204`: No content - user cancelled or flow completed without result data.
- `400`: Bad request - missing required OAuth parameters or invalid configuration.
- `401`: Unauthorized - user not authenticated or session expired.
- `403`: Forbidden - client not authorized for the requested scope.
- `500`: Internal server error - unexpected error during native authorization.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200) - native in_place flow:**
```typescript
{
  status_code: 200,
  result: {
    code: 'auth-code-abc123',
    state: 'csrf-state-xyz789'
  }
}
```

**Redirect response (302) - web flow:**
```typescript
{ status_code: 302 }
```

**Cancelled response (204):**
```typescript
{ status_code: 204 }
```

**Bad request response (400):**
```typescript
{
  status_code: 400,
  error: 'Missing required OAuth parameters'
}
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
