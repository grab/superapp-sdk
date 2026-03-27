# SplashScreenBridgeModule

## Description

Dismisses the native splash / Lottie loading view shown while the MiniApp WebView loads. Call this when your web content is ready so users are not blocked by the splash overlay.

## Methods

### 1. Dismiss splash screen

**Method name**: `dismiss`

**Arguments**: `None`

**Return type**

Native bridge responses use `status_code`:

| Code | Meaning                                                                 |
| ---- | ----------------------------------------------------------------------- |
| 204  | No splash shown, or splash was dismissed successfully                   |
| 400  | Invalid input                                                           |
| 403  | Client does not have consent for the required scope                     |
| 500  | Internal error                                                          |

**Code example**

```javascript
import { SplashScreenBridgeModule } from '@grabjs/superapp-sdk';

// Initialize once and reuse
const splashScreen = new SplashScreenBridgeModule();

splashScreen.dismiss().then((response) => {
  if (response.status_code === 204) {
    // Splash dismissed or was not shown
  } else if (response.error) {
    console.error(response.status_code, response.error);
  }
});
```
