[@grabjs/superapp-sdk](../README.md) / HasAccessToResponse

# Type Alias: HasAccessToResponse

> **HasAccessToResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`HasAccessToResult`](HasAccessToResult.md), `200` \| `400` \| `424` \| `501`\>

Response when checking API access permissions.

## Remarks

This response can have the following status codes:
- `200`: Access check completed successfully. The `result` contains the access status.
- `400`: Missing required parameters - module or method not provided.
- `424`: ScopeKit error - unable to check access due to a dependency error.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200) - has access:**
```typescript
{
  status_code: 200,
  result: { hasAccess: true }
}
```

**Success response (200) - no access:**
```typescript
{
  status_code: 200,
  result: { hasAccess: false }
}
```

**Bad request response (400):**
```typescript
{
  status_code: 400,
  error: 'Missing required parameters'
}
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
