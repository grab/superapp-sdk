[@grabjs/superapp-sdk](../README.md) / BridgeStatusCode501Response

# Type Alias: BridgeStatusCode501Response

> **BridgeStatusCode501Response** = \{ `error`: `string`; `status_code`: `501`; \}

Error response with status code 501

## Remarks

Returned when a JSBridge method is called outside the Grab app environment.
This indicates the method is not implemented in the current environment.

## Properties

### error

> **error**: `string`

Error message indicating the method is not available in this environment

***

### status\_code

> **status\_code**: `501`

HTTP-style status code indicating the outcome of the JSBridge method call
