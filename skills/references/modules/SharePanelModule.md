# SharePanelModule

## API Reference

SDK module for opening the Share Panel.

| Method | Returns | Description |
| :--- | :--- | :--- |
| `open(request: OpenSharePanelRequest)` | `Promise<OpenSharePanelResponse>` | Opens the Share Panel.
Individual and group recipient options do not require additional OAuth scopes, but their
availability depends on client authorization. |

## `open`

Opens the Share Panel.
Individual and group recipient options do not require additional OAuth scopes, but their
availability depends on client authorization.

**OAuth Scope:** mobile.share_panel | **Minimum Grab App Version:** Android: 5.433.0, iOS: 5.433.0

**Signature:** `open(request: OpenSharePanelRequest): Promise<OpenSharePanelResponse>`

This method can return the following `status_code` values:
- `200` (OK): A target or recipient was selected.
- `204` (No Content): The panel was dismissed before a selection.
- `400` (Bad Request): The request failed validation.
- `403` (Forbidden): The client is not authorized to open the Share Panel.
- `424` (Failed Dependency): A dependency failed while presenting the Share Panel.
- `426` (Upgrade Required): The Share Panel requires Grab app version 5.433.0 or above.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires the Grab app environment.

```typescript
import { isError, SharePanelModule } from '@grabjs/superapp-sdk';

const sharePanel = new SharePanelModule();
const response = await sharePanel.open({
  content: 'I found this article useful and thought you might too: https://example.com/article',
  triggerSource: 'content_share',
  enableIndividualRecipients: true,
  enableGroupRecipients: true,
});

if (response.status_code === 204) {
  return;
}

if (response.status_code === 200) {
  console.log(response.result.outcome);
} else if (isError(response)) {
  console.error(`Share failed: ${response.error}`);
}
```
