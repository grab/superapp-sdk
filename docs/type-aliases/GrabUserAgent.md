[@grabjs/superapp-sdk](../globals.md) / GrabUserAgent

# Type Alias: GrabUserAgent

> **GrabUserAgent** = \{ `appName`: `string` \| `undefined`; `major`: `number`; `minor`: `number`; `patch`: `number`; `platform`: `string` \| `undefined`; \} \| `null`

Grab user agent information parsed from the `navigator.userAgent` string.

## Type Declaration

\{ `appName`: `string` \| `undefined`; `major`: `number`; `minor`: `number`; `patch`: `number`; `platform`: `string` \| `undefined`; \}

### appName

> **appName**: `string` \| `undefined`

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

> **platform**: `string` \| `undefined`

Platform (Android or iOS)

`null`

## Remarks

Returned by parseGrabUserAgent. Use for app/version checks before calling version-dependent APIs.
