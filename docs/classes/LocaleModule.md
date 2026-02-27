[@grabjs/superapp-sdk](../README.md) / LocaleModule

# Class: LocaleModule

Provides functionality to retrieve current locale information.

## Remarks

The LocaleModule enables miniapps to detect the user's language preference in the Grab app
and localize content accordingly.

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

Initialize the LocaleModule:
```typescript
import { LocaleModule } from '@grabjs/superapp-sdk';

const localeModule = new LocaleModule();
```

## Extends

- `BaseModule`

## Constructors

### Constructor

> **new LocaleModule**(): `LocaleModule`

#### Returns

`LocaleModule`

#### Overrides

`BaseModule.constructor`

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

#### Examples

Basic usage:
```typescript
try {
  const response = await localeModule.getLanguageLocaleIdentifier();
  if (response.status_code === 200) {
    const locale = response.result.locale;
    console.log('Current locale:', locale);
  }
} catch (error) {
  console.error(error);
}
```

Handling the response:
```typescript
try {
  const response = await localeModule.getLanguageLocaleIdentifier();

  switch (response.status_code) {
    case 200:
      const locale = response.result.locale;
      console.log('Current locale:', locale);
      if (locale === 'id') {
        showIndonesianContent();
      } else if (locale === 'zh') {
        showChineseContent();
      } else {
        showEnglishContent();
      }
      break;
    case 400:
      console.error('Invalid request:', response.error);
      showEnglishContent();
      break;
    case 500:
      console.error('Locale error:', response.error);
      showEnglishContent();
      break;
  }
} catch (error) {
  console.error(error);
}
```
