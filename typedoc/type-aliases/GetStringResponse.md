[@grabjs/superapp-sdk](../README.md) / GetStringResponse

# Type Alias: GetStringResponse

> **GetStringResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`GetStringResult`](GetStringResult.md), `200` \| `400` \| `500` \| `501`\>

Response when getting a string value.

## Remarks

This response can have the following status codes:
- `200`: Value retrieved successfully. The `result` contains the string value or null if not found.
- `400`: Missing required parameters - key not provided.
- `500`: Internal server error - an unexpected error occurred on the native side.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200) - value exists:**
```typescript
{
  status_code: 200,
  result: { value: 'john_doe' }
}
```

**Success response (200) - value not found:**
```typescript
{
  status_code: 200,
  result: { value: null }
}
```

**Bad request response (400):**
```typescript
{
  status_code: 400,
  error: 'Missing required parameters'
}
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```

**Internal server error response (500):**
```typescript
{
  status_code: 500,
  error: 'Internal server error'
}
```
