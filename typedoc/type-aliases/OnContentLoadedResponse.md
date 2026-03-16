[@grabjs/superapp-sdk](../README.md) / OnContentLoadedResponse

# Type Alias: OnContentLoadedResponse

> **OnContentLoadedResponse** = [`BridgeResponse`](BridgeResponse.md)\<`200` \| `500` \| `501`, [`OnContentLoadedResult`](OnContentLoadedResult.md)\>

Response when notifying content loaded.

## Remarks

This response can have the following status codes:
- `200`: Notification sent successfully.
- `500`: Internal server error - an unexpected error occurred on the native side.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200):**
```typescript
{ status_code: 200 }
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
