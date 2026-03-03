# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
