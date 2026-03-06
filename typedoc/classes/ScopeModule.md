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

A promise that resolves to a response with one of the following possible status codes:
- `200`: Access check completed successfully
- `400`: Missing required parameters
- `424`: ScopeKit error

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ScopeModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ScopeModule, isResponseOk, isResponseError } = window.SuperAppSDK;

// Initialize the scope module
const scopeModule = new ScopeModule();

// Check access to CameraModule.scanQRCode
try {
  const response = await scopeModule.hasAccessTo('CameraModule', 'scanQRCode');

  if (isResponseError(response)) {
    console.log('Could not check access:', response.error);
  } else if (isResponseOk(response)) {
    console.log('Has access:', response.result.hasAccess);
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### reloadScopes()

> **reloadScopes**(): `Promise`\<[`ReloadScopesResponse`](../type-aliases/ReloadScopesResponse.md)\>

Requests to reload the consented OAuth scopes for the current client.
This refreshes the permissions from the server.

#### Returns

`Promise`\<[`ReloadScopesResponse`](../type-aliases/ReloadScopesResponse.md)\>

A promise that resolves to a response with one of the following possible status codes:
- `200`: Scopes reloaded successfully
- `424`: ScopeKit error

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ScopeModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ScopeModule, isResponseOk, isResponseError } = window.SuperAppSDK;

// Initialize the scope module
const scopeModule = new ScopeModule();

// Reload scopes
try {
  const response = await scopeModule.reloadScopes();

  if (isResponseError(response)) {
    console.log('Could not reload scopes:', response.error);
  } else if (isResponseOk(response)) {
    console.log('Scopes reloaded successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```
