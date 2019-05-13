# What is ScopeModule ?

`ScopeModule` Provides access scope control related API.


## Methods


### 1. Check if current client has access to specific API

#### Method name
```javascript
hasAccessTo(module, method)
```

#### Params
Name | Type | Description
 --- | --- | ---
module  | String  | Bridge module name
method  | String  | Method name

#### Return type
Type | Description
 --- | ---
Bool  | Bridge module name

#### Code example
```javascript
import { ScopeModule } from '@grabjs/superapp-sdk';

const scopeModule = new ScopeModule();

// This returns a Promise.
scopeModule.hasAccessTo('LocationModule', 'getCoordinate')
  .then(({ result, error, status_code }) => {
    if (!!result) {
      // Access is granted.
    }
  })
```

#### Return example
```json
{
    "status_code": 200,
    "result" : true
}
```

### 2. Request to reload consented scopes for current client

#### Method name
```javascript
reloadScopes()
```

#### Params
No parameters required for this request

#### Return type
No result type is associated with this request.

```javascript
import { ScopeModule } from '@grabjs/superapp-sdk';

const scopeModule = new ScopeModule();

// This returns a Promise.
scopeModule.reloadScopes()
  .then(({ status_code }) => {
    if (`${status_code}`.startsWith('20')) {
      // Reload is successful.
    }
  })
```

#### Return example
```json
{
    "status_code": 200,
}
```