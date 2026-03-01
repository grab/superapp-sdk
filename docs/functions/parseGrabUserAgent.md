[@grabjs/superapp-sdk](../globals.md) / parseGrabUserAgent

# Function: parseGrabUserAgent()

> **parseGrabUserAgent**(`userAgent`: `string`): [`GrabUserAgent`](../type-aliases/GrabUserAgent.md)

Parses Grab user agent string to extract app information.

## Parameters

### userAgent

`string`

The user agent string to parse (e.g., from `navigator.userAgent`).

## Returns

[`GrabUserAgent`](../type-aliases/GrabUserAgent.md)

Parsed user agent information, or `null` if the string does not match the expected format.

## Remarks

Expects format: `{AppName}/v?{major}.{minor}.{patch} ({platform})` where AppName is Grab, GrabBeta,
GrabBetaDebug, GrabTaxi, or GrabEarlyAccess, and platform is Android or iOS.
