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

**Return type**: `None`


## Code example

```javascript
import { SystemWebViewKitModule } from '@grab/superapp-sdk';

// initialize once and reuse
const systemWebViewKitModule = new SystemWebViewKitModule();

// open the system webview
systemWebViewKitModule.redirectToSystemWebView({
    parameters: { url: 'https://example.com' }
  }).then({ result, error }) => {
    if (!!result) {
      // There is a valid result.
    } else if (!!error) {
      // Some error happened.
    }
  }
