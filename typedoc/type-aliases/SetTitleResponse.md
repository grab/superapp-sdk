[@grabjs/superapp-sdk](../README.md) / SetTitleResponse

# Type Alias: SetTitleResponse

> **SetTitleResponse** = [`BridgeResponse`](BridgeResponse.md)\<`200` \| `400` \| `500` \| `501`, [`SetTitleResult`](SetTitleResult.md)\>

Response when setting the title.

## Remarks

This response can have the following status codes:
- `200`: Title set successfully.
- `400`: Invalid title parameter.
- `500`: Internal server error - an unexpected error occurred on the native side.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200):**
```typescript
{ status_code: 200 }
```

**Bad request response (400):**
```typescript
{
  status_code: 400,
  error: 'Invalid title parameter'
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
