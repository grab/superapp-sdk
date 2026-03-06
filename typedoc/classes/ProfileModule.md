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

A promise that resolves to a response with one of the following possible status codes:
- `200`: Email fetched successfully
- `400`: Invalid request
- `403`: Feature requires Grab app version 5.399 or above (returned client-side, not from JSBridge)

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ProfileModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ProfileModule, isResponseOk, isResponseError } = window.SuperAppSDK;

// Initialize the profile module
const profileModule = new ProfileModule();

// Fetch the user's email
try {
  const response = await profileModule.fetchEmail();

  if (isResponseError(response)) {
    // Feature not available or other error
    console.log('Could not fetch email:', response.error);
  } else if (isResponseOk(response)) {
    console.log('User email:', response.result.email);
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

The email verification configuration.

#### Returns

`Promise`\<[`VerifyEmailResponse`](../type-aliases/VerifyEmailResponse.md)\>

A promise that resolves to a response with one of the following possible status codes:
- `200`: Email verified successfully
- `400`: Invalid request
- `403`: Feature requires Grab app version 5.399 or above (returned client-side, not from JSBridge)

#### Throws

Error when the JSBridge method fails unexpectedly.

#### Example

**Simple usage**
```typescript
// Imports using ES Module built
import { ProfileModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
// Imports using UMD built (via CDN)
const { ProfileModule, isResponseOk, isResponseError } = window.SuperAppSDK;

// Initialize the profile module
const profileModule = new ProfileModule();

// Verify email with OTP
try {
  const response = await profileModule.verifyEmail({
    email: 'user@example.com',
    otp: '123456'
  });

  if (isResponseError(response)) {
    // Feature not available or other error
    console.log('Could not verify email:', response.error);
  } else if (isResponseOk(response)) {
    console.log('Email verified successfully');
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
