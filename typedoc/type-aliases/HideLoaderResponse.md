[@grabjs/superapp-sdk](../README.md) / HideLoaderResponse

# Type Alias: HideLoaderResponse

> **HideLoaderResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`HideLoaderResult`](HideLoaderResult.md), `200` \| `501`\>

Response when hiding the loader.

## Remarks

This response can have the following status codes:
- `200`: Loader hidden successfully.
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
