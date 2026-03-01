[@grabjs/superapp-sdk](../globals.md) / TriggerCheckoutResult

# Type Alias: TriggerCheckoutResult

> **TriggerCheckoutResult** = \{ `transactionID`: `string`; `status`: `string`; `errorReason`: `string`; `errorCode`: `string`; \}

Result of the checkout transaction

## Properties

### transactionID

> **transactionID**: `string`

Unique identifier for the transaction at Grab side

***

### status

> **status**: `string`

Status of the transaction

***

### errorReason

> **errorReason**: `string`

The reason why the transaction failed

***

### errorCode

> **errorCode**: `string`

Error code associated with the failed transaction
