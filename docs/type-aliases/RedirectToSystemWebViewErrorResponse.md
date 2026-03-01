[@grabjs/superapp-sdk](../globals.md) / RedirectToSystemWebViewErrorResponse

# Type Alias: RedirectToSystemWebViewErrorResponse

> **RedirectToSystemWebViewErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `400` \| `500`; \}

Error response when system webview redirect fails

## Type Declaration

### status\_code

> **status\_code**: `400` \| `500`

Error status codes:
- `400`: Invalid URL or request parameters
- `500`: Internal error during redirect
