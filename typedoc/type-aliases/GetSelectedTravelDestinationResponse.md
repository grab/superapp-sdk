[@grabjs/superapp-sdk](../README.md) / GetSelectedTravelDestinationResponse

# Type Alias: GetSelectedTravelDestinationResponse

> **GetSelectedTravelDestinationResponse** = [`BridgeResponse`](BridgeResponse.md)\<`200` \| `204` \| `500` \| `501`, [`GetSelectedTravelDestinationResult`](GetSelectedTravelDestinationResult.md)\>

Response when reading the selected travel destination lowercase ISO 3166-1 alpha-2 country code.

## Remarks

This response can have the following status codes:
- `200`: The selected travel destination lowercase ISO 3166-1 alpha-2 country code was returned successfully.
- `204`: No selected travel destination is currently available.
- `500`: Internal server error - an unexpected error occurred on the native side.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200):**
```typescript
{
  status_code: 200,
  result: 'id'
}
```

**No content response (204):**
```typescript
{
  status_code: 204
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
