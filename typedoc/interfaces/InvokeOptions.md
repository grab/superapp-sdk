[@grabjs/superapp-sdk](../README.md) / InvokeOptions

# Interface: InvokeOptions\<T\>

Options for invoking a JSBridge method.

## Type Parameters

### T

`T`

## Properties

### isSupported()?

> `optional` **isSupported**: (`appInfo`: [`GrabAppInfo`](GrabAppInfo.md)) => `boolean`

Validator function - returns false = 426 with default error

#### Parameters

##### appInfo

[`GrabAppInfo`](GrabAppInfo.md)

#### Returns

`boolean`

***

### method

> **method**: `string`

The name of the JSBridge method to invoke

***

### params?

> `optional` **params**: `unknown`

The parameters to pass to the method

***

### transformResponse()?

> `optional` **transformResponse**: (`response`: [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>) => [`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

Optional response transformation function

#### Parameters

##### response

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

#### Returns

[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>
