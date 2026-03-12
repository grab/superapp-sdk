[@grabjs/superapp-sdk](../README.md) / ProfileModule

# Class: ProfileModule

JSBridge module for accessing user profile information.

## Remarks

Provides access to user profile data such as email verification.
This code must run on the Grab SuperApp's webview to function correctly.

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

The user's email address if available.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Initialize the profile module
const profileModule = new ProfileModule();

// Fetch the user's email
try {
  const response = await profileModule.fetchEmail();

  switch (response.status_code) {
    case 200:
      console.log('User email:', response.result.email);
      break;
    case 400:
    case 403:
      // Feature not available or other error
      console.log('Could not fetch email:', response.error);
      break;
    case 501:
      console.log('Not in Grab app:', response.error);
      break;
    default:
      console.log('Unexpected status code:', response);
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

The email and OTP to verify.

#### Returns

`Promise`\<[`VerifyEmailResponse`](../type-aliases/VerifyEmailResponse.md)\>

Confirmation of whether the email verification was successful.

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Initialize the profile module
const profileModule = new ProfileModule();

// Verify email with OTP
try {
  const response = await profileModule.verifyEmail({
    email: 'user@example.com',
    otp: '123456'
  });

  switch (response.status_code) {
    case 200:
      console.log('Email verified successfully');
      break;
    case 400:
    case 403:
      // Feature not available or other error
      console.log('Could not verify email:', response.error);
      break;
    case 501:
      console.log('Not in Grab app:', response.error);
      break;
    default:
      console.log('Unexpected status code:', response);
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
