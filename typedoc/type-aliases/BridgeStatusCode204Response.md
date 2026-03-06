[@grabjs/superapp-sdk](../README.md) / BridgeStatusCode204Response

# Type Alias: BridgeStatusCode204Response

> **BridgeStatusCode204Response** = \{ `status_code`: `204`; \}

No result response with status code 204.

## Remarks

Returned when a JSBridge method completes with no content (e.g., user cancelled a dialog).
No `result` or `error` data is returned.

## Properties

### status\_code

> **status\_code**: `204`

HTTP-style status code indicating the outcome of the JSBridge method call
