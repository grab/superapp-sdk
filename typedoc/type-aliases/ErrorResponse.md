[@grabjs/superapp-sdk](../README.md) / ErrorResponse

# Type Alias: ErrorResponse\<Code\>

> **ErrorResponse**\<`Code`\> = \{ `error`: `string`; `status_code`: `Code`; \}

Generic error response shape with a specific status code.
Used as the base for all error response types (4xx and 5xx).

## Type Parameters

### Code

`Code` *extends* `number`

The HTTP status code (e.g., 400, 401, 500)

## Properties

### error

> **error**: `string`

Error message if the call failed

***

### status\_code

> **status\_code**: `Code`

HTTP-style status code indicating the outcome of the JSBridge method call
