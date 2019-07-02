# LocaleModule

## Description

Will return current locale information

## Supported Languages

| Language          | Locale |
| ----------------- | ------ |
| English           | en     |
| Indonesia         | id     |
| Chinese           | zh     |
| Malaysia          | ms     |
| Thai              | th     |
| Vietnamese        | vi     |
| Burmese (Zawgyi)  | zg     |
| Burmese (Unicode) | my     |
| Khmer             | km     |

## Methods

### 1. Get language locale

**Method name**: `getLanguageLocaleIdentifier`

**Arguments**: `None`

**Return type**

| Type   | Description                            |
| ------ | -------------------------------------- |
| String | Locale identifier. Example: "en", "id" |

**Code example**

```javascript
import { LocaleModule } from '@grab/superapp-sdk';

// Ideally, initialize this only one and reuse across app.
const localeModule = new LocaleModule()

localeModule.getLanguageLocaleIdentifier({})
  .then({ result, error }) => {
    if (!!result) {
      const locale = result;
    } else if (!!error) {
      // Some error happened. Use default language.
    }
  }
```
