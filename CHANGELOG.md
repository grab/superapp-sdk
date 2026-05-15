# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Each release entry may include a short summary (Markdown, for example `_italic_`) between the version heading and the first `###` section;

## [2.0.0-beta.53] - 2026-05-15

_Improves API docs organization with explicit groups/categories and simplified TypeDoc plugins._

### Added

- Added `@category` support in TSDoc config and applied category/group annotations across exported modules, types, and schemas.

### Changed

- Reorganized TypeDoc output ordering (groups/categories) for HTML, API JSON, and Markdown builds.

### Removed

- Removed `typedoc-plugin-valibot` from documentation build plugins and dev dependencies.

## [2.0.0-beta.52] - 2026-05-14

_Metadata-only release to improve handling of generated assets._

### Added

- Added `.gitattributes` rules to mark `docs/**` and `skills/**` as `gitlab-generated`.

## [2.0.0-beta.51] - 2026-05-12

_Bump eSIM minimum Grab app to 5.409.0; Slack release posts use an in-channel header with changelog in a thread._

### Changed

- `DeviceModule.isEsimSupported`: `MINIMUM_VERSION` set to Grab app **5.409.0** (was 5.402.0).
- `scripts/notify-slack.mjs`: release posts a short header in-channel; formatted changelog and doc links go in a thread reply (context line points readers to the thread).

## [2.0.0-beta.50] - 2026-05-12

### Changed

- `IdentityModule.authorize`: `200` responses now include the PKCE artifacts (`codeVerifier`, `nonce`, `redirectUri`) in `result` alongside `code` and `state`, so callers no longer need to call `getAuthorizationArtifacts()` after a successful in_place flow. Storage writes are unchanged, so `getAuthorizationArtifacts()` remains available as a fallback.

## [2.0.0-beta.49] - 2026-05-12

### Changed

- `DeviceModule.isEsimSupported`: client-side minimum Grab app **5.402.0** (`DeviceModule.MINIMUM_VERSION`); below that returns `426` without invoking the bridge; types and Valibot schema accept `403`, `424`, and `426`; JSDoc notes `mobile.device` scope and error-handling example

## [2.0.0-beta.48] - 2026-05-12

### Added

- `204` responses for storage `get*` methods when the key has no value (after normalizing raw bridge payloads)
- Validation and warnings for unexpected raw bridge shapes on storage reads

### Changed

- Storage `getBoolean`, `getInt`, `getString`, and `getDouble` expose `result` as the scalar value (not `{ value: … }`); empty keys for `get*` and `remove` return `400` without calling the bridge
- Empty keys for `setBoolean`, `setInt`, `setString`, and `setDouble` return `400` without calling the bridge (same client-side validation pattern as `get*` and `remove`)

### Removed

- `{ value }` wrapper on successful storage read results

## [2.0.0-beta.47] - 2026-05-08

### Added

- New "Scopes and Permissions" section in Core Concepts guide explaining Backend vs. Mobile scopes
- Authentication and initialization flow examples in Integration Guide

### Changed

- Refined Core Concepts guide with improved type guard and stream documentation
- Simplified Integration Guide with consolidated analytics and checkout examples
- Demo applications (CDN and React) updated with improved error handling and direct status code checks
- Security documentation in demo apps updated to emphasize backend token exchange requirements
- Analytics documentation updated to use `ContainerAnalyticsEventState` constants

### Fixed

- Coordinate property access in demo applications

## [2.0.0-beta.46] - 2026-05-08

### Added

- Slack notification script (`scripts/notify-slack.mjs`) to post release announcements to configured channels
- `notify` npm script for triggering Slack notifications

### Changed

- CI/CD pipeline updated with `notify` stage to send Slack notifications on new releases

## [2.0.0-beta.45] - 2026-05-08

### Changed

- CDN documentation updated across all modules to recommend version pinning (`@x.y.z`) instead of using latest to prevent breaking changes
- Setup guide updated with version pinning recommendation for CDN usage

## [2.0.0-beta.44] - 2026-05-07

### Added

- React demo app (`demo/react/`) with Vite build setup, featuring entry, index, and checkout pages
- React demo documentation (`demo/react/README.md`)

### Changed

- Updated integration guide to reference the new React demo

## [2.0.0-beta.43] - 2026-05-07

### Added

- Environment check in CDN demo pages (`demo/cdn/`) to ensure they are opened within the Grab SuperApp

### Changed

- Improved demo pages resilience by re-verifying connection on page restore (`pageshow` event)

## [2.0.0-beta.42] - 2026-05-07

### Added

- Complete CDN demo MiniApp (`demo/cdn/`) showcasing SDK integration patterns
- `demo/cdn/entry.html` — OAuth authorization and OIDC token exchange flow
- `demo/cdn/index.html` — user profile display with deferred location permission handling
- `demo/cdn/checkout.html` — payment flow with `CheckoutModule.triggerCheckout()` demonstration
- `demo/cdn/config.js` — centralized environment and OAuth client configuration
- `demo/cdn/ui-helpers.js` — shared UI utilities for error handling and HTML escaping
- `demo/cdn/grabid-service.js` — demo OIDC helpers (Discovery, Token Exchange, UserInfo)
- `demo/cdn/README.md` — integration flow documentation with Mermaid sequence diagrams
- Proactive permission checking section in Core Concepts guide documenting `ScopeModule.hasAccessTo()` usage

### Changed

- Integration Guide updated with Demo App reference linking to `demo/cdn` sample

### Removed

- Legacy `demo/index.html` (replaced by comprehensive CDN demo)

## [2.0.0-beta.41] - 2026-04-30

### Added

- Analytics event tracking section in Integration Guide with code examples for entry point, conversion, and completion events
- Best practices for analytics event implementation

## [2.0.0-beta.40] - 2026-04-22

### Added

- `@requiredOAuthScope` TSDoc tag to document required OAuth scopes for module methods (`CheckoutModule`, `LocationModule`, `MediaModule`, `ProfileModule`, `StorageModule`)
- `@minimumGrabAppVersion` TSDoc tag to document minimum Grab app version requirements (`ProfileModule`)
- TSDoc configuration updated to support `@requiredOAuthScope` and `@minimumGrabAppVersion` custom tags
- Core Concepts guide expanded with 403 Forbidden handling section and OAuth scope retry flow

### Changed

- Method documentation restructured: replaced version requirements in `@remarks` with dedicated `@minimumGrabAppVersion` tag
- Status code reference table updated with links to `@requiredOAuthScope` and `@minimumGrabAppVersion` tags
- JSDoc examples in Core Concepts guide simplified for clarity

## [2.0.0-beta.39] - 2026-04-22

### Changed

- `ContainerModule` methods now normalize 200 OK responses to 204 No Content for consistency (`setBackgroundColor`, `setTitle`, `hideBackButton`, `showBackButton`, `hideRefreshButton`, `showRefreshButton`, `close`, `showLoader`, `hideLoader`)
- Response schemas updated: success cases now use `bridgeNoContentSchema` instead of `bridgeOkSchema`

### Added

- Raw response schemas and types for internal bridge response validation (e.g., `RawSetTitleResponse`, `RawCloseResponse`, `RawHideBackButtonResponse`)
- Response shape validation with warnings for unexpected native bridge responses in `ContainerModule`

## [2.0.0-beta.38] - 2026-04-20

### Changed

- Node.js engine requirement relaxed from `24` to `>=18`
- Dev dependencies updated: `@microsoft/api-extractor` to 7.58.5, `vite` to 7.3.2, `fs-extra` to 11.3.4, `semver` to 7.7.4

## [2.0.0-beta.37] - 2026-04-17

### Added

- `hasResult()` type guard now exported from package index
- `NetworkModule.send()` now handles JSON string responses from native bridge (auto-parses to objects)
- `RawSendResponse` and `RawSendResult` internal types/schemas for raw bridge response validation
- Response shape validation with warnings for unexpected native bridge responses

### Changed

- `NetworkModule` schemas now use shared `bridgeOkSchema`, `bridgeNoContentSchema`, and `bridgeErrorSchema` from core
- Simplified JSDoc examples in `NetworkModule`
- Clarified documentation: `NetworkModule` is only for Grab-hosted MiniApps calling authenticated Grab APIs

## [2.0.0-beta.36] - 2026-04-15

### Added

- `NetworkModule` with `send()` method for making HTTP requests through the native bridge
- `hasResult()` type guard to check if a response has a defined result (non-null/undefined)

### Changed

- Type guards now check status code ranges instead of specific codes:
  - `isSuccess()` — now matches all 2xx codes (200-299) instead of just 200/204
  - `isClientError()` — now matches all 4xx codes (400-499) instead of specific codes
  - `isServerError()` — now matches all 5xx codes (500-599) instead of specific codes
  - `isError()` — now checks status code ranges in addition to error field presence

## [2.0.0-beta.35] - 2026-04-15

### Changed

- **BREAKING**: Renamed `DeviceCapabilityModule` to `DeviceModule` for brevity
  - Import path changed from `modules/device-capability` to `modules/device`
  - Class name changed from `DeviceCapabilityModule` to `DeviceModule`
  - Update your imports: `import { DeviceModule } from '@grabjs/superapp-sdk'`
- README updated to reflect the module rename

## [2.0.0-beta.34] - 2026-04-13

### Changed

- `ScopeModule.hasAccessTo()` now returns `result` as a plain `boolean` instead of an object `{ hasAccess: boolean }`
- `HasAccessToResult` type and schema updated to `v.boolean()` (simplified API)

## [2.0.0-beta.33] - 2026-04-13

### Fixed

- `isError()` guard now validates `error` is a non-empty string instead of just checking property existence

## [2.0.0-beta.32] - 2026-04-13

### Added

- `guides/ai-assistance.md` — setup guide for AI-assisted development with Cursor and Claude

### Changed

- `valibot` moved from `devDependencies` to `dependencies` (runtime requirement for schema validation)
- `GetCoordinateResult` properties renamed from `lat`/`lng` to `latitude`/`longitude` for consistency
- Consolidated all module exports in `src/index.ts` to use barrel exports (cleaner imports from module index files)
- Updated JSDoc examples and SKILL.md to reflect coordinate property rename
- `build-skills.mjs` excludes `ai-assistance.md` from skill generation (setup guide, not conceptual)

### Changed

- README.md — added link to AI-Assisted Development documentation

## [2.0.0-beta.31] - 2026-04-10

### Added

- `Logger` utility class for scoped logging (`[SuperAppSDK][ModuleName.method]`) across all SDK modules
- `VerifyEmailResult` schema and type export for email verification responses

### Changed

- `ProfileModule.verifyEmail()` now accepts optional request parameters and returns the verified email in `result`
- `VerifyEmailRequest` type updated to use `skipUserInput` instead of `otp` for native bottom sheet flow
- `TriggerCheckoutResult` documentation improved with clearer status-to-field mapping
- All modules migrated from direct `console.warn` to the new `Logger` utility for validation warnings
- Core schemas refactored: consolidated error status code types under `BridgeErrorStatusCode`

### Removed

- `bridgeSuccessSchema` function (superseded by `bridgeOkSchema`)

## [2.0.0-beta.30] - 2026-04-07

### Changed

- `CheckoutModule` — added important disclaimers to method and type documentation; added note that `mobile` scope is required
- `LocaleModule` — added list of supported locales to `SupportedLocale` type documentation
- `LocationModule` — `getCountryCode` now correctly returns `result` as a plain `string` (e.g. `'SG'`) instead of an object `{ countryCode: string }`; updated `GetCountryCodeResult` type, schema, and documentation accordingly
- `StorageModule` — added note that stored data is cleared when the user logs out

## [2.0.0-beta.29] - 2026-04-02

### Added

- `guides/concepts.md` — new Core Concepts guide covering the response pattern, status codes, type guards, and streams

### Changed

- README slimmed to overview, module index, and documentation links — detailed content moved to guides
- `guides/setup.md` — moved environment requirements to Core Concepts guide
- `skills/SKILL.md` — guides now ordered explicitly (Setup → Core Concepts → Integration Guide); Classes and Functions wrapped under `## API Reference`
- `scripts/skills-template.md` — reduced to frontmatter and intro; all content lives in guides

## [2.0.0-beta.28] - 2026-04-02

### Changed

- Consolidated AI skills into single `skills/SKILL.md` file with inlined guides and API references
- `build-skills.mjs` now generates unified skill file instead of separate directories

### Removed

- `skills/guides/` directory (guides now inlined into SKILL.md)
- `skills/references/` directory (classes and functions now inlined into SKILL.md)

## [2.0.0-beta.27] - 2026-04-01

### Added

- AI IDE integration (Skills) for Claude with `skills/SKILL.md` metadata and documentation
- `build-skills.mjs` script to generate skill references from TypeDoc API
- `skills/references/` with generated class and function documentation for AI context
- `skills/guides/` with setup and integration guides for AI-assisted development
- `skills` directory included in npm package files

### Changed

- Build script now generates skill documentation after docs build
- ESLint configuration updated to handle skills directory

## [2.0.0-beta.26] - 2026-03-31

### Added

- Runtime schema validation using `valibot` for all module requests and responses
- Schema files (`schemas.ts`) for all modules with valibot validation schemas
- `validate()` protected method to `BaseModule` for pre-invocation validation
- `requestSchema` and `responseSchema` options to `InvokeOptions` interface
- `formatIssues()` utility for human-readable validation error formatting
- `typedoc-plugin-valibot` dev dependency for schema documentation
- `isOk()`, `isNoContent()`, `isFound()` type guards for granular status code narrowing

### Changed

- `valibot` added as peer dependency (replaces `@grabjs/mobile-kit-bridge-sdk` peer dependency)
- `@grabjs/mobile-kit-bridge-sdk` moved from peerDependencies to devDependencies
- `invoke()` and `invokeStream()` methods now perform automatic request/response validation when schemas are provided
- `isErrorResponse()` type guard renamed to `isError()` for consistency
- Simplified core types by removing redundant status code type hierarchies
- All modules updated to use schema-based validation with proper error responses on validation failures

### Removed

- Legacy status code type definitions (`BridgeStatusCode`, `BridgeError`, `BridgeSuccessResponse`, etc.)
- Redundant response type aliases (`ResponseStatusCode200`, `ResponseStatusCode204`, etc.)
- Complex generic type hierarchies in favor of schema-driven validation

## [2.0.0-beta.25] - 2026-03-31

### Added

- `SplashScreenModule`, the native splash / Lottie loading screen

## [2.0.0-beta.24] - 2026-03-18

### Changed

- Updated all JSDoc examples across modules to use `isSuccess()` and `isErrorResponse()` type guards instead of switch-case patterns
- `BaseModule.invoke()` changed from public to protected visibility
- Enhanced error messages in `BaseModule.invoke()` and `BaseModule.invokeStream()` to include actual error details

### Fixed

- Fixed template literal syntax in `BaseModule` constructor error message

### Removed

- Legacy TypeDoc markdown documentation files from `typedoc/` directory

### Added

- Exported `isErrorWithMessage()` utility from main entry point
- Exported `InvokeOptions` type from main entry point

## [2.0.0-beta.23] - 2026-03-18

### Added

- Markdown API reference generation to `api-reference/markdown/` directory
- `typedoc-plugin-markdown` dev dependency for Markdown documentation output
- `typedoc.md.json` configuration for Markdown doc generation
- `api-reference` directory included in npm package files

### Changed

- Complete README.md rewrite with modern structure, installation guides, and usage examples
- Updated maintainers list in package.json
- TypeDoc JSON output moved to `api-reference/json/api.json`
- Build process now generates both JSON and Markdown API documentation
- Regenerated HTML documentation in `/docs`

## [2.0.0-beta.22] - 2026-03-17

### Added

- `typedoc-plugin-no-inherit` dev dependency for cleaner API documentation
- `@noInheritDoc` and `@hidden` TSDoc tags support in `tsdoc.json`

### Changed

- Generate documentation HTML static website in `/docs`
- All module classes now use `@noInheritDoc` to exclude inherited `BaseModule` documentation
- `BaseModule` class marked with `@hidden` to exclude from public API docs

## [2.0.0-beta.21] - 2026-03-16

### Added

- `DeviceCapabilityModule` with `isEsimSupported()` support, exported response/result types, unit tests, and manual documentation
- `UserAttributesModule` with `getSelectedTravelDestination()` support, exported response/result types, unit tests, and manual documentation

## [2.0.0-beta.20] - 2026-03-16

### Added

- New `InvokeOptions` interface for flexible method invocation configuration
- Type guard functions in `guards.ts` for runtime `BridgeResponse` type narrowing
- HTTP 426 status code support for upgrade required responses

### Changed

- Consolidated core types into single `src/core/types.ts` file
- Renamed response types for consistency
- Renamed stream types for consistency
- Simplified status code type names

## [2.0.0-beta.19] - 2026-03-13

### Added

- `FileModule` for downloading files via the native bridge (`downloadFile` method)
- `DownloadFileRequest` and `DownloadFileResponse` types for file operations
- Unit tests for `FileModule`

### Changed

- `BaseModule.invoke()` now returns errors via `status_code` instead of throwing
- Updated all module JSDoc examples to remove try-catch patterns
- Removed `@throws` annotations from all module methods

## [2.0.0-beta.18] - 2026-03-13

### Added

- `AuthorizationConfigurationError` class for identity authorization failures
- `detectGrabApp()` utility for automatic Grab app detection from user agent
- `isRunningInGrabApp()` utility to check if code runs inside Grab app webview
- Unit test suites for `platform`, `error`, and `version` utilities

### Changed

- Refactored error utilities: replaced `getErrorMessage()` and `errorHasMessage()` with `isErrorWithMessage()` type guard
- Platform utilities now auto-detect user agent from `window.navigator`
- `IdentityModule` uses `AuthorizationConfigurationError` for configuration failures

### Removed

- `user-agent` utility directory (replaced by platform utilities)
- `getErrorMessage()` and `errorHasMessage()` functions (use `isErrorWithMessage()` instead)

## [2.0.0-beta.17] - 2026-03-12

### Added

- Comprehensive unit test suites for all SDK modules with 100% coverage
- Test configuration for streaming methods with DataStream assertions

### Changed

- All module response types now include HTTP 500 status code for internal server errors
- `GetAuthorizationArtifactsResult` type no longer nullable, always returns object structure

### Fixed

- ESLint configuration to properly handle test file patterns

## [2.0.0-beta.16] - 2026-03-12

### Added

- Vitest testing framework with jsdom environment for unit testing
- Test coverage configuration (v8 provider with text and html reporters)
- First unit test suite for `CameraModule.scanQRCode()` method
- npm scripts: `test`, `test:check`, and `test:watch` for running tests
- `build:watch` npm script for development workflow

### Changed

- ESLint config now includes rules for test files (`**/*.test.ts`) with relaxed type safety for mocks
- ESLint config now applies copyright header checks to config files
- Updated `.prettierignore` and ESLint ignore patterns to exclude `coverage/` directory
- Updated `check` npm script to include `test:check`

## [2.0.0-beta.15] - 2026-03-12

### Added

- Type guard functions (`isSuccess`, `isRedirection`, `isClientError`, `isServerError`, `isErrorResponse`) for runtime `BridgeResponse` type checking

### Changed

- `BaseModule.invoke()` now returns `Promise<BridgeResponse<T>> | DataStream<T>` with proper error handling
- All module methods refactored to be async with typed Promise return values
- Renamed `BridgeRedirectResponse` to `BridgeRedirectionResponse` for naming consistency
- Simplified success response structure by omitting `error: null` fields
- Cleaned up redundant import examples from JSDoc comments across all modules
- `WrappedModule.invoke()` signature simplified for better type inference

## [2.0.0-beta.14] - 2026-03-09

### Added

- New HTTP status code response types: `BridgeStatusCode401Response` and `BridgeStatusCode501Response`
- Error utility functions (`getErrorMessage`, `errorHasMessage`) in `src/utils/error/`
- `BaseModule.invoke()` method with automatic Grab app environment checking

### Changed

- All modules now use `this.invoke()` instead of `this.wrappedModule.invoke()` for automatic environment detection
- JSDoc examples updated to use `switch (response.status_code)` pattern instead of type guards
- Response type exports reorganized alphabetically in `src/index.ts`

### Removed

- Type guard functions (`isResponseOk`, `isResponseError`, `isResponseSuccess`, etc.) - use `response.status_code` checks instead
- TypeDoc documentation for removed type guard functions

## [2.0.0-beta.13] - 2026-03-06

### Added

- New crypto utilities (`src/utils/crypto/`) using native Web Crypto API for PKCE operations
- Centralized Identity constants in `src/modules/identity/constants.ts`
- `resources/copyright.txt` for shared license header content

### Changed

- `IdentityModule` refactored to use new crypto utilities and centralized constants
- `generatePKCEArtifacts()` is now async to support native crypto.subtle digest
- ESLint config references `resources/copyright.txt` directly instead of JS import
- Rollup config reads copyright banner from file directly
- Moved `@grabjs/mobile-kit-bridge-sdk` from dependencies to devDependencies

### Removed

- `crypto-js` dependency (replaced by native Web Crypto API)
- `scripts/constants.mjs` (superseded by `resources/copyright.txt`)
- Auto-generated TypeDoc documentation for `IdentityModule`

### Security

- Replaced `crypto-js` with native Web Crypto API for improved security and reduced bundle size

## [2.0.0-beta.12] - 2026-03-06

### Added

- TypeScript ESLint support with `typescript-eslint` for type-aware linting
- Add ESLint rule to check copyrights

### Changed

- `SendAnalyticsEventRequest.data` type changed from `Record<string, any>` to `Record<string, unknown>`
- `BaseModule` initialization errors now include the original error as `cause`

### Removed

- Unused `*Result` type imports from Camera, Checkout, Identity, Profile, Scope, Storage, and SystemWebViewKit modules
- Window interface extensions for Wrapped modules (moved to consumer side)

## [2.0.0-beta.11] - 2026-03-06

### Added

- Core response type guard functions (`isResponseOk`, `isResponseError`, `isResponseSuccess`, `isResponseClientError`, `isResponseServerError`, etc.) for runtime response type checking
- Response type definitions for all remaining modules: Camera, Checkout, Container, Locale, Location, Media, Platform, Scope, Storage, SystemWebViewKit

### Changed

- Exported all new response types and type guards from main entry point
- All module methods now return typed `Promise<Response>` instead of `Promise<any>`

## [2.0.0-beta.10] - 2026-03-05

### Added

- TypeScript type definitions and JSDoc documentation for `IdentityModule` (`authorize`, `getAuthorizationArtifacts`, `clearAuthorizationArtifacts` methods)
- TypeScript type definitions and JSDoc documentation for `ProfileModule` (`fetchEmail`, `verifyEmail` methods)
- TypeScript type definitions and JSDoc documentation for `SystemWebViewKitModule` (`redirectToSystemWebView` method)
- Exported all new types from main entry point (`src/index.ts`) and module barrel exports
- Generated updated TypeDoc documentation with new type aliases for Identity, Profile, and SystemWebViewKit modules

### Changed

- `ScopeModule.hasAccessTo()` now accepts separate `(module, method)` parameters instead of `HasAccessToRequest` object
- `ContainerModule.isConnected()` refactored to use `isRunningInGrabApp()` utility
- `IdentityModule.shouldUseWebConsent()` and `ProfileModule.isSupported()` refactored to use new platform utilities

### Fixed

- `StorageModule` methods now accept individual parameters `(key, value)` instead of object parameters `({key, value})` to match the existing public API

### Removed

- `HasAccessToRequest` type (replaced by direct parameters)
- `SetBooleanRequest`, `SetIntRequest`, `SetStringRequest`, `SetDoubleRequest` types (methods now use direct parameters)
- `IdentityModule.parseGrabUserAgent()` and `isVersionBelow()` static methods
- `ProfileModule.parseGrabUserAgent()` and `isVersionBelow()` static methods
- Related TypeDoc documentation for removed methods

## [2.0.0-beta.9] - 2026-03-04

### Added

- TypeScript type definitions and JSDoc documentation for `LocaleModule`
- TypeScript type definitions and JSDoc documentation for `ScopeModule` (`hasAccessTo`, `reloadScopes` methods)
- Comprehensive TypeScript type definitions and JSDoc documentation for `StorageModule` (all storage operations: boolean, int, string, double, remove, removeAll)
- Added `*Result` types for all `ContainerModule` response types for better type consistency
- Exported all new types from main entry point (`src/index.ts`)

### Changed

- `LocaleModule.getLanguageLocaleIdentifier()` now returns typed `Promise<GetLanguageLocaleIdentifierResponse>`
- `ScopeModule.hasAccessTo()` now accepts `HasAccessToRequest` parameter and returns `Promise<HasAccessToResponse>`
- `ScopeModule.reloadScopes()` now returns `Promise<ReloadScopesResponse>`
- `StorageModule` methods now use typed request/response parameters
- All `ContainerModule` response types now use dedicated `*Result` types instead of `null`

## [2.0.0-beta.8] - 2026-03-04

### Added

- CheckoutModule types and documentation for `triggerCheckout()` method
- Exported `TriggerCheckoutRequest`, `TriggerCheckoutResponse`, and `TriggerCheckoutResult` types

### Changed

- Improved type safety in `WrappedModule.invoke()` with conditional return types for streaming methods
- Removed redundant type assertions across CameraModule, ContainerModule, and LocationModule

### Fixed

- Standardized response structure in `ContainerModule.isJSBridgeConnected()` to include `result: null` in all branches

## [2.0.0-beta.7] - 2026-03-04

### Added

- LocationModule types and documentation
- DataStream support to WrappedModule.invoke()

### Fixed

- ContainerModule API methods now correctly accept primitive values

## [2.0.0-beta.6] - 2026-03-03

### Added

- Added TypeDoc JSON API documentation generation
- Added TSDoc configuration (`tsdoc.json`) to support custom `@group` tags
- Added `@group Modules` tags to all module classes for better TypeDoc organization
- Updated TypeDoc documentation structure to prioritize Modules section over Classes

## [2.0.0-beta.5] - 2026-03-03

### Added

- Added `wrappedModule` getter to `BaseModule` for consistent JSBridge module access
- Added `WrappedModule` interface and exported it from main entry point
- Added comprehensive TypeScript type definitions for ContainerModule
- Added extensive JSDoc documentation to ContainerModule with usage examples for all methods
- Added centralized global type definitions in `src/types/global.ts`:
- Exported all ContainerModule types from main `src/index.ts` entry point
- Exported CameraModule types from main `src/index.ts` entry point
- Generated updated TypeDoc documentation with new ContainerModule types and detailed method documentation

### Changed

- Refactored all modules to use `this.wrappedModule.invoke()` instead of direct `window.Wrapped*Module!.invoke` access
- Changed `IdentityModule.performNativeAuthorization()` from static to instance method
- Refactored `src/modules/container/types.ts` to replace inline WrappedContainerModule interface with granular type definitions
- Updated ContainerModule methods to use typed request/response parameters instead of generic `any` types
- Improved type safety across all ContainerModule methods with proper TypeScript typing
- Simplified individual module `index.ts` barrel exports by removing duplicate type re-exports (now centralized in main index.ts)

### Fixed

- Fixed TypeScript type definitions to use consistent `BridgeResponse<T>` patterns across all container methods
- Resolved type redundancy by consolidating global Window interface declarations in a single location

### Changed

- Refactored `src/modules/container/types.ts` to replace inline WrappedContainerModule interface with granular type definitions
- Updated ContainerModule methods to use typed request/response parameters instead of generic `any` types
- Improved type safety across all ContainerModule methods with proper TypeScript typing
- Simplified individual module `index.ts` barrel exports by removing duplicate type re-exports (now centralized in main index.ts)

### Fixed

- Fixed TypeScript type definitions to use consistent `BridgeResponse<T>` patterns across all container methods
- Resolved type redundancy by consolidating global Window interface declarations in a single location

## [2.0.0-beta.4] - 2026-03-03

### Added

- Added TypeDoc documentation generation with Markdown output
  - Added `typedoc` and `typedoc-plugin-markdown` dev dependencies
  - Added `typedoc.json` configuration for documentation generation
  - Added `build:docs` npm script to generate API documentation
  - Generated comprehensive API docs in `typedoc/` directory covering all modules and types
- Updated `build` script to include both JS build and documentation generation

### Changed

- Updated CI build step to use `build:js` instead of `build` to avoid generating docs in CI pipeline
- Enhanced lint-staged configuration to run ESLint on staged JavaScript and TypeScript files

### Fixed

- Fixed JSDoc type parameter tag from `@typeparam` to `@typeParam` in `src/core/stream/types.ts`

## [2.0.0-beta.3] - 2026-03-03

### Added

- Added TypeScript type definitions for Camera QR code scanning:
  - `ScanQRCodeRequest` - Configuration options for QR code scanning
  - `ScanQRCodeResponse` - Typed response from QR code scan operation
  - `ScanQRCodeResult` - Result object containing the scanned QR code data
- Added comprehensive JSDoc documentation with usage examples for `CameraModule.scanQRCode()`
- Exported camera types from main index and module barrel export

### Changed

- Renamed npm scripts for consistency:
  - `format:check` → `check:format`
  - `format:fix` → `fix:format`
  - `lint:check` → `check:lint`
  - `lint:fix` → `fix:lint`
- Updated `check` and `fix` scripts to use renamed sub-scripts

### Fixed

- Fixed JSDoc comment formatting in `checkout/types.ts`

### Removed

- Removed `@rollup/plugin-alias` dependency (no longer needed)

## [2.0.0-beta.2] - 2026-03-03

### Added

- Added `BaseModule` abstract class in `src/core/module/` for unified module initialization
- Added core type definitions for bridge responses (`src/core/response/types.ts`)
- Added core type definitions for data streams (`src/core/stream/types.ts`)
- Added organized module structure with each module in its own directory under `src/modules/`
- Added TypeScript type definition files for all modules:
  - `CameraModule`, `CheckoutModule`, `ContainerModule`, `IdentityModule`
  - `LocaleModule`, `LocationModule`, `MediaModule`, `PlatformModule`
  - `ProfileModule`, `ScopeModule`, `StorageModule`, `SystemWebViewKitModule`
- Added barrel exports (`index.ts`) for all module directories for cleaner imports
- Added `ContainerAnalyticsEventState`, `ContainerAnalyticsEventName`, `ContainerAnalyticsEventData` constants

### Changed

- Refactored all modules to extend `BaseModule` class for consistent initialization
- Migrated remaining JavaScript modules to TypeScript:
  - `ContainerModule.js` → `src/modules/container/ContainerModule.ts`
  - `IdentityModule.js` → `src/modules/identity/IdentityModule.ts`
  - `ProfileModule.js` → `src/modules/profile/ProfileModule.ts`
  - `StorageModule.js` → `src/modules/storage/StorageModule.ts`
- Reorganized source structure from flat `src/` to feature-based `src/modules/{name}/` layout
- Updated `src/index.ts` exports to reflect new module paths

### Removed

- Deleted legacy flat JavaScript module files from `src/` root:
  - `CameraModule.js`, `CheckoutModule.js`, `LocaleModule.js`, `LocationModule.js`
  - `MediaModule.js`, `PlatformModule.js`, `ScopeModule.js`, `SystemWebViewKitModule.js`

## [2.0.0-beta.1] - 2026-03-02

### Added

- Full TypeScript support with type definitions
- Added `tsconfig.json` for TypeScript compilation configuration
- Added `scripts/build.mjs` for orchestrated build process
- Added Microsoft API Extractor for bundling type definitions
- Added dual module format support (ESM and CommonJS) via `exports` field
- Added `module` field for ESM entry point
- Added `types` field pointing to bundled type definitions
- Added `.nvmrc` specifying Node.js version 24
- Added `clean` npm script for removing build artifacts
- Added TypeScript-related dependencies: `typescript`, `tslib`, `@rollup/plugin-typescript`, `@types/node`

### Changed

- Migrated source code from JavaScript to TypeScript (`src/index.js` → `src/index.ts`)
- Migrated build system from Babel to TypeScript with Rollup
- Upgraded Rollup from 1.7.0 to 4.59.0 with modern official plugins
- Updated `build` script to use new `scripts/build.mjs` orchestrator
- Updated package `files` field to only include `dist` directory
- Changed Rollup configuration from CommonJS to ES Module format (`rollup.config.mjs`)
- Updated ESLint configuration to support TypeScript file extensions

### Removed

- Removed Babel and related configuration (`.babelrc`)
- Removed legacy Rollup plugins: `rollup-plugin-babel`, `rollup-plugin-commonjs`, `rollup-plugin-node-resolve`, `rollup-plugin-uglify`
- Removed `docs` directory from published package files
- Deleted legacy `rollup.config.js`

## [1.8.11] - 2026-03-02

### Changed

- Upgraded `@grabjs/mobile-kit-bridge-sdk` from `^1.1.1` to `^2.2.2`

## [1.8.10] - 2026-03-02

### Added

- Added ESLint 10.0.2 with flat config (eslint.config.mjs)
- Added support for linting JavaScript, JSON, and Markdown files
- Added npm scripts: `lint:check` and `lint:fix`

### Changed

- Updated `check` and `fix` npm scripts to include linting alongside formatting
- Added error cause when throwing authorization configuration errors
- Added error logging for redirectUri validation failures

### Fixed

- Fixed incorrect heading level in SystemWebViewKitModule.md documentation (#### → ###)

## [1.8.9] - 2026-03-02

### Changed

- Restructured CI pipeline into 4 stages: install, check, build, publish
- Updated package version from 1.8.8 to 1.8.9

## [1.8.8] - 2026-03-02

### Added

- Added Husky 9.1.7 for Git hooks management
- Added lint-staged 16.3.1 for running linters on staged files
- Added `.husky/pre-commit` hook to run lint-staged automatically on commit
- Added `prepare` npm script for Husky initialization
- Added `lint-staged` configuration to run Prettier on all staged files

### Changed

- Updated package version from 1.8.7 to 1.8.8

## [1.8.7] - 2026-03-02

### Added

- Added Prettier 3.8.1 for code formatting
- Added `.prettierrc` configuration with project code style rules
- Added `.prettierignore` to exclude build artifacts and dependencies
- Added `.editorconfig` for consistent editor settings across IDEs
- Added npm scripts: `format:check`, `format:fix`, `check`, and `fix`

### Changed

- Reformatted all source files with Prettier for consistent code style
- Updated package version from 1.8.6-beta.1 to 1.8.7
