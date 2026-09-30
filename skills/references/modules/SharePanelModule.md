# SharePanelModule

## API Reference

SDK module for presenting the native Grab Share Panel.

| Method | Returns | Description |
| :--- | :--- | :--- |
| `open(request: OpenSharePanelRequest)` | `Promise<OpenSharePanelResponse>` | Opens the native Grab Share Panel.
Requested individual and group recipient capabilities are authorized natively per trusted
OAuth client ID through `CXMiniAppSharePanelModule`; they do not use additional OAuth scopes. |

## `open`

Opens the native Grab Share Panel.
Requested individual and group recipient capabilities are authorized natively per trusted
OAuth client ID through `CXMiniAppSharePanelModule`; they do not use additional OAuth scopes.

**OAuth Scope:** mobile.share_panel

**Signature:** `open(request: OpenSharePanelRequest): Promise<OpenSharePanelResponse>`

This method can return the following `status_code` values:
- `200` (OK): A target or native recipient was selected.
- `204` (No Content): The panel was dismissed before a selection.
- `400` (Bad Request): The request failed validation.
- `403` (Forbidden): The client is not authorized to open the Share Panel.
- `424` (Failed Dependency): A native dependency failed while presenting the panel.
- `500` (Internal Server Error): An unexpected error occurred.
- `501` (Not Implemented): Requires the Grab app environment.

```typescript
import { isError, SharePanelModule } from '@grabjs/superapp-sdk';

const sharePanel = new SharePanelModule();
const response = await sharePanel.open({
  content: 'Join me on Grab. https://referral.grab.com/referral',
  triggerSource: 'referral_miniapp',
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
