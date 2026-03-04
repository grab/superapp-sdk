[@grabjs/superapp-sdk](../README.md) / ScopeModule

# Class: ScopeModule

JSBridge module for checking and refreshing API access permissions.

## Remarks

Manages OAuth scope permissions, allowing the MiniApp to check access rights and reload scopes from the server.
Requires the MiniApp to be running within the Grab SuperApp's webview.

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

> **hasAccessTo**(`request`: [`HasAccessToRequest`](../type-aliases/HasAccessToRequest.md)): `Promise`\<[`HasAccessToResponse`](../type-aliases/HasAccessToResponse.md)\>

Checks if the current client has access to a specific JSBridge API method.

#### Parameters

##### request

[`HasAccessToRequest`](../type-aliases/HasAccessToRequest.md)

The module and method to check access for.

#### Returns

`Promise`\<[`HasAccessToResponse`](../type-aliases/HasAccessToResponse.md)\>

Resolves with the access check result on success, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Check access to CameraModule.scanQRCode
```typescript
const response = await scopeModule.hasAccessTo({ module: 'CameraModule', method: 'scanQRCode' });
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await scopeModule.hasAccessTo(request);
  switch (status_code) {
    case 200:
      console.log('Has access:', result.hasAccess);
      break;
    default:
      console.log(`Could not check access${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not check access${error ? `: ${error}` : ''}`);
}
```

***

### reloadScopes()

> **reloadScopes**(): `Promise`\<[`ReloadScopesResponse`](../type-aliases/ReloadScopesResponse.md)\>

Requests to reload the consented OAuth scopes for the current client.
This refreshes the permissions from the server.

#### Returns

`Promise`\<[`ReloadScopesResponse`](../type-aliases/ReloadScopesResponse.md)\>

Resolves when scopes are reloaded successfully, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Reload scopes
```typescript
const response = await scopeModule.reloadScopes();
```

Handling the response
```typescript
try {
  const { status_code, error } = await scopeModule.reloadScopes();
  switch (status_code) {
    case 200:
      console.log('Scopes reloaded successfully');
      break;
    default:
      console.log(`Could not reload scopes${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not reload scopes${error ? `: ${error}` : ''}`);
}
```
