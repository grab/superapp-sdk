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
- [`IdentityModule`](IdentityModule.md)
- [`ProfileModule`](ProfileModule.md)
- [`LocaleModule`](LocaleModule.md)
- [`LocationModule`](LocationModule.md)
- [`MediaModule`](MediaModule.md)
- [`PlatformModule`](PlatformModule.md)
- [`ScopeModule`](ScopeModule.md)
- [`StorageModule`](StorageModule.md)
- [`SystemWebViewKitModule`](SystemWebViewKitModule.md)

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
