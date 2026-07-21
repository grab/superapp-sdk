# Platform Utilities

API reference for simple getter/setter-style native APIs with no dedicated Integration Guide walkthrough: file downloads, locale, logging, network, profile, storage, and user attributes.

## API Reference

#### `FileModule`
SDK module for downloading files to the user's device via `JSBridge`.
- `downloadFile(request: DownloadFileRequest): Promise<DownloadFileResponse>` — Downloads a file through `JSBridge`.

#### `LocaleModule`
SDK module for accessing device locale settings via `JSBridge`.
- `getLanguageLocaleIdentifier(): Promise<GetLanguageLocaleIdentifierResponse>` — Retrieves the current language locale identifier from the device.

#### `Logger`
Provides scoped logging for SDK modules.

#### `NetworkModule`
SDK module for making network requests through the native layer via `JSBridge`.
- `send(request: SendRequest): Promise<SendResponse>` — Sends a network request through `JSBridge`.

#### `ProfileModule`
SDK module for accessing user profile information via `JSBridge`.
- `fetchEmail(): Promise<FetchEmailResponse>` — Fetches the user's email address from their Grab profile. (**OAuth Scope:** mobile.profile | **Minimum Grab App Version:** Android: 5.399.0, iOS: 5.399.0)
- `verifyEmail(request?: VerifyEmailRequest): Promise<VerifyEmailResponse>` — Verifies the user's email address by triggering email capture bottom sheet and OTP verification. (**OAuth Scope:** mobile.profile | **Minimum Grab App Version:** Android: 5.399.0, iOS: 5.399.0)

#### `StorageModule`
SDK module for persisting key-value data to native storage via `JSBridge`.
- `getBoolean(key: string): Promise<GetBooleanResponse>` — Retrieves a boolean value from the native storage. (**OAuth Scope:** mobile.storage)
- `getDouble(key: string): Promise<GetDoubleResponse>` — Retrieves a double (floating point) value from the native storage. (**OAuth Scope:** mobile.storage)
- `getInt(key: string): Promise<GetIntResponse>` — Retrieves an integer value from the native storage. (**OAuth Scope:** mobile.storage)
- `getString(key: string): Promise<GetStringResponse>` — Retrieves a string value from the native storage. (**OAuth Scope:** mobile.storage)
- `remove(key: string): Promise<RemoveResponse>` — Removes a single value from the native storage by key. (**OAuth Scope:** mobile.storage)
- `removeAll(): Promise<RemoveAllResponse>` — Removes all values from the native storage. (**OAuth Scope:** mobile.storage)
- `setBoolean(key: string, value: boolean): Promise<SetBooleanResponse>` — Stores a boolean value in the native storage. (**OAuth Scope:** mobile.storage)
- `setDouble(key: string, value: number): Promise<SetDoubleResponse>` — Stores a double (floating point) value in the native storage. (**OAuth Scope:** mobile.storage)
- `setInt(key: string, value: number): Promise<SetIntResponse>` — Stores an integer value in the native storage. (**OAuth Scope:** mobile.storage)
- `setString(key: string, value: string): Promise<SetStringResponse>` — Stores a string value in the native storage. (**OAuth Scope:** mobile.storage)

#### `UserAttributesModule`
SDK module for reading user-related attributes from native code via `JSBridge`.
- `getSelectedTravelDestination(): Promise<GetSelectedTravelDestinationResponse>` — Returns the currently selected travel destination as a lowercase ISO 3166-1 alpha-2 country code.
