[@grabjs/superapp-sdk](../README.md) / StorageModule

# Class: StorageModule

Provides persistence storage APIs, which helps the webview have access to persistence information for multiple sessions.

**Important:** Once the user logs out, all saved data will be removed.

## Example

```javascript
import { StorageModule } from '@grabjs/superapp-sdk';

// Ideally, initialize this only once and reuse across app.
const storageModule = new StorageModule();
```

## Extends

- `ModuleBase`

## Constructors

### Constructor

> **new StorageModule**(): `StorageModule`

#### Returns

`StorageModule`

#### Overrides

`ModuleBase.constructor`

## Methods

### setBoolean()

> **setBoolean**(`key`: `string`, `value`: `boolean`): `Promise`\<[`SetResponse`](../type-aliases/SetResponse.md)\>

Store a boolean value in local storage with a key.

#### Parameters

##### key

`string`

String name of the key to store the value under.

##### value

`boolean`

Boolean value to store.

#### Returns

`Promise`\<[`SetResponse`](../type-aliases/SetResponse.md)\>

Promise that resolves to [SetResponse](../type-aliases/SetResponse.md) when value is stored.

#### Remarks

**Important:** Once the user logs out, all saved data will be removed.

#### Example

```javascript
storageModule.setBoolean('isEnabled', true)
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("Boolean value stored successfully");
    } else if (error) {
      console.error("Storage error:", error);
    }
  });
```

***

### getBoolean()

> **getBoolean**(`key`: `string`): `Promise`\<[`GetBooleanResponse`](../type-aliases/GetBooleanResponse.md)\>

Retrieve a boolean value from local storage by key.

#### Parameters

##### key

`string`

String name of the key to retrieve.

#### Returns

`Promise`\<[`GetBooleanResponse`](../type-aliases/GetBooleanResponse.md)\>

Promise that resolves to [GetBooleanResponse](../type-aliases/GetBooleanResponse.md) with the stored boolean value.

#### Example

```javascript
storageModule.getBoolean('isEnabled')
  .then(({ result, error, status_code }) => {
    if (status_code === 200 && result !== undefined) {
      console.log("Stored value:", result);
      if (result) {
        enableFeature();
      }
    } else if (error) {
      console.error("Storage error:", error);
    }
  });
```

***

### setInt()

> **setInt**(`key`: `string`, `value`: `number`): `Promise`\<[`SetResponse`](../type-aliases/SetResponse.md)\>

Store an integer value in local storage with a key.

#### Parameters

##### key

`string`

String name of the key to store the value under.

##### value

`number`

Integer value to store.

#### Returns

`Promise`\<[`SetResponse`](../type-aliases/SetResponse.md)\>

Promise that resolves to [SetResponse](../type-aliases/SetResponse.md) when value is stored.

#### Remarks

**Important:** Once the user logs out, all saved data will be removed.

#### Example

```javascript
storageModule.setInt('count', 42)
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("Integer value stored successfully");
    } else if (error) {
      console.error("Storage error:", error);
    }
  });
```

***

### getInt()

> **getInt**(`key`: `string`): `Promise`\<[`GetIntResponse`](../type-aliases/GetIntResponse.md)\>

Retrieve an integer value from local storage by key.

#### Parameters

##### key

`string`

String name of the key to retrieve.

#### Returns

`Promise`\<[`GetIntResponse`](../type-aliases/GetIntResponse.md)\>

Promise that resolves to [GetIntResponse](../type-aliases/GetIntResponse.md) with the stored integer value.

#### Example

```javascript
storageModule.getInt('count')
  .then(({ result, error, status_code }) => {
    if (status_code === 200 && result !== undefined) {
      console.log("Stored count:", result);
      updateCounter(result);
    } else if (error) {
      console.error("Storage error:", error);
    }
  });
```

***

### setString()

> **setString**(`key`: `string`, `value`: `string`): `Promise`\<[`SetResponse`](../type-aliases/SetResponse.md)\>

Store a string value in local storage with a key.

#### Parameters

##### key

`string`

String name of the key to store the value under.

##### value

`string`

String value to store.

#### Returns

`Promise`\<[`SetResponse`](../type-aliases/SetResponse.md)\>

Promise that resolves to [SetResponse](../type-aliases/SetResponse.md) when value is stored.

#### Remarks

**Important:** Once the user logs out, all saved data will be removed.

#### Example

```javascript
storageModule.setString('username', 'john_doe')
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("String value stored successfully");
    } else if (error) {
      console.error("Storage error:", error);
    }
  });
```

***

### getString()

> **getString**(`key`: `string`): `Promise`\<[`GetStringResponse`](../type-aliases/GetStringResponse.md)\>

Retrieve a string value from local storage by key.

#### Parameters

##### key

`string`

String name of the key to retrieve.

#### Returns

`Promise`\<[`GetStringResponse`](../type-aliases/GetStringResponse.md)\>

Promise that resolves to [GetStringResponse](../type-aliases/GetStringResponse.md) with the stored string value.

#### Example

```javascript
storageModule.getString('username')
  .then(({ result, error, status_code }) => {
    if (status_code === 200 && result) {
      console.log("Stored username:", result);
      displayUsername(result);
    } else if (error) {
      console.error("Storage error:", error);
    }
  });
```

***

### setDouble()

> **setDouble**(`key`: `string`, `value`: `number`): `Promise`\<[`SetResponse`](../type-aliases/SetResponse.md)\>

Store a double value in local storage with a key.

#### Parameters

##### key

`string`

String name of the key to store the value under.

##### value

`number`

Double value to store.

#### Returns

`Promise`\<[`SetResponse`](../type-aliases/SetResponse.md)\>

Promise that resolves to [SetResponse](../type-aliases/SetResponse.md) when value is stored.

#### Remarks

**Important:** Once the user logs out, all saved data will be removed.

#### Example

```javascript
storageModule.setDouble('price', 19.99)
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("Double value stored successfully");
    } else if (error) {
      console.error("Storage error:", error);
    }
  });
```

***

### getDouble()

> **getDouble**(`key`: `string`): `Promise`\<[`GetDoubleResponse`](../type-aliases/GetDoubleResponse.md)\>

Retrieve a double value from local storage by key.

#### Parameters

##### key

`string`

String name of the key to retrieve.

#### Returns

`Promise`\<[`GetDoubleResponse`](../type-aliases/GetDoubleResponse.md)\>

Promise that resolves to [GetDoubleResponse](../type-aliases/GetDoubleResponse.md) with the stored double value.

#### Example

```javascript
storageModule.getDouble('price')
  .then(({ result, error, status_code }) => {
    if (status_code === 200 && result !== undefined) {
      console.log("Stored price:", result);
      displayPrice(result);
    } else if (error) {
      console.error("Storage error:", error);
    }
  });
```

***

### remove()

> **remove**(`key`: `string`): `Promise`\<[`RemoveResponse`](../type-aliases/RemoveResponse.md)\>

Remove a value from local storage by key.

#### Parameters

##### key

`string`

String name of the key to remove.

#### Returns

`Promise`\<[`RemoveResponse`](../type-aliases/RemoveResponse.md)\>

Promise that resolves to [RemoveResponse](../type-aliases/RemoveResponse.md) when value is removed.

#### Example

```javascript
storageModule.remove('username')
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("Value removed successfully");
    } else if (error) {
      console.error("Storage error:", error);
    }
  });
```

***

### removeAll()

> **removeAll**(): `Promise`\<[`RemoveAllResponse`](../type-aliases/RemoveAllResponse.md)\>

Remove all values from local storage.

#### Returns

`Promise`\<[`RemoveAllResponse`](../type-aliases/RemoveAllResponse.md)\>

Promise that resolves to [RemoveAllResponse](../type-aliases/RemoveAllResponse.md) when all values are removed.

#### Remarks

**Warning:** This will clear all data stored by your application.
Use with caution, typically during logout or app reset.

#### Example

```javascript
storageModule.removeAll()
  .then(({ result, error, status_code }) => {
    if (status_code === 200) {
      console.log("All values cleared successfully");
    } else if (error) {
      console.error("Storage error:", error);
    }
  });

// Example: Clear storage on logout
logoutButton.addEventListener('click', async () => {
  await storageModule.removeAll();
  window.location.href = '/login';
});
```
