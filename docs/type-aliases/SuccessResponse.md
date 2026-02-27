[@grabjs/superapp-sdk](../README.md) / SuccessResponse

# Type Alias: SuccessResponse\<T\>

> **SuccessResponse**\<`T`\> = \{ `status_code`: `200`; `result`: `T`; `error?`: `undefined`; \}

Success response from the bridge SDK

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
