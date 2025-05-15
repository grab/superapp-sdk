# SystemWebViewKitModule

## Description

Open a URL in a system webview.

## Methods

**Method name**: `redirectToSystemWebView`

**Arguments**:  
| Name       | Type       | Description                   |
| ---------- | ---------- | ----------------------------- |
| parameters | Parameters | The request parameters.       |

#### Parameters
| Name | Type   | Description      |
| ---- | ------ | ---------------- |
| url  | String | The URL to open. |

**Return type**: `Promise<void>`

## Code example

```javascript
import { SystemWebViewKitModule } from '@grab/superapp-sdk';

// initialize once and reuse
const systemWebViewKitModule = new SystemWebViewKitModule();

// open the system webview
systemWebViewKitModule.redirectToSystemWebView({
    parameters: { url: 'https://example.com' }
  })
  .then(() => {
     // success: webview was handed off
  })
  .catch(error => {
     // Some error happened.
  });
