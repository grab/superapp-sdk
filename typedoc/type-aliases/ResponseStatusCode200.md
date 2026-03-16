[@grabjs/superapp-sdk](../README.md) / ResponseStatusCode200

# Type Alias: ResponseStatusCode200\<T\>

> **ResponseStatusCode200**\<`T`\> = \{ `result`: `T`; `status_code`: `200`; \}

Success response from the bridge SDK.

## Remarks

Returned when a JSBridge method completes successfully.
The `result` field contains the JSBridge method's data.

## Type Parameters

### T

`T`

## Properties

### result

> **result**: `T`

The result data from the JSBridge method, or undefined if no result was returned

***

### status\_code

> **status\_code**: `200`

HTTP-style status code indicating the outcome of the JSBridge method call
