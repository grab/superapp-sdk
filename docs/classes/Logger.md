[@grabjs/superapp-sdk](../README.md) / Logger

# Class: Logger

Core logger for SDK operations

## Constructors

### Constructor

> **new Logger**(`config?`: `Partial`\<[`LoggerConfig`](../interfaces/LoggerConfig.md)\>): `Logger`

#### Parameters

##### config?

`Partial`\<[`LoggerConfig`](../interfaces/LoggerConfig.md)\> = `{}`

#### Returns

`Logger`

## Methods

### configure()

> **configure**(`config`: `Partial`\<[`LoggerConfig`](../interfaces/LoggerConfig.md)\>): `void`

Update logger configuration

#### Parameters

##### config

`Partial`\<[`LoggerConfig`](../interfaces/LoggerConfig.md)\>

#### Returns

`void`

***

### getConfig()

> **getConfig**(): `Readonly`\<[`LoggerConfig`](../interfaces/LoggerConfig.md)\>

Get current configuration

#### Returns

`Readonly`\<[`LoggerConfig`](../interfaces/LoggerConfig.md)\>

***

### error()

> **error**(`message`: `string`, `context?`: `string`, `error?`: `Error`): `void`

Log error message

#### Parameters

##### message

`string`

##### context?

`string`

##### error?

`Error`

#### Returns

`void`

***

### warn()

> **warn**(`message`: `string`, `context?`: `string`): `void`

Log warning message

#### Parameters

##### message

`string`

##### context?

`string`

#### Returns

`void`

***

### info()

> **info**(`message`: `string`, `context?`: `string`): `void`

Log info message

#### Parameters

##### message

`string`

##### context?

`string`

#### Returns

`void`

***

### debug()

> **debug**(`message`: `string`, `context?`: `string`, `data?`: `unknown`): `void`

Log debug message

#### Parameters

##### message

`string`

##### context?

`string`

##### data?

`unknown`

#### Returns

`void`
