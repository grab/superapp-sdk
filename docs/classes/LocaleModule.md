[@grabjs/superapp-sdk](../README.md) / LocaleModule

# Class: LocaleModule

The LocaleModule provides functionality to retrieve current locale information.

**Supported Languages:**
- English (`en`)
- Indonesia (`id`)
- Chinese (`zh`)
- Malaysia (`ms`)
- Thai (`th`)
- Vietnamese (`vi`)
- Burmese Zawgyi (`zg`)
- Burmese Unicode (`my`)
- Khmer (`km`)

## Example

```javascript
import { LocaleModule } from '@grabjs/superapp-sdk';

// Ideally, initialize this only once and reuse across app.
const localeModule = new LocaleModule();
```

## Extends

- `ModuleBase`

## Constructors

### Constructor

> **new LocaleModule**(): `LocaleModule`

#### Returns

`LocaleModule`

#### Overrides

`ModuleBase.constructor`

## Methods

### getLanguageLocaleIdentifier()

> **getLanguageLocaleIdentifier**(): `Promise`\<[`GetLanguageLocaleIdentifierResponse`](../type-aliases/GetLanguageLocaleIdentifierResponse.md)\>

Get the current language locale identifier.

#### Returns

`Promise`\<[`GetLanguageLocaleIdentifierResponse`](../type-aliases/GetLanguageLocaleIdentifierResponse.md)\>

Promise that resolves to [GetLanguageLocaleIdentifierResponse](../type-aliases/GetLanguageLocaleIdentifierResponse.md) with the locale identifier.

#### Remarks

The locale identifier follows standard language codes (e.g., "en", "id", "zh").
Use this to localize your content to match the user's language preference in the Grab app.

**Supported Languages:**
- `en`: English
- `id`: Indonesia
- `zh`: Chinese
- `ms`: Malaysia
- `th`: Thai
- `vi`: Vietnamese
- `zg`: Burmese Zawgyi
- `my`: Burmese Unicode
- `km`: Khmer

#### Example

```javascript
localeModule.getLanguageLocaleIdentifier()
  .then(({ result, error, status_code }) => {
    if (result) {
      const locale = result.locale;
      console.log("Current locale:", locale);

      // Localize your content based on locale
      if (locale === 'id') {
        showIndonesianContent();
      } else if (locale === 'zh') {
        showChineseContent();
      } else {
        showEnglishContent();
      }
    } else if (error) {
      // Some error happened. Use default language.
      console.error("Locale error:", error);
      showEnglishContent();
    }
  });
```
