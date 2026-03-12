[@grabjs/superapp-sdk](../README.md) / GetLanguageLocaleIdentifierResponse

# Type Alias: GetLanguageLocaleIdentifierResponse

> **GetLanguageLocaleIdentifierResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`GetLanguageLocaleIdentifierResult`](GetLanguageLocaleIdentifierResult.md), `200` \| `501`\>

Response when getting the language locale identifier from the device.

## Remarks

This response can have the following status codes:
- `200`: Locale identifier retrieved successfully.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200) - English locale:**
```typescript
{
  status_code: 200,
  result: 'en'
}
```

**Success response (200) - Indonesian locale:**
```typescript
{
  status_code: 200,
  result: 'id'
}
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
