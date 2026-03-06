[@grabjs/superapp-sdk](../README.md) / BridgeStatusCode302Response

# Type Alias: BridgeStatusCode302Response

> **BridgeStatusCode302Response** = \{ `status_code`: `302`; \}

Redirect response with status code 302.

## Remarks

Returned when a JSBridge method initiates a redirect (e.g., OAuth2 redirect flow).
No `result` or `error` data is returned as the page will navigate away.

## Properties

### status\_code

> **status\_code**: `302`

HTTP-style status code indicating the outcome of the JSBridge method call
