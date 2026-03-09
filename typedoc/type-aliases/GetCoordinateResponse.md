[@grabjs/superapp-sdk](../README.md) / GetCoordinateResponse

# Type Alias: GetCoordinateResponse

> **GetCoordinateResponse** = `Promise`\<[`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`GetCoordinateResult`](GetCoordinateResult.md), `200` \| `424` \| `501`\>\>

Response when getting the device coordinates.

## Remarks

This response can have the following status codes:
- `200`: Coordinates retrieved successfully. The `result` contains latitude and longitude.
- `424`: GeoKit error - location services unavailable or permission denied.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200) - Singapore coordinates:**
```typescript
{
  status_code: 200,
  result: { lat: 1.3521, lng: 103.8198 }
}
```

**Failed dependency response (424) - GeoKit error:**
```typescript
{
  status_code: 424,
  error: 'GeoKit error'
}
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
