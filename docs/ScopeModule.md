# ScopeModule

## Description

Access scope control related API.

## Methods

### 1. Check if current client has access to specific API

**Method name**: `hasAccessTo`

**Arguments**

| Name   | Type   | Description        |
| ------ | ------ | ------------------ |
| module | String | Bridge module name |
| method | String | Method name        |

**Return type**

`Boolean`

**Code example**

```javascript
import { ScopeModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const scopeModule = new ScopeModule()

scopeModule.hasAccessTo({ module, method })
  .then({ result, error }) => {
    if (!!result) {
      // There is a valid result.
    } else if (!!error) {
      // Some error happened.
    }
  }
```

### 2. Request to reload consented scopes for current client

**Method name**: `reloadScopes`

**Arguments**: `None`

**Return type**

`Void`

**Code example**

```javascript
import { ScopeModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const scopeModule = new ScopeModule()

scopeModule.reloadScopes({})
  .then({ status_code, error }) => {
    if (`${status_code}`.startsWith('20')) {
      // The operation succeeded.
    } else if (!!error) {
      // Some error happened.
    }
  }
```
