[@grabjs/superapp-sdk](../README.md) / VerifyEmailResponse

# Type Alias: VerifyEmailResponse

> **VerifyEmailResponse** = `Promise`\<[`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`VerifyEmailResult`](VerifyEmailResult.md), `200` \| `400` \| `403` \| `501`\>\>

Response when verifying the user's email.

## Remarks

This response can have the following status codes:
- `200`: Email verified successfully.
- `400`: Invalid request - OTP is incorrect or expired.
- `403`: Forbidden - feature requires Grab app version 5.399 or above.
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
  error: 'Invalid OTP'
}
```

**Forbidden response (403):**
```typescript
{
  status_code: 403,
  error: 'This feature requires Grab app version 5.399 or above.'
}
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
