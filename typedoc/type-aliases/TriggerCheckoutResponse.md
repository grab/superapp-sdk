[@grabjs/superapp-sdk](../README.md) / TriggerCheckoutResponse

# Type Alias: TriggerCheckoutResponse

> **TriggerCheckoutResponse** = [`ConstrainedBridgeResponse`](ConstrainedBridgeResponse.md)\<[`TriggerCheckoutResult`](TriggerCheckoutResult.md), `200` \| `400` \| `501`\>

Response when triggering the checkout flow.

## Remarks

This response can have the following status codes:
- `200`: Checkout completed successfully. The `result` contains transaction details.
- `400`: Bad request - invalid checkout parameters.
- `501`: Not implemented - this method requires the Grab app environment.

## Examples

**Success response (200) - payment successful:**
```typescript
{
  status_code: 200,
  result: {
    transactionID: 'grab-txn-abc123',
    status: 'success'
  }
}
```

**Success response (200) - payment failed:**
```typescript
{
  status_code: 200,
  result: {
    transactionID: 'grab-txn-abc123',
    status: 'failure',
    errorMessage: 'Insufficient funds',
    errorCode: 'PAYMENT_FAILED'
  }
}
```

**Success response (200) - user cancelled:**
```typescript
{
  status_code: 200,
  result: {
    transactionID: 'grab-txn-abc123',
    status: 'userInitiatedCancel'
  }
}
```

**Bad request response (400):**
```typescript
{
  status_code: 400,
  error: 'Invalid checkout parameters'
}
```

**Not implemented response (501) - outside Grab app:**
```typescript
{
  status_code: 501,
  error: 'Not implemented: This method requires the Grab app environment'
}
```
