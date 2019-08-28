# StorageModule

## Description

Provides persistence storage APIs, which helps the webview have access to persistence information for multiple sessions. Once the user logs out, all saved data will be removed.

## Methods

### 1. Set boolean value to local storage with key

**Method name**: `setBoolean`

**Arguments**
Name | Type | Description
--- | --- | ---
key|String|String name of the key
value|Boolean|boolean value to put to local storage

**Return type**

`None`

**Code example**

```javascript
import { StorageModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const storageModule = new StorageModule()

storageModule.setBoolean({ key, value })
  .then({ result, error }) => {
    if (!!result) {
      // There is a valid result.
    } else if (!!error) {
      // Some error happened.
    }
  }
```

### 2. Put boolean value to local storage with key

**Method name**: `getBoolean`

**Arguments**
Name | Type | Description
--- | --- | ---
key|String|String name of the key

**Return type**

`Optional<Boolean>`

**Code example**

```javascript
import { StorageModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const storageModule = new StorageModule()

storageModule.getBoolean({ key })
  .then({ result, error }) => {
    if (!!result) {
      // There is a valid result.
    } else if (!!error) {
      // Some error happened.
    }
  }
```

### 3. Set int value to local storage with key

**Method name**: `setInt`

**Arguments**
Name | Type | Description
--- | --- | ---
key|String|String name of the key
value|Int|int value to put to local storage

**Return type**

`None`

**Code example**

```javascript
import { StorageModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const storageModule = new StorageModule()

storageModule.setInt({ key, value })
  .then({ result, error }) => {
    if (!!result) {
      // There is a valid result.
    } else if (!!error) {
      // Some error happened.
    }
  }
```

### 4. Put int value to local storage with key

**Method name**: `getInt`

**Arguments**
Name | Type | Description
--- | --- | ---
key|String|String name of the key

**Return type**

`Optional<Int>`

**Code example**

```javascript
import { StorageModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const storageModule = new StorageModule()

storageModule.getInt({ key })
  .then({ result, error }) => {
    if (!!result) {
      // There is a valid result.
    } else if (!!error) {
      // Some error happened.
    }
  }
```

### 5. Set string value to local storage with key

**Method name**: `setString`

**Arguments**
Name | Type | Description
--- | --- | ---
key|String|String name of the key
value|String|string value to put to local storage

**Return type**

`None`

**Code example**

```javascript
import { StorageModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const storageModule = new StorageModule()

storageModule.setString({ key, value })
  .then({ result, error }) => {
    if (!!result) {
      // There is a valid result.
    } else if (!!error) {
      // Some error happened.
    }
  }
```

### 6. Put string value to local storage with key

**Method name**: `getString`

**Arguments**
Name | Type | Description
--- | --- | ---
key|String|String name of the key

**Return type**

`Optional<String>`

**Code example**

```javascript
import { StorageModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const storageModule = new StorageModule()

storageModule.getString({ key })
  .then({ result, error }) => {
    if (!!result) {
      // There is a valid result.
    } else if (!!error) {
      // Some error happened.
    }
  }
```

### 7. Set double value to local storage with key

**Method name**: `setDouble`

**Arguments**
Name | Type | Description
--- | --- | ---
key|String|String name of the key
value|Double|double value to put to local storage

**Return type**

`None`

**Code example**

```javascript
import { StorageModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const storageModule = new StorageModule()

storageModule.setDouble({ key, value })
  .then({ result, error }) => {
    if (!!result) {
      // There is a valid result.
    } else if (!!error) {
      // Some error happened.
    }
  }
```

### 8. Put double value to local storage with key

**Method name**: `getDouble`

**Arguments**
Name | Type | Description
--- | --- | ---
key|String|String name of the key

**Return type**

`Optional<Double>`

**Code example**

```javascript
import { StorageModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const storageModule = new StorageModule()

storageModule.getDouble({ key })
  .then({ result, error }) => {
    if (!!result) {
      // There is a valid result.
    } else if (!!error) {
      // Some error happened.
    }
  }
```

### 9. Remove a value from local storage by key

**Method name**: `remove`

**Arguments**
Name | Type | Description
--- | --- | ---
key|String|String name of the key

**Return type**

`None`

**Code example**

```javascript
import { StorageModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const storageModule = new StorageModule()

storageModule.remove({ key })
  .then({ result, error }) => {
    if (!!result) {
      // There is a valid result.
    } else if (!!error) {
      // Some error happened.
    }
  }
```

### 10. Remove all values from local storage by key

**Method name**: `removeAll`

**Arguments**: `None`

**Return type**

`None`

**Code example**

```javascript
import { StorageModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const storageModule = new StorageModule()

storageModule.removeAll({})
  .then({ result, error }) => {
    if (!!result) {
      // There is a valid result.
    } else if (!!error) {
      // Some error happened.
    }
  }
```
