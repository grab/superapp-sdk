[@grabjs/superapp-sdk](../globals.md) / Logger

# Class: Logger

Core logger for SDK operations.

## Remarks

Supports configurable log levels, prefix, and enable/disable. Messages are output to
the browser console (`console.error`, `console.warn`, etc.) based on the configured level.

## Constructors

### Constructor

> **new Logger**(`config?`: `Partial`\<[`LoggerConfig`](../interfaces/LoggerConfig.md)\>): `Logger`

Creates a new Logger instance.

#### Parameters

##### config?

`Partial`\<[`LoggerConfig`](../interfaces/LoggerConfig.md)\> = `{}`

Optional partial configuration. Merged with defaults.

#### Returns

`Logger`

## Methods

### configure()

> **configure**(`config`: `Partial`\<[`LoggerConfig`](../interfaces/LoggerConfig.md)\>): `void`

Update logger configuration.

#### Parameters

##### config

`Partial`\<[`LoggerConfig`](../interfaces/LoggerConfig.md)\>

Partial configuration to merge with current settings.

#### Returns

`void`

***

### getConfig()

> **getConfig**(): `Readonly`\<[`LoggerConfig`](../interfaces/LoggerConfig.md)\>

Get current configuration.

#### Returns

`Readonly`\<[`LoggerConfig`](../interfaces/LoggerConfig.md)\>

A readonly copy of the current configuration.

***

### error()

> **error**(`message`: `string`, `context?`: `string`, `error?`: `Error`): `void`

Log error message.

#### Parameters

##### message

`string`

The error message.

##### context?

`string`

Optional context (e.g., module name).

##### error?

`Error`

Optional Error instance to log as additional output.

#### Returns

`void`

***

### warn()

> **warn**(`message`: `string`, `context?`: `string`): `void`

Log warning message.

#### Parameters

##### message

`string`

The warning message.

##### context?

`string`

Optional context (e.g., module name).

#### Returns

`void`

***

### info()

> **info**(`message`: `string`, `context?`: `string`): `void`

Log info message.

#### Parameters

##### message

`string`

The info message.

##### context?

`string`

Optional context (e.g., module name).

#### Returns

`void`

***

### debug()

> **debug**(`message`: `string`, `context?`: `string`, `data?`: `unknown`): `void`

Log debug message.

#### Parameters

##### message

`string`

The debug message.

##### context?

`string`

Optional context (e.g., module name).

##### data?

`unknown`

Optional additional data to log (e.g., object for inspection).

#### Returns

`void`
