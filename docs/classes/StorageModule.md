[@grabjs/superapp-sdk](../README.md) / StorageModule

# Class: StorageModule

Provides persistence storage APIs for maintaining data across multiple sessions.

## Remarks

**Important:** Once the user logs out, all saved data will be removed.

The StorageModule enables miniapps to store and retrieve primitive values (boolean, integer,
string, double) that persist across webview sessions.

## Examples

**ES Module:**
```typescript
import { StorageModule } from '@grabjs/superapp-sdk';

const storageModule = new StorageModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const storageModule = new SuperAppSDK.StorageModule();
</script>
```

## Extends

- `BaseModule`

## Constructors

### Constructor

> **new StorageModule**(): `StorageModule`

#### Returns

`StorageModule`

#### Overrides

`BaseModule.constructor`

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

```typescript
try {
  await storageModule.setBoolean('isEnabled', true);
} catch (error) {
  console.error(error);
}
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

```typescript
try {
  const response = await storageModule.getBoolean('isEnabled');
  if (response.status_code === 200 && response.result !== undefined) {
    console.log("Stored value:", response.result);
    if (response.result) {
      enableFeature();
    }
  }
} catch (error) {
  console.error(error);
}
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

```typescript
try {
  await storageModule.setInt('count', 42);
} catch (error) {
  console.error(error);
}
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

```typescript
try {
  const response = await storageModule.getInt('count');
  if (response.status_code === 200 && response.result !== undefined) {
    console.log("Stored count:", response.result);
    updateCounter(response.result);
  }
} catch (error) {
  console.error(error);
}
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

```typescript
try {
  await storageModule.setString('username', 'john_doe');
} catch (error) {
  console.error(error);
}
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

```typescript
try {
  const response = await storageModule.getString('username');
  if (response.status_code === 200 && response.result) {
    console.log("Stored username:", response.result);
    displayUsername(response.result);
  }
} catch (error) {
  console.error(error);
}
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

```typescript
try {
  await storageModule.setDouble('price', 19.99);
} catch (error) {
  console.error(error);
}
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

```typescript
try {
  const response = await storageModule.getDouble('price');
  if (response.status_code === 200 && response.result !== undefined) {
    console.log("Stored price:", response.result);
    displayPrice(response.result);
  }
} catch (error) {
  console.error(error);
}
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

```typescript
try {
  await storageModule.remove('username');
} catch (error) {
  console.error(error);
}
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

#### Examples

```typescript
try {
  await storageModule.removeAll();
} catch (error) {
  console.error(error);
}
```

Clear storage on logout
```typescript
logoutButton.addEventListener('click', async () => {
  try {
    await storageModule.removeAll();
    window.location.href = '/login';
  } catch (error) {
    console.error(error);
  }
});
```
