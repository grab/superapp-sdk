[@grabjs/superapp-sdk](../README.md) / TriggerCheckoutResult

# Type Alias: TriggerCheckoutResult

> **TriggerCheckoutResult** = \{ `errorCode?`: `string`; `errorReason?`: `string`; `status`: `string`; `transactionID`: `string`; \}

Result object containing the checkout transaction details.

## Properties

### errorCode?

> `optional` **errorCode**: `string`

Error code associated with the failed transaction.

***

### errorReason?

> `optional` **errorReason**: `string`

The reason why the transaction failed.

***

### status

> **status**: `string`

Status of the transaction.

***

### transactionID

> **transactionID**: `string`

Unique identifier for the transaction at Grab side.
