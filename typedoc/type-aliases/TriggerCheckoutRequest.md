[@grabjs/superapp-sdk](../README.md) / TriggerCheckoutRequest

# Type Alias: TriggerCheckoutRequest

> **TriggerCheckoutRequest** = `Record`\<`string`, `unknown`\>

Request parameters for triggering the checkout flow.

## Remarks

This type is intentionally flexible as the checkout parameters vary depending on the specific payment flow and partner requirements.
Consult the Grab SuperApp SDK documentation for the specific parameters required for your use case.

## Example

**Typical checkout request:**
```typescript
{
  partnerTxID: 'txn-123456',
  partnerGroupTxID: 'group-txn-789',
  amount: 10000,
  currency: 'SGD',
  description: 'Payment for services',
  // ... additional checkout-specific parameters
}
```
