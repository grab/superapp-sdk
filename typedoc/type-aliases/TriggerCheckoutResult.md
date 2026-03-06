[@grabjs/superapp-sdk](../README.md) / TriggerCheckoutResult

# Type Alias: TriggerCheckoutResult

> **TriggerCheckoutResult** = \{ `errorCode?`: `string`; `errorMessage?`: `string`; `status`: `string`; `transactionID`: `string`; \}

Result object containing the checkout transaction details.

## Properties

### errorCode?

> `optional` **errorCode**: `string`

Error code associated with the failed transaction.

***

### errorMessage?

> `optional` **errorMessage**: `string`

Error message if the transaction failed.

***

### status

> **status**: `string`

Status of the transaction: "success", "failure", "pending", or "userInitiatedCancel".

***

### transactionID

> **transactionID**: `string`

Unique identifier for the transaction at Grab side.
