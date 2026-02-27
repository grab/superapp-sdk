[@grabjs/superapp-sdk](../README.md) / PlayDRMContentErrorResponse

# Type Alias: PlayDRMContentErrorResponse

> **PlayDRMContentErrorResponse** = [`ErrorResponse`](ErrorResponse.md) & \{ `status_code`: `400` \| `403` \| `500`; \}

Error response when DRM content playback fails

## Type Declaration

### status\_code

> **status\_code**: `400` \| `403` \| `500`

Error status codes:
- `400`: Invalid request parameters
- `403`: DRM permission denied or not available
- `500`: Internal error during playback
