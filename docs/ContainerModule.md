# ContainerModule

## Description

Provides APIs to interract with the webview container.

## Methods

### 1. Set background color

**Method name**: `setBackgroundColor`

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
  .setBackgroundColor("#ffffff")
  .then(({ result, error }) => {
    if (result) {
      // There is a valid result.
    } else if (error) {
      // Some error happened.
    }
  });
```

### 2. Set title

**Method name**: `setTitle`

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

containerModule.setTitle("Home").then(({ result, error }) => {
  if (result) {
    // There is a valid result.
  } else if (error) {
    // Some error happened.
  }
});
```

### 3. Hide back button

**Method name**: `hideBackButton`

**Arguments**

`None`

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.hideBackButton().then(({ result, error }) => {
  if (result) {
    // There is a valid result.
  } else if (error) {
    // Some error happened.
  }
});
```

### 4. Show back button

**Method name**: `showBackButton`

**Arguments**

`None`

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.showBackButton().then(({ result, error }) => {
  if (result) {
    // There is a valid result.
  } else if (error) {
    // Some error happened.
  }
});
```

### 5. Hide refresh button

**Method name**: `hideRefreshButton`

**Arguments**

`None`

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.hideRefreshButton().then(({ result, error }) => {
  if (result) {
    // There is a valid result.
  } else if (error) {
    // Some error happened.
  }
});
```

### 6. Show refresh button

**Method name**: `showRefreshButton`

**Arguments**

`None`

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.showRefreshButton().then(({ result, error }) => {
  if (result) {
    // There is a valid result.
  } else if (error) {
    // Some error happened.
  }
});
```

### 7. Hide loader

**Method name**: `hideLoader`

**Arguments**

`None`

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.hideLoader().then(({ result, error }) => {
  if (result) {
    // There is a valid result.
  } else if (error) {
    // Some error happened.
  }
});
```

### 8. Close

**Method name**: `close`

**Arguments**

`None`

**Return type**

`None`

**Code example**

```javascript
import { ContainerModule } from "@grabjs/superapp-sdk";

// Ideally, initialize this only one and reuse across app.
const containerModule = new ContainerModule();

containerModule.close().then(({ result, error }) => {
  if (result) {
    // There is a valid result.
  } else if (error) {
    // Some error happened.
  }
});
```
