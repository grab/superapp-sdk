# LocaleModule

## API Reference

SDK module for accessing device locale settings via `JSBridge`.

| Method | Returns | Description |
| :--- | :--- | :--- |
| `getAppLocaleIdentifier()` | `Promise<GetAppLocaleIdentifierResponse>` | Retrieves the current app locale identifier from the device. |
| `getLanguageLocaleIdentifier()` | `Promise<GetLanguageLocaleIdentifierResponse>` | Retrieves the current language locale identifier from the device. |

## `getAppLocaleIdentifier`

Retrieves the current app locale identifier from the device.

**Signature:** `getAppLocaleIdentifier(): Promise<GetAppLocaleIdentifierResponse>`

This method can return the following `status_code` values:
- `200` (OK): Locale identifier retrieved successfully.
- `400` (Bad Request): Invalid request parameters.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { LocaleModule, isSuccess, isError } from '@grabjs/superapp-sdk';

const locale = new LocaleModule();
const response = await locale.getAppLocaleIdentifier();

if (isSuccess(response)) {
  console.log('Current app locale:', response.result);
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
}
```

## `getLanguageLocaleIdentifier`

Retrieves the current language locale identifier from the device.

**Signature:** `getLanguageLocaleIdentifier(): Promise<GetLanguageLocaleIdentifierResponse>`

This method can return the following `status_code` values:
- `200` (OK): Locale identifier retrieved successfully.
- `204` (No Content): Locale identifier not available.
- `400` (Bad Request): Invalid request parameters.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { LocaleModule, isSuccess, isError } from '@grabjs/superapp-sdk';

// Initialize the locale module
const locale = new LocaleModule();

// Get the current locale
const response = await locale.getLanguageLocaleIdentifier();

// Handle the response
if (isSuccess(response)) {
  console.log('Current locale:', response.result);
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
} else {
  console.error('Unhandled response');
}
```
