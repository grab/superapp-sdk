[@grabjs/superapp-sdk](../README.md) / StorageModule

# Class: StorageModule

JSBridge module for persisting key-value data to native storage.

## Remarks

Stores data in the native app's persistent storage, allowing data to survive webview restarts.
This code must run on the Grab SuperApp's webview to function correctly.

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

A promise that resolves to a response with one of the following possible status codes:
- `200`: Value retrieved successfully
- `400`: Missing required parameters

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { StorageModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { StorageModule, isResponseOk, isResponseError } = window.SuperAppSDK;

// Initialize the storage module
const storageModule = new StorageModule();

// Get a boolean value
try {
  const response = await storageModule.getBoolean('isDarkMode');

  if (isResponseError(response)) {
    console.log('Could not retrieve value:', response.error);
  } else if (isResponseOk(response)) {
    console.log('Stored value:', response.result);
  }
} catch (error) {
  console.log('Unexpected error:', error);
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

A promise that resolves to a response with one of the following possible status codes:
- `200`: Value retrieved successfully
- `400`: Missing required parameters

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { StorageModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { StorageModule, isResponseOk, isResponseError } = window.SuperAppSDK;

// Initialize the storage module
const storageModule = new StorageModule();

// Get a double value
try {
  const response = await storageModule.getDouble('price');

  if (isResponseError(response)) {
    console.log('Could not retrieve value:', response.error);
  } else if (isResponseOk(response)) {
    console.log('Stored value:', response.result);
  }
} catch (error) {
  console.log('Unexpected error:', error);
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

A promise that resolves to a response with one of the following possible status codes:
- `200`: Value retrieved successfully
- `400`: Missing required parameters

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { StorageModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { StorageModule, isResponseOk, isResponseError } = window.SuperAppSDK;

// Initialize the storage module
const storageModule = new StorageModule();

// Get an integer value
try {
  const response = await storageModule.getInt('userCount');

  if (isResponseError(response)) {
    console.log('Could not retrieve value:', response.error);
  } else if (isResponseOk(response)) {
    console.log('Stored value:', response.result);
  }
} catch (error) {
  console.log('Unexpected error:', error);
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

A promise that resolves to a response with one of the following possible status codes:
- `200`: Value retrieved successfully
- `400`: Missing required parameters

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { StorageModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { StorageModule, isResponseOk, isResponseError } = window.SuperAppSDK;

// Initialize the storage module
const storageModule = new StorageModule();

// Get a string value
try {
  const response = await storageModule.getString('username');

  if (isResponseError(response)) {
    console.log('Could not retrieve value:', response.error);
  } else if (isResponseOk(response)) {
    console.log('Stored value:', response.result);
  }
} catch (error) {
  console.log('Unexpected error:', error);
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

A promise that resolves to a response with one of the following possible status codes:
- `204`: Value removed successfully
- `400`: Missing required parameters

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { StorageModule, isResponseNoContent, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { StorageModule, isResponseNoContent, isResponseError } = window.SuperAppSDK;

// Initialize the storage module
const storageModule = new StorageModule();

// Remove a value
try {
  const response = await storageModule.remove('username');

  if (isResponseError(response)) {
    console.log('Could not remove value:', response.error);
  } else if (isResponseNoContent(response)) {
    console.log('Value removed successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```

***

### removeAll()

> **removeAll**(): `Promise`\<[`BridgeStatusCode204Response`](../type-aliases/BridgeStatusCode204Response.md)\>

Removes all values from the native storage.

#### Returns

`Promise`\<[`BridgeStatusCode204Response`](../type-aliases/BridgeStatusCode204Response.md)\>

A promise that resolves to a `204` status code when all values are removed.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { StorageModule, isResponseNoContent } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { StorageModule, isResponseNoContent } = window.SuperAppSDK;

// Initialize the storage module
const storageModule = new StorageModule();

// Remove all values
try {
  const response = await storageModule.removeAll();

  if (isResponseNoContent(response)) {
    console.log('All values removed successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
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

A promise that resolves to a response with one of the following possible status codes:
- `204`: Value stored successfully
- `400`: Missing required parameters

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { StorageModule, isResponseNoContent, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { StorageModule, isResponseNoContent, isResponseError } = window.SuperAppSDK;

// Initialize the storage module
const storageModule = new StorageModule();

// Set a boolean value
try {
  const response = await storageModule.setBoolean('isDarkMode', true);

  if (isResponseError(response)) {
    console.log('Could not store value:', response.error);
  } else if (isResponseNoContent(response)) {
    console.log('Value stored successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
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

A promise that resolves to a response with one of the following possible status codes:
- `204`: Value stored successfully
- `400`: Missing required parameters

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { StorageModule, isResponseNoContent, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { StorageModule, isResponseNoContent, isResponseError } = window.SuperAppSDK;

// Initialize the storage module
const storageModule = new StorageModule();

// Set a double value
try {
  const response = await storageModule.setDouble('price', 19.99);

  if (isResponseError(response)) {
    console.log('Could not store value:', response.error);
  } else if (isResponseNoContent(response)) {
    console.log('Value stored successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
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

A promise that resolves to a response with one of the following possible status codes:
- `204`: Value stored successfully
- `400`: Missing required parameters

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { StorageModule, isResponseNoContent, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { StorageModule, isResponseNoContent, isResponseError } = window.SuperAppSDK;

// Initialize the storage module
const storageModule = new StorageModule();

// Set an integer value
try {
  const response = await storageModule.setInt('userCount', 42);

  if (isResponseError(response)) {
    console.log('Could not store value:', response.error);
  } else if (isResponseNoContent(response)) {
    console.log('Value stored successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
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

A promise that resolves to a response with one of the following possible status codes:
- `204`: Value stored successfully
- `400`: Missing required parameters

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { StorageModule, isResponseNoContent, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { StorageModule, isResponseNoContent, isResponseError } = window.SuperAppSDK;

// Initialize the storage module
const storageModule = new StorageModule();

// Set a string value
try {
  const response = await storageModule.setString('username', 'john_doe');

  if (isResponseError(response)) {
    console.log('Could not store value:', response.error);
  } else if (isResponseNoContent(response)) {
    console.log('Value stored successfully');
  }
} catch (error) {
  console.log('Unexpected error:', error);
}
```
