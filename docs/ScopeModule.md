# What is ScopeModule ?

`ScopeModule` Provides access scope control related API.


## Methods


### 1. Check if current client has access to specific API
```javascript
ScopeModule.hasAccessTo(module, method)
```


#### Params
Name | Type | Description
 --- | --- | ---
module  | String  | Bridge module name
method  | String  | Method name

#### Result
Type | Description
 --- | ---
Bool  | Bridge module name

#### Result example
```json
{
    status_code: 200
    result : true
}
```
</br>

### 2. Request to reload consented scopes for current client
```javascript
ScopeModule.reloadScopes()
```

#### Params
No parameters required for this request

#### Result
No result type is associated with this request.

#### Response example
```json
{
    status_code: 200
}
```