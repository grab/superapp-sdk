[@grabjs/superapp-sdk](../README.md) / LoggerConfig

# Interface: LoggerConfig

Logger configuration options.

## Remarks

All settings can be overridden via Logger.configure.

## Properties

### enabled

> **enabled**: `boolean`

Enable or disable logging output.

***

### level

> **level**: [`LogLevel`](../enumerations/LogLevel.md)

Minimum log level to output. Messages at or above this level are logged.

***

### prefix

> **prefix**: `string`

Prefix prepended to all log messages.
