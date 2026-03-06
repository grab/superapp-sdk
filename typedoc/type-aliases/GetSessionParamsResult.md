[@grabjs/superapp-sdk](../README.md) / GetSessionParamsResult

# Type Alias: GetSessionParamsResult

> **GetSessionParamsResult** = \{ `result`: `string`; \}

Result object containing session parameters as a JSON string.

## Remarks

The `result` field contains a JSON string that must be parsed with `JSON.parse()` to use as an object.
Session parameters can contain primitives, base64 encoded strings, or nested objects depending on the
SuperApp's configuration.

## Properties

### result

> **result**: `string`

JSON string containing session parameters.
