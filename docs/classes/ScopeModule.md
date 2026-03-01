[@grabjs/superapp-sdk](../globals.md) / ScopeModule

# Class: ScopeModule

Provides access to scope control related APIs.

## Remarks

The ScopeModule enables miniapps to check permissions and reload scope configurations.
Use this module to verify access to sensitive APIs before calling them and to refresh
permission states after the user grants new permissions.

## Examples

**ES Module:**
```typescript
import { ScopeModule } from '@grabjs/superapp-sdk';

const scopeModule = new ScopeModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const scopeModule = new SuperAppSDK.ScopeModule();
</script>
```

## Extends

- `BaseModule`

## Constructors

### Constructor

> **new ScopeModule**(): `ScopeModule`

#### Returns

`ScopeModule`

#### Overrides

`BaseModule.constructor`

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

#### Examples

Check location permission:
```typescript
try {
  const response = await scopeModule.hasAccessTo('LocationModule', 'getCoordinate');
  if (response.status_code === 200 && response.result === true) {
    const location = await locationModule.getCoordinate();
  }
} catch (error) {
  console.error(error);
}
```

Check profile permission:
```typescript
try {
  const response = await scopeModule.hasAccessTo('ProfileModule', 'fetchEmail');
  if (response.status_code === 200 && response.result === true) {
    await profileModule.fetchEmail();
  }
} catch (error) {
  console.error(error);
}
```

Handling the response:
```typescript
try {
  const response = await scopeModule.hasAccessTo('LocationModule', 'getCoordinate');

  switch (response.status_code) {
    case 200:
      if (response.result === true) {
        console.log('Location access granted');
      } else {
        console.log('Location access denied');
      }
      break;
    case 400:
      console.error('Invalid request:', response.error);
      break;
    case 500:
      console.error('Access check error:', response.error);
      break;
  }
} catch (error) {
  console.error(error);
}
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

#### Examples

Basic usage:
```typescript
try {
  await scopeModule.reloadScopes();
  const response = await scopeModule.hasAccessTo('LocationModule', 'getCoordinate');
} catch (error) {
  console.error(error);
}
```

Handling the response:
```typescript
try {
  const response = await scopeModule.reloadScopes();

  switch (response.status_code) {
    case 200:
      console.log('Scopes reloaded successfully');
      const accessResponse = await scopeModule.hasAccessTo('LocationModule', 'getCoordinate');
      if (accessResponse.result) {
        console.log('New permission is now active');
      }
      break;
    case 400:
      console.error('Invalid request:', response.error);
      break;
    case 500:
      console.error('Reload scopes error:', response.error);
      break;
  }
} catch (error) {
  console.error(error);
}
```
