[@grabjs/superapp-sdk](../README.md) / PlayDRMContentResponse

# Type Alias: PlayDRMContentResponse

> **PlayDRMContentResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`PlayDRMContentResult`](PlayDRMContentResult.md), `200` \| `204` \| `500` \| `501`\>

Response when initiating DRM content playback.

## Remarks

This response can have the following status codes:
- `200`: Playback initiated successfully (streaming content).
- `204`: Invalid parameters - the DRM configuration is malformed or missing required fields.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200):**
```typescript
{ status_code: 200 }
```

**Invalid parameters response (204):**
```typescript
{ status_code: 204 }
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
