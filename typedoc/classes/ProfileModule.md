[@grabjs/superapp-sdk](../README.md) / ProfileModule

# Class: ProfileModule

JSBridge module for accessing user profile information.

## Remarks

Provides access to user profile data such as email verification.
Requires the MiniApp to be running within the Grab SuperApp's webview.

## Examples

**ES Module:**
```typescript
import { ProfileModule } from '@grabjs/superapp-sdk';
const profile = new ProfileModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const profile = new SuperAppSDK.ProfileModule();
</script>
```

## Extends

- [`BaseModule`](BaseModule.md)

## Constructors

### Constructor

> **new ProfileModule**(): `ProfileModule`

#### Returns

`ProfileModule`

#### Overrides

[`BaseModule`](BaseModule.md).[`constructor`](BaseModule.md#constructor)

## Methods

### fetchEmail()

> **fetchEmail**(): `Promise`\<[`FetchEmailResponse`](../type-aliases/FetchEmailResponse.md)\>

Fetches the user's email address from their Grab profile.

#### Returns

`Promise`\<[`FetchEmailResponse`](../type-aliases/FetchEmailResponse.md)\>

Resolves with the user's email address on success, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Fetch the user's email
```typescript
const response = await profileModule.fetchEmail();
```

Handling the response
```typescript
try {
  const { status_code, result, error } = await profileModule.fetchEmail();
  switch (status_code) {
    case 200:
      console.log('User email:', result.email);
      break;
    case 403:
      console.log('Feature not available: Requires Grab app version 5.399 or above');
      break;
    default:
      console.log(`Could not fetch email${error ? `: ${error}` : ''}`);
      break;
  }
} catch (err) {
  console.log(`Could not fetch email${err ? `: ${err}` : ''}`);
}
```

***

### verifyEmail()

> **verifyEmail**(`request`: [`VerifyEmailRequest`](../type-aliases/VerifyEmailRequest.md)): `Promise`\<[`VerifyEmailResponse`](../type-aliases/VerifyEmailResponse.md)\>

Verifies the user's email address using a one-time password (OTP).

#### Parameters

##### request

[`VerifyEmailRequest`](../type-aliases/VerifyEmailRequest.md)

The email address and OTP to verify.

#### Returns

`Promise`\<[`VerifyEmailResponse`](../type-aliases/VerifyEmailResponse.md)\>

Resolves when the email is verified successfully, or error information on failure.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Examples

Verify email with OTP
```typescript
const response = await profileModule.verifyEmail({
  email: 'user@example.com',
  otp: '123456'
});
```

Handling the response
```typescript
try {
  const { status_code, error } = await profileModule.verifyEmail({
    email: 'user@example.com',
    otp: '123456'
  });
  switch (status_code) {
    case 204:
      console.log('Email verified successfully');
      break;
    case 403:
      console.log('Feature not available: Requires Grab app version 5.399 or above');
      break;
    default:
      console.log(`Could not verify email${error ? `: ${error}` : ''}`);
      break;
  }
} catch (err) {
  console.log(`Could not verify email${err ? `: ${err}` : ''}`);
}
```

***

### isSupported()

> `static` **isSupported**(): `boolean`

#### Returns

`boolean`
