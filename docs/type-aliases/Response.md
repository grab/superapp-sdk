[@grabjs/superapp-sdk](../README.md) / Response

# Type Alias: Response\<T\>

> **Response**\<`T`\> = [`SuccessResponse`](SuccessResponse.md)\<`T`\> \| [`NoResultResponse`](NoResultResponse.md) \| [`ErrorResponse`](ErrorResponse.md)

Universal response format for all native module operations.

## Type Parameters

### T

`T`

## Remarks

All bridge SDK method calls resolve to this union type. Check `status_code` to determine the outcome:
- `200`: Success — use `result`
- `204` or `302`: No content or redirect
- `400`, `403`, `424`, `500`: Error — use `error`
