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

The stored boolean value.

#### Example

**Simple usage**
```typescript
// Initialize the storage module
const storageModule = new StorageModule();

// Get a boolean value
const response = await storageModule.getBoolean('isDarkMode');

switch (response.status_code) {
  case 200:
    console.log('Stored value:', response.result.value);
    break;
  case 400:
    console.log('Could not retrieve value:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
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

The stored double value.

#### Example

**Simple usage**
```typescript
// Initialize the storage module
const storageModule = new StorageModule();

// Get a double value
const response = await storageModule.getDouble('price');

switch (response.status_code) {
  case 200:
    console.log('Stored value:', response.result.value);
    break;
  case 400:
    console.log('Could not retrieve value:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
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

The stored integer value.

#### Example

**Simple usage**
```typescript
// Initialize the storage module
const storageModule = new StorageModule();

// Get an integer value
const response = await storageModule.getInt('userCount');

switch (response.status_code) {
  case 200:
    console.log('Stored value:', response.result.value);
    break;
  case 400:
    console.log('Could not retrieve value:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
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

The stored string value.

#### Example

**Simple usage**
```typescript
// Initialize the storage module
const storageModule = new StorageModule();

// Get a string value
const response = await storageModule.getString('username');

switch (response.status_code) {
  case 200:
    console.log('Stored value:', response.result.value);
    break;
  case 400:
    console.log('Could not retrieve value:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```

***

### invoke()

> **invoke**\<`T`\>(`options`: [`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>): `Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>\>

Invokes a JSBridge method with optional app validation and response transformation.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>

The invoke options including method name, params, validation, and transformation.

#### Returns

`Promise`\<[`BridgeResponse`](../type-aliases/BridgeResponse.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>\>

A promise resolving to the JSBridge response.

#### Remarks

- Always checks if running in Grab app (returns 501 if not).
- When `isSupported` returns false, returns 426 (Upgrade Required).
- When `transformResponse` is provided, applies it to successful responses.
- All errors are reported via the `status_code` field; this method never rejects.
- For streaming methods, use `invokeStream` instead.

#### Inherited from

[`BaseModule`](BaseModule.md).[`invoke`](BaseModule.md#invoke)

***

### invokeStream()

> **invokeStream**\<`T`\>(`options`: [`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>): [`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

Invokes a JSBridge streaming method that returns a `BridgeStream`.

#### Type Parameters

##### T

`T`

#### Parameters

##### options

[`InvokeOptions`](../interfaces/InvokeOptions.md)\<`T`\>

The invoke options including method name, params, and validation.

#### Returns

[`BridgeStream`](../type-aliases/BridgeStream.md)\<keyof [`StatusCodeMap`](../type-aliases/StatusCodeMap.md)\<`unknown`\>, `T`\>

A `BridgeStream` for receiving continuous data from the JSBridge.

#### Remarks

- Always checks if running in Grab app (returns 501 error response if not).
- When `isSupported` returns false, returns 426 error response.
- Returns a `BridgeStream` that can be subscribed to or awaited for the first value.
- All errors are reported via error responses in the stream; this method never rejects.

#### Inherited from

[`BaseModule`](BaseModule.md).[`invokeStream`](BaseModule.md#invokestream)

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

Confirmation that the value was removed.

#### Example

**Simple usage**
```typescript
// Initialize the storage module
const storageModule = new StorageModule();

// Remove a value
const response = await storageModule.remove('username');

switch (response.status_code) {
  case 204:
    console.log('Value removed successfully');
    break;
  case 400:
    console.log('Could not remove value:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```

***

### removeAll()

> **removeAll**(): `Promise`\<[`RemoveAllResponse`](../type-aliases/RemoveAllResponse.md)\>

Removes all values from the native storage.

#### Returns

`Promise`\<[`RemoveAllResponse`](../type-aliases/RemoveAllResponse.md)\>

Confirmation that all values were removed.

#### Example

**Simple usage**
```typescript
// Initialize the storage module
const storageModule = new StorageModule();

// Remove all values
const response = await storageModule.removeAll();

switch (response.status_code) {
  case 204:
    console.log('All values removed successfully');
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
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

Confirmation that the boolean value was stored.

#### Example

**Simple usage**
```typescript
// Initialize the storage module
const storageModule = new StorageModule();

// Set a boolean value
const response = await storageModule.setBoolean('isDarkMode', true);

switch (response.status_code) {
  case 204:
    console.log('Value stored successfully');
    break;
  case 400:
    console.log('Could not store value:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
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

Confirmation that the double value was stored.

#### Example

**Simple usage**
```typescript
// Initialize the storage module
const storageModule = new StorageModule();

// Set a double value
const response = await storageModule.setDouble('price', 19.99);

switch (response.status_code) {
  case 204:
    console.log('Value stored successfully');
    break;
  case 400:
    console.log('Could not store value:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
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

Confirmation that the integer value was stored.

#### Example

**Simple usage**
```typescript
// Initialize the storage module
const storageModule = new StorageModule();

// Set an integer value
const response = await storageModule.setInt('userCount', 42);

switch (response.status_code) {
  case 204:
    console.log('Value stored successfully');
    break;
  case 400:
    console.log('Could not store value:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
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

Confirmation that the string value was stored.

#### Example

**Simple usage**
```typescript
// Initialize the storage module
const storageModule = new StorageModule();

// Set a string value
const response = await storageModule.setString('username', 'john_doe');

switch (response.status_code) {
  case 204:
    console.log('Value stored successfully');
    break;
  case 400:
    console.log('Could not store value:', response.error);
    break;
  case 501:
    console.log('Not in Grab app:', response.error);
    break;
  default:
    console.log('Unexpected status code:', response);
}
```
