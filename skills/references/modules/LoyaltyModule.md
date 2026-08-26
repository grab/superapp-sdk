# LoyaltyModule

## API Reference

SDK module for Loyalty features via `JSBridge`.

| Method | Returns | Description |
| :--- | :--- | :--- |
| `estimateRewards(request: EstimateRewardsRequest)` | `Promise<EstimateRewardsResponse>` | Estimates the rewards for a list of items. |

## `estimateRewards`

Estimates the rewards for a list of items.

**OAuth Scope:** mobile.loyalty | **Minimum Grab App Version:** Android: 5.424.0, iOS: 5.424.0

**Signature:** `estimateRewards(request: EstimateRewardsRequest): Promise<EstimateRewardsResponse>`

This method can return the following `status_code` values:
- `200` (OK): Estimation successful. The `result` contains EstimateRewardsResult.
  Each entry in `result.items` has its own `status_code`: `SUCCESS`, `NOT_APPLICABLE`, or `ERROR`.
- `400` (Bad Request): Invalid request parameters (for example, empty items array or missing fields).
- `403` (Forbidden): Client is not authorized to estimate rewards.
- `424` (Failed Dependency): An underlying native or backend dependency failed.
- `426` (Upgrade Required): Feature requires a minimum Grab app version.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires Grab app environment.

```typescript
import { LoyaltyModule, isSuccess, isError } from '@grabjs/superapp-sdk';

const loyalty = new LoyaltyModule();

const response = await loyalty.estimateRewards({
  items: [
    { id: 'trip-456', amount_in_minor_units: 75000, currency_code: 'SGD' },
    { id: 'trip-789', amount_in_minor_units: 25000000, currency_code: 'IDR' },
  ],
});

if (isSuccess(response) && response.status_code === 200) {
  for (const entry of response.result.items) {
    if (entry.status_code === 'SUCCESS') {
      console.log(`${entry.id}: ${entry.result.reward.display_amount} ${entry.result.reward.currency_code}`);
    } else if (entry.status_code === 'NOT_APPLICABLE') {
      console.log(`${entry.id}: not applicable (${entry.reason_code})`);
    } else {
      console.error(`${entry.id}: estimation failed (${entry.reason_code})`);
    }
  }
} else if (isError(response)) {
  console.error(`Error ${response.status_code}: ${response.error}`);
}
```
