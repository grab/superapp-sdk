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

**Return type**: 
`Promise<{ status_code: number, result: any, error: string }>`  
- `status_code` is the HTTP-style code (200 on success)  
- `result` is the payload for `status_code === 200`  
- `error` is the error message for `status_code !== 200`


## Code example

```javascript
import { SystemWebViewKitModule } from '@grab/superapp-sdk';

// initialize once and reuse
const systemWebViewKitModule = new SystemWebViewKitModule();

// open the system webview
systemWebViewKitModule.redirectToSystemWebView({
    parameters: { url: 'https://example.com' }
  })
  .then(({ status_code, result, error }) => {
    if (status_code === 200) {
      // WebView opened successfully
    } else {
      // some native error
    }
  })
  .catch(invocationError => {
    // Bridge invocation failed
  });
