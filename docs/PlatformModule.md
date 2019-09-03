# PlatformModule
## Description

PlatformKit provides API to navigate back to host application.

## Methods
### 1. Close the current and go back to host application

**Method name**: `back`


**Arguments**: `None`

**Return type**

`None`

**Code example**
```javascript
import { PlatformModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const platformModule = new PlatformModule()

platformModule.back({})
  .then({ result, error }) => {
    if (!!result) {
      // There is a valid result.
    } else if (!!error) {
      // Some error happened.
    }
  }
```
