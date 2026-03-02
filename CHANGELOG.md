# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
