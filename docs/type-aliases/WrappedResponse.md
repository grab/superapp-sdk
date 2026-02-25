[@grabjs/superapp-sdk](../README.md) / WrappedResponse

# Type Alias: WrappedResponse\<T\>

> **WrappedResponse**\<`T`\> = \{ `error?`: `undefined`; `result`: `T`; `status_code`: `200`; \} \| \{ `error?`: `undefined`; `result?`: `undefined`; `status_code`: `204` \| `302`; \} \| \{ `error`: `string`; `result?`: `undefined`; `status_code`: `400` \| `403` \| `424` \| `500`; \}

Native response from the bridge SDK
Universal response format for all native modules

## Type Parameters

### T

`T`

## Type Declaration

\{ `error?`: `undefined`; `result`: `T`; `status_code`: `200`; \}

### error?

> `optional` **error**: `undefined`

Error message if the operation failed

### result

> **result**: `T`

Result data if the operation succeeded

### status\_code

> **status\_code**: `200`

HTTP status code indicating the result of the operation

\{ `error?`: `undefined`; `result?`: `undefined`; `status_code`: `204` \| `302`; \}

### error?

> `optional` **error**: `undefined`

Error message if the operation failed

### result?

> `optional` **result**: `undefined`

Result data if the operation succeeded

### status\_code

> **status\_code**: `204` \| `302`

HTTP status code indicating the result of the operation

\{ `error`: `string`; `result?`: `undefined`; `status_code`: `400` \| `403` \| `424` \| `500`; \}

### error

> **error**: `string`

Error message if the operation failed

### result?

> `optional` **result**: `undefined`

Result data if the operation succeeded

### status\_code

> **status\_code**: `400` \| `403` \| `424` \| `500`

HTTP status code indicating the result of the operation
