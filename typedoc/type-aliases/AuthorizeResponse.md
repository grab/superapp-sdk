[@grabjs/superapp-sdk](../README.md) / AuthorizeResponse

# Type Alias: AuthorizeResponse

> **AuthorizeResponse** = `Promise`\<[`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`AuthorizeResult`](AuthorizeResult.md), `200` \| `302` \| `204` \| `400` \| `401` \| `403`\>\>

Response when initiating an authorization flow.

## Remarks

This response can have the following status codes:
- `200`: Authorization completed successfully (native in_place flow). The `result` contains the authorization code and state.
- `302`: Redirect in progress (web redirect flow). The page will navigate away.
- `204`: No content - user cancelled or flow completed without result data.
- `400`: Bad request - missing required OAuth parameters or invalid configuration.

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
