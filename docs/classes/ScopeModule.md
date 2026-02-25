[@grabjs/superapp-sdk](../README.md) / ScopeModule

# Class: ScopeModule

The ScopeModule provides access to scope control related APIs.

## Example

```javascript
import { ScopeModule } from '@grabjs/superapp-sdk';

// Ideally, initialize this only once and reuse across app.
const scopeModule = new ScopeModule();
```

## Extends

- `ModuleBase`

## Constructors

### Constructor

> **new ScopeModule**(): `ScopeModule`

#### Returns

`ScopeModule`

#### Overrides

`ModuleBase.constructor`

## Methods

### hasAccessTo()

> **hasAccessTo**(`module`: `string`, `method`: `string`): `Promise`\<[`HasAccessToResponse`](../type-aliases/HasAccessToResponse.md)\>

Check if the current client has access to a specific API method.

#### Parameters

##### module

`string`

Bridge module name (e.g., "LocationModule", "ProfileModule").

##### method

`string`

Method name (e.g., "getCoordinate", "fetchEmail").

#### Returns

`Promise`\<[`HasAccessToResponse`](../type-aliases/HasAccessToResponse.md)\>

Promise that resolves to [HasAccessToResponse](../type-aliases/HasAccessToResponse.md) with a boolean indicating access.

#### Remarks

Use this method to verify permissions before calling sensitive APIs.
Returns `true` if the scope is granted, `false` otherwise.

#### Example

```javascript
// Check location permission before accessing coordinates
const { result, error, status_code } = await scopeModule.hasAccessTo(
  'LocationModule',
  'getCoordinate'
);

if (result === true) {
  console.log("Location access granted");
  // Proceed with location API call
  const location = await locationModule.getCoordinate();
} else if (result === false) {
  console.log("Location access denied");
  // Show message to user or request permission
  showPermissionRequest();
} else if (error) {
  console.error("Access check error:", error);
}

// Check profile permission
scopeModule.hasAccessTo('ProfileModule', 'fetchEmail')
  .then(({ result }) => {
    if (result) {
      profileModule.fetchEmail();
    }
  });
```

***

### reloadScopes()

> **reloadScopes**(): `Promise`\<[`ReloadScopesResponse`](../type-aliases/ReloadScopesResponse.md)\>

Request to reload consented scopes for the current client.

#### Returns

`Promise`\<[`ReloadScopesResponse`](../type-aliases/ReloadScopesResponse.md)\>

Promise that resolves to [ReloadScopesResponse](../type-aliases/ReloadScopesResponse.md) when scopes are reloaded.

#### Remarks

Use this method after the user has granted new permissions to refresh the scope cache.
This ensures that subsequent [hasAccessTo](#hasaccessto) calls reflect the updated permissions.

**Status Codes:**
- `200` or `204`: The operation succeeded

#### Example

```javascript
// After user grants new permissions
scopeModule.reloadScopes()
  .then(({ status_code, error }) => {
    if (status_code === 200 || status_code === 204) {
      console.log("Scopes reloaded successfully");
      
      // Now check if new permission is available
      scopeModule.hasAccessTo('LocationModule', 'getCoordinate')
        .then(({ result }) => {
          if (result) {
            console.log("New permission is now active");
          }
        });
    } else if (error) {
      console.error("Reload scopes error:", error);
    }
  });
```
