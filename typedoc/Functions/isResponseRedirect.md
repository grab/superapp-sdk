[@grabjs/superapp-sdk](../README.md) / isResponseRedirect

# Function: isResponseRedirect()

> **isResponseRedirect**\<`T`\>(`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>): `response is BridgeStatusCode302Response`

Type guard that checks if the response is a redirect (status code 302).
This typically means a redirect occurred.

## Type Parameters

### T

`T`

## Parameters

### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>

## Returns

`response is BridgeStatusCode302Response`

## Example

```typescript
const response = await someModule.someMethod(request);
if (isResponseRedirect(response)) {
  console.log('Redirect occurred');
}
```
