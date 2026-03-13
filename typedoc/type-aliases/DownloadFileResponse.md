[@grabjs/superapp-sdk](../README.md) / DownloadFileResponse

# Type Alias: DownloadFileResponse

> **DownloadFileResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<`void`, `204` \| `400` \| `500` \| `501`\>

Response when requesting a native file download.

## Remarks

This response can have the following status codes:
- `204`: File downloaded successfully.
- `400`: Invalid request parameters such as invalid file URL, invalid domain, or missing file name.
- `500`: Internal server error - an unexpected error occurred on the native side.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (204):**
```typescript
{
  status_code: 204
}
```

**Bad request response (400):**
```typescript
{
  status_code: 400,
  error: 'Invalid request'
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
