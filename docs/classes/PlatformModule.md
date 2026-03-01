[@grabjs/superapp-sdk](../globals.md) / PlatformModule

# Class: PlatformModule

Provides API to navigate back to the host application.

## Remarks

The PlatformModule enables miniapps to trigger native back navigation,
closing the current webview and returning the user to the previous screen in the Grab app.

## Examples

**ES Module:**
```typescript
import { PlatformModule } from '@grabjs/superapp-sdk';

const platformModule = new PlatformModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const platformModule = new SuperAppSDK.PlatformModule();
</script>
```

## Extends

- `BaseModule`

## Constructors

### Constructor

> **new PlatformModule**(): `PlatformModule`

#### Returns

`PlatformModule`

#### Overrides

`BaseModule.constructor`

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

#### Examples

Basic usage:
```typescript
try {
  await platformModule.back();
} catch (error) {
  console.error(error);
}
```

Back button handler:
```typescript
backButton.addEventListener('click', async () => {
  try {
    await platformModule.back();
  } catch (error) {
    console.error(error);
  }
});
```

Handling the response:
```typescript
try {
  const response = await platformModule.back();

  switch (response.status_code) {
    case 200:
      console.log('Navigation successful');
      break;
    case 400:
      console.error('Invalid request:', response.error);
      break;
    case 500:
      console.error('Navigation error:', response.error);
      break;
  }
} catch (error) {
  console.error(error);
}
```
