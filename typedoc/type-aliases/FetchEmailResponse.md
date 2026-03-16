[@grabjs/superapp-sdk](../README.md) / FetchEmailResponse

# Type Alias: FetchEmailResponse

> **FetchEmailResponse** = [`BridgeResponse`](BridgeResponse.md)\<`200` \| `400` \| `426` \| `500` \| `501`, [`FetchEmailResult`](FetchEmailResult.md)\>

Response when fetching the user's email.

## Remarks

This response can have the following status codes:
- `200`: Email fetched successfully. The `result` contains the email address.
- `400`: Invalid request - the request was malformed.
- `426`: Upgrade Required - feature requires Grab app version 5.399 or above.
- `500`: Internal server error - an unexpected error occurred on the native side.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200):**
```typescript
{
  status_code: 200,
  result: { email: 'user@example.com' }
}
```

**Bad request response (400):**
```typescript
{
  status_code: 400,
  error: 'Invalid request'
}
```

**Upgrade Required response (426):**
```typescript
{
  status_code: 426,
  error: 'Upgrade Required: This method requires Grab app version 5.399.0 or above on iOS'
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
