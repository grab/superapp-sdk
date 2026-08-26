# StorageModule

## API Reference

SDK module for persisting key-value data to native storage via `JSBridge`.

- `getBoolean(key: string): Promise<GetBooleanResponse>` — Retrieves a boolean value from the native storage. (**OAuth Scope:** mobile.storage)

This method can return the following `status_code` values:
- `200` (OK): Value retrieved successfully. The `result` contains GetBooleanResult.
- `204` (No Content): Value not found in storage.
- `400` (Bad Request): Invalid request parameters.
- `424` (Failed Dependency): Storage operation failed.
- `500` (Internal Server Error): Unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the storage module
const storage = new StorageModule();

// Get a boolean value
const response = await storage.getBoolean('isDarkMode');

// Handle the response
if (isSuccess(response)) {
  if (response.status_code === 200) {
    console.log('Stored value:', response.result);
  } else if (response.status_code === 204) {
    console.log('No value stored for this key');
  }
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `getDouble(key: string): Promise<GetDoubleResponse>` — Retrieves a double (floating point) value from the native storage. (**OAuth Scope:** mobile.storage)

This method can return the following `status_code` values:
- `200` (OK): Value retrieved successfully. The `result` contains GetDoubleResult.
- `204` (No Content): Value not found in storage.
- `400` (Bad Request): Invalid request parameters.
- `424` (Failed Dependency): Storage operation failed.
- `500` (Internal Server Error): Unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the storage module
const storage = new StorageModule();

// Get a double value
const response = await storage.getDouble('price');

// Handle the response
if (isSuccess(response)) {
  if (response.status_code === 200) {
    console.log('Stored value:', response.result);
  } else if (response.status_code === 204) {
    console.log('No value stored for this key');
  }
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `getInt(key: string): Promise<GetIntResponse>` — Retrieves an integer value from the native storage. (**OAuth Scope:** mobile.storage)

This method can return the following `status_code` values:
- `200` (OK): Value retrieved successfully. The `result` contains GetIntResult.
- `204` (No Content): Value not found in storage.
- `400` (Bad Request): Invalid request parameters.
- `424` (Failed Dependency): Storage operation failed.
- `500` (Internal Server Error): Unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the storage module
const storage = new StorageModule();

// Get an integer value
const response = await storage.getInt('userCount');

// Handle the response
if (isSuccess(response)) {
  if (response.status_code === 200) {
    console.log('Stored value:', response.result);
  } else if (response.status_code === 204) {
    console.log('No value stored for this key');
  }
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `getString(key: string): Promise<GetStringResponse>` — Retrieves a string value from the native storage. (**OAuth Scope:** mobile.storage)

This method can return the following `status_code` values:
- `200` (OK): Value retrieved successfully. The `result` contains GetStringResult.
- `204` (No Content): Value not found in storage.
- `400` (Bad Request): Invalid request parameters.
- `424` (Failed Dependency): Storage operation failed.
- `500` (Internal Server Error): Unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the storage module
const storage = new StorageModule();

// Get a string value
const response = await storage.getString('username');

// Handle the response
if (isSuccess(response)) {
  if (response.status_code === 200) {
    console.log('Stored value:', response.result);
  } else if (response.status_code === 204) {
    console.log('No value stored for this key');
  }
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `remove(key: string): Promise<RemoveResponse>` — Removes a single value from the native storage by key. (**OAuth Scope:** mobile.storage)

This method can return the following `status_code` values:
- `204` (No Content): Value removed successfully.
- `400` (Bad Request): Invalid request parameters.
- `424` (Failed Dependency): Storage operation failed.
- `500` (Internal Server Error): Unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the storage module
const storage = new StorageModule();

// Remove a value
const response = await storage.remove('username');

// Handle the response
if (isSuccess(response)) {
  console.log('Value removed successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `removeAll(): Promise<RemoveAllResponse>` — Removes all values from the native storage. (**OAuth Scope:** mobile.storage)

This method can return the following `status_code` values:
- `204` (No Content): All values removed successfully.
- `424` (Failed Dependency): Storage operation failed.
- `500` (Internal Server Error): Unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the storage module
const storage = new StorageModule();

// Remove all values
const response = await storage.removeAll();

// Handle the response
if (isSuccess(response)) {
  console.log('All values removed successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `setBoolean(key: string, value: boolean): Promise<SetBooleanResponse>` — Stores a boolean value in the native storage. (**OAuth Scope:** mobile.storage)

This method can return the following `status_code` values:
- `204` (No Content): Value stored successfully.
- `400` (Bad Request): Invalid request parameters.
- `424` (Failed Dependency): Storage operation failed.
- `500` (Internal Server Error): Unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the storage module
const storage = new StorageModule();

// Set a boolean value
const response = await storage.setBoolean('isDarkMode', true);

// Handle the response
if (isSuccess(response)) {
  console.log('Value stored successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `setDouble(key: string, value: number): Promise<SetDoubleResponse>` — Stores a double (floating point) value in the native storage. (**OAuth Scope:** mobile.storage)

This method can return the following `status_code` values:
- `204` (No Content): Value stored successfully.
- `400` (Bad Request): Invalid request parameters.
- `424` (Failed Dependency): Storage operation failed.
- `500` (Internal Server Error): Unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the storage module
const storage = new StorageModule();

// Set a double value
const response = await storage.setDouble('price', 19.99);

// Handle the response
if (isSuccess(response)) {
  console.log('Value stored successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `setInt(key: string, value: number): Promise<SetIntResponse>` — Stores an integer value in the native storage. (**OAuth Scope:** mobile.storage)

This method can return the following `status_code` values:
- `204` (No Content): Value stored successfully.
- `400` (Bad Request): Invalid request parameters.
- `424` (Failed Dependency): Storage operation failed.
- `500` (Internal Server Error): Unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the storage module
const storage = new StorageModule();

// Set an integer value
const response = await storage.setInt('userCount', 42);

// Handle the response
if (isSuccess(response)) {
  console.log('Value stored successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```

- `setString(key: string, value: string): Promise<SetStringResponse>` — Stores a string value in the native storage. (**OAuth Scope:** mobile.storage)

This method can return the following `status_code` values:
- `204` (No Content): Value stored successfully.
- `400` (Bad Request): Invalid request parameters.
- `424` (Failed Dependency): Storage operation failed.
- `500` (Internal Server Error): Unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the storage module
const storage = new StorageModule();

// Set a string value
const response = await storage.setString('username', 'john_doe');

// Handle the response
if (isSuccess(response)) {
  console.log('Value stored successfully');
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```
