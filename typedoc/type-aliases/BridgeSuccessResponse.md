[@grabjs/superapp-sdk](../README.md) / BridgeSuccessResponse

# Type Alias: BridgeSuccessResponse\<T\>

> **BridgeSuccessResponse**\<`T`\> = \{ `error?`: `undefined`; `result`: `T`; `status_code`: `200`; \}

Success response from the bridge SDK.

## Remarks

Returned when a JSBridge method completes successfully.
The `result` field contains the JSBridge method's data.

## Type Parameters

### T

`T`

## Properties

### error?

> `optional` **error**: `undefined`

Always undefined for success responses

---

### result

> **result**: `T`

The result data from the successful JSBridge method

---

### status_code

> **status_code**: `200`

Status code: `200` - JSBridge method completed successfully
