[@grabjs/superapp-sdk](../README.md) / GrabUserAgent

# Type Alias: GrabUserAgent

> **GrabUserAgent** = \{ `appName`: `string`; `major`: `number`; `minor`: `number`; `patch`: `number`; `platform`: `string`; \} \| `null`

Grab user agent information parsed from the `navigator.userAgent` string.

## Type Declaration

\{ `appName`: `string`; `major`: `number`; `minor`: `number`; `patch`: `number`; `platform`: `string`; \}

### appName

> **appName**: `string`

App name (e.g., "Grab", "GrabBeta")

### major

> **major**: `number`

Major version number

### minor

> **minor**: `number`

Minor version number

### patch

> **patch**: `number`

Patch version number

### platform

> **platform**: `string`

Platform (Android or iOS)

`null`

## Remarks

Returned by parseGrabUserAgent. Use for app/version checks before calling version-dependent APIs.
