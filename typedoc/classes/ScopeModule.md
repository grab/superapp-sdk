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

> **hasAccessTo**(`module`: `string`, `method`: `string`): [`HasAccessToResponse`](../type-aliases/HasAccessToResponse.md)

Checks if the current client has access to a specific JSBridge API method.

#### Parameters

##### module

`string`

The name of the bridge module to check access for (e.g., 'CameraModule').

##### method

`string`

The method name within the module to check access for (e.g., 'scanQRCode').

#### Returns

[`HasAccessToResponse`](../type-aliases/HasAccessToResponse.md)

Whether the MiniApp has permission to access the specified method.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ScopeModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ScopeModule } = window.SuperAppSDK;

// Initialize the scope module
const scopeModule = new ScopeModule();

// Check access to CameraModule.scanQRCode
try {
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
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### reloadScopes()

> **reloadScopes**(): [`ReloadScopesResponse`](../type-aliases/ReloadScopesResponse.md)

Requests to reload the consented OAuth scopes for the current client.
This refreshes the permissions from the server.

#### Returns

[`ReloadScopesResponse`](../type-aliases/ReloadScopesResponse.md)

Confirmation that the scopes have been reloaded from the server.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ScopeModule } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ScopeModule } = window.SuperAppSDK;

// Initialize the scope module
const scopeModule = new ScopeModule();

// Reload scopes
try {
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
} catch (error) {
  console.log('Unexpected error:', error);
}
```
