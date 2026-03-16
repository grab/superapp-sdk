[@grabjs/superapp-sdk](../README.md) / ScopeModule

# Class: ScopeModule

JSBridge module for checking and refreshing API access permissions.

## Remarks

Manages OAuth scope permissions, allowing the MiniApp to check access rights and reload scopes from the server.
This code must run on the Grab SuperApp's webview to function correctly.

## Examples

**ES Module:**
```typescript
import { ScopeModule } from '@grabjs/superapp-sdk';
const scope = new ScopeModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const scope = new SuperAppSDK.ScopeModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new ScopeModule**(): `ScopeModule`

#### Returns

`ScopeModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### hasAccessTo()

> **hasAccessTo**(`module`: `string`, `method`: `string`): `Promise`\<[`HasAccessToResponse`](../type-aliases/HasAccessToResponse.md)\>

Checks if the current client has access to a specific JSBridge API method.

#### Parameters

##### module

`string`

The name of the bridge module to check access for (e.g., 'CameraModule').

##### method

`string`

The method name within the module to check access for (e.g., 'scanQRCode').

#### Returns

`Promise`\<[`HasAccessToResponse`](../type-aliases/HasAccessToResponse.md)\>

Whether the MiniApp has permission to access the specified method.

#### Example

**Simple usage**
```typescript
// Initialize the scope module
const scopeModule = new ScopeModule();

// Check access to CameraModule.scanQRCode
const response = await scopeModule.hasAccessTo('CameraModule', 'scanQRCode');

switch (response.status_code) {
  case 200:
    console.log('Has access:', response.result.hasAccess);
    break;
  case 400:
  case 424:
    console.log('Could not check access:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```

***

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

#### Inherited from

[`BaseModule`](BaseModule.md).[`invoke`](BaseModule.md#invoke)

***

### invokeStream()

> **invokeStream**\<`T`\>(`options`: `Omit`\<[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>, `"transformResponse"`\>): [`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

Invokes a JSBridge streaming method that returns a `BridgeStream`.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

`Omit`\<[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>, `"transformResponse"`\>

The invoke options including method name, params, and validation.

#### Returns

[`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

A `BridgeStream` for receiving continuous data from the JSBridge.

#### Remarks

- Always checks if running in Grab app (returns 501 error response if not).
- When `isSupported` returns false, returns 426 error response.
- Returns a `BridgeStream` that can be subscribed to or awaited for the first value.
- All errors are reported via error responses in the stream; this method never rejects.

#### Inherited from

[`BaseModule`](BaseModule.md).[`invokeStream`](BaseModule.md#invokestream)

***

### reloadScopes()

> **reloadScopes**(): `Promise`\<[`ReloadScopesResponse`](../type-aliases/ReloadScopesResponse.md)\>

Requests to reload the consented OAuth scopes for the current client.
This refreshes the permissions from the server.

#### Returns

`Promise`\<[`ReloadScopesResponse`](../type-aliases/ReloadScopesResponse.md)\>

Confirmation that the scopes have been reloaded from the server.

#### Example

**Simple usage**
```typescript
// Initialize the scope module
const scopeModule = new ScopeModule();

// Reload scopes
const response = await scopeModule.reloadScopes();

switch (response.status_code) {
  case 200:
    console.log('Scopes reloaded successfully');
    break;
  case 424:
    console.log('Could not reload scopes:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```
