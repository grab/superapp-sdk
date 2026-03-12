[@grabjs/superapp-sdk](../README.md) / OnCtaTapResponse

# Type Alias: OnCtaTapResponse

> **OnCtaTapResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`OnCtaTapResult`](OnCtaTapResult.md), `200` \| `501`\>

Response when notifying CTA tap.

## Remarks

This response can have the following status codes:
- `200`: CTA tap notification sent successfully.
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
