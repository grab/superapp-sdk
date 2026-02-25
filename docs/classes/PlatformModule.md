[@grabjs/superapp-sdk](../README.md) / PlatformModule

# Class: PlatformModule

The PlatformModule provides API to navigate back to the host application.

## Example

```javascript
import { PlatformModule } from '@grabjs/superapp-sdk';

// Ideally, initialize this only once and reuse across app.
const platformModule = new PlatformModule();
```

## Extends

- `ModuleBase`

## Constructors

### Constructor

> **new PlatformModule**(): `PlatformModule`

#### Returns

`PlatformModule`

#### Overrides

`ModuleBase.constructor`

## Methods

### back()

> **back**(): `Promise`\<[`BackResponse`](../type-aliases/BackResponse.md)\>

Close the current view and navigate back to the host application.

#### Returns

`Promise`\<[`BackResponse`](../type-aliases/BackResponse.md)\>

Promise that resolves to [BackResponse](../type-aliases/BackResponse.md) when navigation completes.

#### Remarks

This method triggers the native back navigation, which closes the current webview
and returns the user to the previous screen in the Grab app.

#### Example

```javascript
// Navigate back after completing a task
platformModule.back()
  .then(({ result, error, status_code }) => {
    if (result || status_code === 200) {
      console.log("Navigation successful");
    } else if (error) {
      console.error("Navigation error:", error);
    }
  });

// Example: Back button handler
backButton.addEventListener('click', () => {
  platformModule.back();
});
```
