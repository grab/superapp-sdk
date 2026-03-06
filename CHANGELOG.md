# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
