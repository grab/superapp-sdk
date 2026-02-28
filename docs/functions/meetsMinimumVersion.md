[@grabjs/superapp-sdk](../README.md) / meetsMinimumVersion

# Function: meetsMinimumVersion()

> **meetsMinimumVersion**(`userAgent`: `string`, `minimum`: [`Version`](../type-aliases/Version.md)): `boolean`

Checks if the user agent meets or exceeds the minimum required version.

## Parameters

### userAgent

`string`

The user agent string (e.g., from `navigator.userAgent`).

### minimum

[`Version`](../type-aliases/Version.md)

The minimum version required.

## Returns

`boolean`

`true` if the parsed app version meets or exceeds the minimum; `false` otherwise.

## Remarks

Returns `false` if the user agent does not match the Grab app pattern.
