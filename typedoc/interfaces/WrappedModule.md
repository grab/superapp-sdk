[@grabjs/superapp-sdk](../README.md) / WrappedModule

# Interface: WrappedModule

Generic interface for all native JSBridge module wrappers.

## Remarks

This is the base interface that all Wrapped*Module interfaces implement.
Modules can use this directly for generic method invocation, or extend it
with method-specific overloads for stricter typing.

## Examples

Using directly (CameraModule, ContainerModule):
```typescript
invoke<ScanQRCodeResult>('scanQRCode', request)
```

Extending with method overloads (ProfileModule, LocationModule):
```typescript
export interface WrappedProfileModule extends WrappedModule {
  invoke(method: 'fetchEmail', params?: any): Promise<BridgeResponse<string>>;
}
```

## Methods

### invoke()

> **invoke**\<`T`, `M`\>(`method`: `M`, `params?`: `unknown`): `M` *extends* `` `observe${string}` `` ? [`DataStream`](../type-aliases/DataStream.md)\<`T`\> : `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>\>

#### Type Parameters

##### T

`T`

##### M

`M` *extends* `string` = `string`

#### Parameters

##### method

`M`

##### params?

`unknown`

#### Returns

`M` *extends* `` `observe${string}` `` ? [`DataStream`](../type-aliases/DataStream.md)\<`T`\> : `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<`T`\>\>
