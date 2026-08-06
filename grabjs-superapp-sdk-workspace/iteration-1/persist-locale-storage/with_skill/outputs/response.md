# Persisting a selected language and reading device locale

You need two modules from `@grabjs/superapp-sdk`:

- **`StorageModule`** — persists your app's own key-value data (e.g. the user's chosen language) to native storage so it survives app restarts. Use `setString` to save it and `getString` to read it back on launch. Requires the `mobile.storage` OAuth scope.
- **`LocaleModule`** — reads the device's current locale/language setting via `getLanguageLocaleIdentifier()`. Use this on startup as the fallback/default when you don't yet have a saved user preference.

## How it fits together

1. On app startup, try to read the persisted language preference from `StorageModule.getString(...)`.
2. If nothing has been saved yet (e.g. a `404`), fall back to the device's current locale via `LocaleModule.getLanguageLocaleIdentifier()`.
3. Whenever the user picks a language in your UI, write it back with `StorageModule.setString(...)` so it's restored next launch.

## Example code

```typescript
import { StorageModule, LocaleModule, isSuccess, isError } from '@grabjs/superapp-sdk';

const storage = new StorageModule();
const locale = new LocaleModule();

const LANGUAGE_KEY = 'user_selected_language';

/**
 * Call this on app startup to determine which language to use.
 */
async function resolveStartupLanguage(): Promise<string> {
  // 1. Check for a previously persisted user selection.
  const stored = await storage.getString(LANGUAGE_KEY);

  if (isSuccess(stored) && stored.result) {
    return stored.result; // e.g. "id-ID"
  }

  if (isError(stored)) {
    // 404 = no value saved yet; other errors (403, 426, 501) are logged but
    // we still fall back to the device locale below.
    console.warn(`No saved language (status ${stored.status_code}): ${stored.error}`);
  }

  // 2. Fall back to the device's current locale.
  const deviceLocale = await locale.getLanguageLocaleIdentifier();

  if (isSuccess(deviceLocale)) {
    return deviceLocale.result; // e.g. "en-SG"
  }

  // 3. Final fallback if we're outside the Grab SuperApp WebView, etc.
  return 'en-US';
}

/**
 * Call this whenever the user changes their language in your UI.
 */
async function saveSelectedLanguage(languageTag: string): Promise<void> {
  const response = await storage.setString(LANGUAGE_KEY, languageTag);

  if (isError(response)) {
    console.error(`Failed to save language (status ${response.status_code}): ${response.error}`);
  }
}

// Usage on app init:
async function init() {
  const language = await resolveStartupLanguage();
  applyLanguage(language); // your own i18n setup
}

init();
```

## Notes

- `StorageModule` methods require the `mobile.storage` OAuth scope — make sure it's requested/granted (see the SDK's authorization flow) before calling `getString`/`setString`, otherwise you'll get a `403` response.
- All SDK calls return a response object with a `status_code` instead of throwing, so always check with `isSuccess`/`isError` (as shown above) rather than wrapping calls in try/catch.
- `StorageModule.getString` returns `404` if the key has never been set — that's the expected "no saved preference yet" case, not a failure.
- These calls only work inside the Grab SuperApp WebView; outside of it they resolve with `status_code: 501`.
