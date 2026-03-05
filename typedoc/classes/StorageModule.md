[@grabjs/superapp-sdk](../README.md) / StorageModule

# Class: StorageModule

JSBridge module for persisting key-value data to native storage.

## Remarks

Stores data in the native app's persistent storage, allowing data to survive webview restarts.
Requires the MiniApp to be running within the Grab SuperApp's webview.

## Examples

**ES Module:**
```typescript
import { StorageModule } from '@grabjs/superapp-sdk';
const storage = new StorageModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const storage = new SuperAppSDK.StorageModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new StorageModule**(): `StorageModule`

#### Returns

`StorageModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### getBoolean()

> **getBoolean**(`key`: `string`): `Promise`\<[`GetBooleanResponse`](../type-aliases/GetBooleanResponse.md)\>

Retrieves a boolean value from the native storage.

#### Parameters

##### key

`string`

The key to retrieve the value for.

#### Returns

`Promise`\<[`GetBooleanResponse`](../type-aliases/GetBooleanResponse.md)\>

Resolves with the stored boolean value on success, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Get a boolean value
```typescript
const response = await storageModule.getBoolean('isDarkMode');
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await storageModule.getBoolean('isDarkMode');
  switch (status_code) {
    case 200:
      console.log('Stored value:', result);
      break;
    default:
      console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
}
```

***

### getDouble()

> **getDouble**(`key`: `string`): `Promise`\<[`GetDoubleResponse`](../type-aliases/GetDoubleResponse.md)\>

Retrieves a double (floating point) value from the native storage.

#### Parameters

##### key

`string`

The key to retrieve the value for.

#### Returns

`Promise`\<[`GetDoubleResponse`](../type-aliases/GetDoubleResponse.md)\>

Resolves with the stored double value on success, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Get a double value
```typescript
const response = await storageModule.getDouble('price');
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await storageModule.getDouble('price');
  switch (status_code) {
    case 200:
      console.log('Stored value:', result);
      break;
    default:
      console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
}
```

***

### getInt()

> **getInt**(`key`: `string`): `Promise`\<[`GetIntResponse`](../type-aliases/GetIntResponse.md)\>

Retrieves an integer value from the native storage.

#### Parameters

##### key

`string`

The key to retrieve the value for.

#### Returns

`Promise`\<[`GetIntResponse`](../type-aliases/GetIntResponse.md)\>

Resolves with the stored integer value on success, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Get an integer value
```typescript
const response = await storageModule.getInt('userCount');
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await storageModule.getInt('userCount');
  switch (status_code) {
    case 200:
      console.log('Stored value:', result);
      break;
    default:
      console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
}
```

***

### getString()

> **getString**(`key`: `string`): `Promise`\<[`GetStringResponse`](../type-aliases/GetStringResponse.md)\>

Retrieves a string value from the native storage.

#### Parameters

##### key

`string`

The key to retrieve the value for.

#### Returns

`Promise`\<[`GetStringResponse`](../type-aliases/GetStringResponse.md)\>

Resolves with the stored string value on success, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Get a string value
```typescript
const response = await storageModule.getString('username');
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await storageModule.getString('username');
  switch (status_code) {
    case 200:
      console.log('Stored value:', result);
      break;
    default:
      console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
}
```

***

### remove()

> **remove**(`key`: `string`): `Promise`\<[`RemoveResponse`](../type-aliases/RemoveResponse.md)\>

Removes a single value from the native storage by key.

#### Parameters

##### key

`string`

The key to remove from storage.

#### Returns

`Promise`\<[`RemoveResponse`](../type-aliases/RemoveResponse.md)\>

Resolves when the value is removed successfully, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Remove a value
```typescript
const response = await storageModule.remove('username');
```

Handling the response
```typescript
try {
  const { status_code, error } = await storageModule.remove('username');
  switch (status_code) {
    case 200:
      console.log('Value removed successfully');
      break;
    default:
      console.log(`Could not remove value${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not remove value${error ? `: ${error}` : ''}`);
}
```

***

### removeAll()

> **removeAll**(): `Promise`\<[`RemoveAllResponse`](../type-aliases/RemoveAllResponse.md)\>

Removes all values from the native storage.

#### Returns

`Promise`\<[`RemoveAllResponse`](../type-aliases/RemoveAllResponse.md)\>

Resolves when all values are removed successfully, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Remove all values
```typescript
const response = await storageModule.removeAll();
```

Handling the response
```typescript
try {
  const { status_code, error } = await storageModule.removeAll();
  switch (status_code) {
    case 200:
      console.log('All values removed successfully');
      break;
    default:
      console.log(`Could not remove values${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not remove values${error ? `: ${error}` : ''}`);
}
```

***

### setBoolean()

> **setBoolean**(`key`: `string`, `value`: `boolean`): `Promise`\<[`SetBooleanResponse`](../type-aliases/SetBooleanResponse.md)\>

Stores a boolean value in the native storage.

#### Parameters

##### key

`string`

The key to store the value under.

##### value

`boolean`

The boolean value to store.

#### Returns

`Promise`\<[`SetBooleanResponse`](../type-aliases/SetBooleanResponse.md)\>

Resolves when the value is stored successfully, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Set a boolean value
```typescript
const response = await storageModule.setBoolean('isDarkMode', true);
```

Handling the response
```typescript
try {
  const { status_code, error } = await storageModule.setBoolean('isDarkMode', true);
  switch (status_code) {
    case 204:
      console.log('Value stored successfully');
      break;
    default:
      console.log(`Could not store value${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not store value${error ? `: ${error}` : ''}`);
}
```

***

### setDouble()

> **setDouble**(`key`: `string`, `value`: `number`): `Promise`\<[`SetDoubleResponse`](../type-aliases/SetDoubleResponse.md)\>

Stores a double (floating point) value in the native storage.

#### Parameters

##### key

`string`

The key to store the value under.

##### value

`number`

The double value to store.

#### Returns

`Promise`\<[`SetDoubleResponse`](../type-aliases/SetDoubleResponse.md)\>

Resolves when the value is stored successfully, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Set a double value
```typescript
const response = await storageModule.setDouble('price', 19.99);
```

Handling the response
```typescript
try {
  const { status_code, error } = await storageModule.setDouble('price', 19.99);
  switch (status_code) {
    case 204:
      console.log('Value stored successfully');
      break;
    default:
      console.log(`Could not store value${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not store value${error ? `: ${error}` : ''}`);
}
```

***

### setInt()

> **setInt**(`key`: `string`, `value`: `number`): `Promise`\<[`SetIntResponse`](../type-aliases/SetIntResponse.md)\>

Stores an integer value in the native storage.

#### Parameters

##### key

`string`

The key to store the value under.

##### value

`number`

The integer value to store.

#### Returns

`Promise`\<[`SetIntResponse`](../type-aliases/SetIntResponse.md)\>

Resolves when the value is stored successfully, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Set an integer value
```typescript
const response = await storageModule.setInt('userCount', 42);
```

Handling the response
```typescript
try {
  const { status_code, error } = await storageModule.setInt('userCount', 42);
  switch (status_code) {
    case 204:
      console.log('Value stored successfully');
      break;
    default:
      console.log(`Could not store value${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not store value${error ? `: ${error}` : ''}`);
}
```

***

### setString()

> **setString**(`key`: `string`, `value`: `string`): `Promise`\<[`SetStringResponse`](../type-aliases/SetStringResponse.md)\>

Stores a string value in the native storage.

#### Parameters

##### key

`string`

The key to store the value under.

##### value

`string`

The string value to store.

#### Returns

`Promise`\<[`SetStringResponse`](../type-aliases/SetStringResponse.md)\>

Resolves when the value is stored successfully, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Set a string value
```typescript
const response = await storageModule.setString('username', 'john_doe');
```

Handling the response
```typescript
try {
  const { status_code, error } = await storageModule.setString('username', 'john_doe');
  switch (status_code) {
    case 204:
      console.log('Value stored successfully');
      break;
    default:
      console.log(`Could not store value${error ? `: ${error}` : ''}`);
      break;
  }
} catch (error) {
  console.log(`Could not store value${error ? `: ${error}` : ''}`);
}
```
