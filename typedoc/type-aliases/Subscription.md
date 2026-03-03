[@grabjs/superapp-sdk](../README.md) / Subscription

# Type Alias: Subscription

> **Subscription** = `Readonly`\<\{ `isUnsubscribed`: () => `boolean`; `unsubscribe`: () => `unknown`; \}\>

Controls an active stream subscription. Call `unsubscribe()` to stop receiving data.

## Remarks

Returned by `subscribe()`. Use `unsubscribe()` to terminate the stream early.
Use `isUnsubscribed()` to check if already terminated.
