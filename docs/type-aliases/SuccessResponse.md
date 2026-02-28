[@grabjs/superapp-sdk](../README.md) / SuccessResponse

# Type Alias: SuccessResponse\<T\>

> **SuccessResponse**\<`T`\> = \{ `status_code`: `200`; `result`: `T`; `error?`: `undefined`; \}

Success response from the bridge SDK.

## Remarks

Returned when a native operation completes successfully. The `result` field contains the operation data.
Use type narrowing on `status_code === 200` to safely access `result` in union types.

## Type Parameters

### T

`T`

## Properties

### status\_code

> **status\_code**: `200`

Status code: `200` - Operation completed successfully

***

### result

> **result**: `T`

The result data from the successful operation

***

### error?

> `optional` **error**: `undefined`

Always undefined for success responses
