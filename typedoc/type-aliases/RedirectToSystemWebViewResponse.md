[@grabjs/superapp-sdk](../README.md) / RedirectToSystemWebViewResponse

# Type Alias: RedirectToSystemWebViewResponse

> **RedirectToSystemWebViewResponse** = `Promise`\<[`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`RedirectToSystemWebViewResult`](RedirectToSystemWebViewResult.md), `200` \| `400` \| `424` \| `501`\>\>

Response when redirecting to the system web view.

## Remarks

This response can have the following status codes:
- `200`: Redirect initiated successfully.
- `400`: Invalid URL, domain not whitelisted, or missing callback URL.
- `424`: ASWebAuthenticationSession error - dependency error on iOS.
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
  error: 'Invalid URL or domain not whitelisted'
}
```

**Failed dependency response (424):**
```typescript
{
  status_code: 424,
  error: 'ASWebAuthenticationSession error'
}
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
