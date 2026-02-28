# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `meetsMinimumVersion` utility for version checks

### Changed

- ContainerModule: use specific response types for better error-code narrowing
- `getSessionParams`: result type corrected to `string` (JSON); parse with `JSON.parse(result)`
- ProfileModule and IdentityModule now use `meetsMinimumVersion` for version checks

## [2.0.0-beta.1] - (release date TBD)

### Added

- Initial beta release of @grabjs/superapp-sdk
- Core modules: Camera, Checkout, Container, Identity, Locale, Location, Media, Platform, Profile, Scope, Storage, SystemWebViewKit
- Logger with configurable levels
- Utilities: parseGrabUserAgent, isVersionBelow
- Response type system for native bridge operations

---

## Changelog entry format (for AI)

Use this structure when generating changelog entries:

```
### [Version] - YYYY-MM-DD

#### Added
- New feature or module

#### Changed
- Behavior change or improvement

#### Fixed
- Bug fix

#### Removed
- Deprecation or removal

#### Security
- Security-related change
```
