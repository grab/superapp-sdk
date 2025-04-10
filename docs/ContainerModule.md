# ContainerModule

## Description

Provides APIs to interract with the webview container.

## Methods

### 1. Set header background color

**Method name**: `setHeaderBackgroundColor`

**Arguments**

| Name            | Type   | Description             |
| --------------- | ------ | ----------------------- |
| backgroundColor | String | Hexadecimal color value |

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule
  .setHeaderBackgroundColor("#ffffff")
  .then(({ result, error }) => {
    if (result) {
      // There is a valid result.
    } else if (error) {
      // Some error happened.
    }
  });
```

### 2. Set header title

**Method name**: `setHeaderTitle`

**Arguments**

| Name  | Type   | Description       |
| ----- | ------ | ----------------- |
| title | String | Title of the page |

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.setHeaderTitle("Home").then(({ result, error }) => {
  if (result) {
    // There is a valid result.
  } else if (error) {
    // Some error happened.
  }
});
```
