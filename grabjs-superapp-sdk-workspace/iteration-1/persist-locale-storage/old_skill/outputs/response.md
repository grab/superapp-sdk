# Persisting a selected language and reading the device locale

You'll need two different modules from `@grabjs/superapp-sdk` — they solve two different problems:

- **`StorageModule`** — persists your MiniApp's own key-value data (e.g. the user's chosen language) to native storage, so it survives app restarts. This is gated behind the `mobile.storage` OAuth scope.
- **`LocaleModule`** — reads the device's _current system locale_ (e.g. `en-US`) on demand. It's a simple getter, not something you set/persist yourself.

A typical flow: on startup, try to read the persisted language preference from `StorageModule`; if none has been saved yet, fall back to the device locale from `LocaleModule`. Whenever the user changes their language in-app, save it back with `StorageModule.setString()`.

## API calls used

- `StorageModule.setString(key, value): Promise<SetStringResponse>` — store the selected language.
- `StorageModule.getString(key): Promise<GetStringResponse>` — retrieve it on the next app launch.
- `LocaleModule.getLanguageLocaleIdentifier(): Promise<GetLanguageLocaleIdentifierResponse>` — read the device's current language locale identifier.

Because `StorageModule` methods require the `mobile.storage` scope, make sure your `IdentityModule.authorize()` call requests it (this is a mobile scope, so no backend token exchange is required — access is granted in-app immediately). You can also proactively check access with `ScopeModule.hasAccessTo()` before calling storage methods.

## Example

```typescript
import {
  StorageModule,
  LocaleModule,
  ScopeModule,
  IdentityModule,
  isSuccess,
  isError,
} from '@grabjs/superapp-sdk';

const storage = new StorageModule();
const locale = new LocaleModule();
const scope = new ScopeModule();
const identity = new IdentityModule();

const LANGUAGE_KEY = 'user_selected_language';

// Call this once during initialization (after scope.reloadScopes()) to
// determine which language to render the app in.
async function resolveStartupLanguage(): Promise<string> {
  // 1. Prefer the user's previously saved preference.
  const saved = await storage.getString(LANGUAGE_KEY);

  if (isSuccess(saved) && saved.result) {
    return saved.result;
  }

  if (isError(saved) && saved.status_code === 403) {
    // Missing mobile.storage scope - request it, then retry.
    const auth = await identity.authorize({
      clientId: 'your-client-id',
      redirectUri: 'https://your-miniapp.example.com/callback',
      scope: 'mobile.storage',
      environment: 'production',
      responseMode: 'in_place',
    });

    if (isSuccess(auth)) {
      await scope.reloadScopes();
      const retry = await storage.getString(LANGUAGE_KEY);
      if (isSuccess(retry) && retry.result) {
        return retry.result;
      }
    }
  }

  // 2. No saved preference yet - fall back to the device's current locale.
  const deviceLocale = await locale.getLanguageLocaleIdentifier();
  if (isSuccess(deviceLocale) && deviceLocale.result) {
    return deviceLocale.result; // e.g. "en-US"
  }

  // 3. Final fallback if everything else fails.
  return 'en-US';
}

// Call this whenever the user picks a new language in your UI.
async function saveSelectedLanguage(languageCode: string): Promise<void> {
  const response = await storage.setString(LANGUAGE_KEY, languageCode);

  if (isError(response)) {
    console.error('Failed to persist language preference:', response.error);
  }
}
```

## Notes

- `StorageModule.setString` / `getString` operate on your MiniApp's own persisted storage — the value survives app restarts and is scoped to your MiniApp, not shared with other MiniApps.
- `LocaleModule.getLanguageLocaleIdentifier()` only reports the device/OS locale setting — it does not let you write a value back. Use it purely as a startup fallback or as the initial default before the user makes an explicit choice.
- All SDK calls return a response object with a `status_code` rather than throwing — always check with `isSuccess`/`isError` (or `hasResult`) instead of wrapping calls in try/catch.
- If `getString` (or any `StorageModule` method) returns `403`, it means the `mobile.storage` scope hasn't been granted yet — call `IdentityModule.authorize()` with that scope, then `ScopeModule.reloadScopes()`, and retry, as shown above.
