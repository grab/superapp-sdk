[@grabjs/superapp-sdk](../README.md) / BaseModule

# Class: BaseModule

Base class for all JSBridge modules.

## Remarks

On construction, the class wraps the JSBridge module on `window` (e.g., `WrappedContainerModule`).
This code must run on the Grab SuperApp's webview to function correctly.

## Extended by

- [`CameraModule`](CameraModule.md)
- [`CheckoutModule`](CheckoutModule.md)
- [`ContainerModule`](ContainerModule.md)
- [`DeviceCapabilityModule`](DeviceCapabilityModule.md)
- [`FileModule`](FileModule.md)
- [`IdentityModule`](IdentityModule.md)
- [`LocaleModule`](LocaleModule.md)
- [`LocationModule`](LocationModule.md)
- [`MediaModule`](MediaModule.md)
- [`PlatformModule`](PlatformModule.md)
- [`ProfileModule`](ProfileModule.md)
- [`ScopeModule`](ScopeModule.md)
- [`StorageModule`](StorageModule.md)
- [`SystemWebViewKitModule`](SystemWebViewKitModule.md)
- [`UserAttributesModule`](UserAttributesModule.md)

## Constructors

### Constructor

> **new BaseModule**(`moduleName`: `string`): `BaseModule`

Creates a new module instance and wraps it on the global `window` object.

#### Parameters

##### moduleName

`string`

The name of the module (e.g., "ContainerModule", "ProfileModule").

#### Returns

`BaseModule`

#### Throws

Error when the bridge SDK fails to wrap the module.

## Methods

### invoke()

> **invoke**\<`T`\>(`options`: [`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>\>

Invokes a JSBridge method with optional app validation and response transformation.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>

The invoke options including method name, params, validation, and transformation.

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>\>

A promise resolving to the JSBridge response.

#### Remarks

- Always checks if running in Grab app (returns 501 if not).
- When `isSupported` returns false, returns 426 (Upgrade Required).
- When `transformResponse` is provided, applies it to successful responses.
- All errors are reported via the `status_code` field; this method never rejects.
- For streaming methods, use `invokeStream` instead.

***

### invokeStream()

> **invokeStream**\<`T`\>(`options`: [`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>): [`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

Invokes a JSBridge streaming method that returns a `BridgeStream`.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>

The invoke options including method name, params, and validation.

#### Returns

[`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

A `BridgeStream` for receiving continuous data from the JSBridge.

#### Remarks

- Always checks if running in Grab app (returns 501 error response if not).
- When `isSupported` returns false, returns 426 error response.
- Returns a `BridgeStream` that can be subscribed to or awaited for the first value.
- All errors are reported via error responses in the stream; this method never rejects.
