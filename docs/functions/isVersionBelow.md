[@grabjs/superapp-sdk](../README.md) / isVersionBelow

# Function: isVersionBelow()

> **isVersionBelow**(`v1`: [`Version`](../type-aliases/Version.md), `v2`: [`Version`](../type-aliases/Version.md)): `boolean`

Compares two versions to determine if v1 is below v2.

## Parameters

### v1

[`Version`](../type-aliases/Version.md)

The version to check.

### v2

[`Version`](../type-aliases/Version.md)

The version to compare against.

## Returns

`boolean`

`true` if v1 is strictly below v2 (major.minor.patch comparison); `false` otherwise.

## Remarks

Comparison is semantic: major first, then minor, then patch. Equal versions return `false`.
