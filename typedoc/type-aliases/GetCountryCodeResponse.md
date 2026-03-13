[@grabjs/superapp-sdk](../README.md) / GetCountryCodeResponse

# Type Alias: GetCountryCodeResponse

> **GetCountryCodeResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`GetCountryCodeResult`](GetCountryCodeResult.md), `200` \| `424` \| `500` \| `501`\>

Response when getting the country code.

## Remarks

This response can have the following status codes:
- `200`: Country code retrieved successfully. The `result` contains the ISO country code.
- `424`: GeoKit/Resolver error - location services unavailable.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200) - Singapore:**
```typescript
{
  status_code: 200,
  result: { countryCode: 'SG' }
}
```

**Success response (200) - Indonesia:**
```typescript
{
  status_code: 200,
  result: { countryCode: 'ID' }
}
```

**Failed dependency response (424):**
```typescript
{
  status_code: 424,
  error: 'GeoKit/Resolver error'
}
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
