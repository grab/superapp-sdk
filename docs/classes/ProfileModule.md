[@grabjs/superapp-sdk](../README.md) / ProfileModule

# Class: ProfileModule

Provides functionality related to user profile information.

## Remarks

**Required Scope:** `mobile.profile`

**Version Requirements:** This module requires Grab app version 5.399 or above.

## Examples

**ES Module:**
```typescript
import { ProfileModule } from '@grabjs/superapp-sdk';

const profileModule = new ProfileModule();
```

**CDN (UMD):**
```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const profileModule = new SuperAppSDK.ProfileModule();
</script>
```

## Extends

- `BaseModule`

## Constructors

### Constructor

> **new ProfileModule**(): `ProfileModule`

#### Returns

`ProfileModule`

#### Overrides

`BaseModule.constructor`

## Methods

### fetchEmail()

> **fetchEmail**(): `Promise`\<[`FetchEmailResponse`](../type-aliases/FetchEmailResponse.md)\>

Fetch the user's verified email address.

#### Returns

`Promise`\<[`FetchEmailResponse`](../type-aliases/FetchEmailResponse.md)\>

Promise that resolves to [FetchEmailResponse](../type-aliases/FetchEmailResponse.md) with the user's email.

#### Remarks

**Required Scope:** `mobile.profile`

**Version Requirements:** This method requires Grab app version 5.399 or above.

If the user does not have a verified email, the method will return a `status_code` of `204`.

#### Examples

Basic usage:
```typescript
try {
  const response = await profileModule.fetchEmail();
  if (response.status_code === 200) {
    console.log('User email:', response.result.email);
    document.getElementById('email').value = response.result.email;
  }
} catch (error) {
  console.error(error);
}
```

Handling the response:
```typescript
try {
  const response = await profileModule.fetchEmail();

  switch (response.status_code) {
    case 200:
      console.log('User email:', response.result.email);
      document.getElementById('email').value = response.result.email;
      break;
    case 204:
      console.log('User does not have a verified email.');
      showEmailCaptureForm();
      break;
    case 400:
      console.error('Invalid request:', response.error);
      break;
    case 403:
      console.error('Feature not supported:', response.error);
      break;
    case 500:
      console.error('Fetch email error:', response.error);
      break;
  }
} catch (error) {
  console.error(error);
}
```

***

### verifyEmail()

> **verifyEmail**(`verifyEmailDetails`: [`VerifyEmailRequest`](../type-aliases/VerifyEmailRequest.md)): `Promise`\<[`VerifyEmailResponse`](../type-aliases/VerifyEmailResponse.md)\>

Trigger email capture bottom sheet and OTP verification.

#### Parameters

##### verifyEmailDetails

[`VerifyEmailRequest`](../type-aliases/VerifyEmailRequest.md)

Request parameters for email verification.

#### Returns

`Promise`\<[`VerifyEmailResponse`](../type-aliases/VerifyEmailResponse.md)\>

Promise that resolves to [VerifyEmailResponse](../type-aliases/VerifyEmailResponse.md) with the verified email.

#### Remarks

**Required Scope:** `mobile.profile`

**Version Requirements:** This method requires Grab app version 5.399 or above.

If the user closes the verify OTP bottom sheet, the method will return a `status_code` of `204`.
Successful verification will also update the email address for the user on Grab.

#### Examples

Let user enter email:
```typescript
try {
  const response = await profileModule.verifyEmail({});
  if (response.status_code === 200) {
    console.log('Verified email:', response.result.email);
  }
} catch (error) {
  console.error(error);
}
```

Pre-fill email and let user edit:
```typescript
try {
  const response = await profileModule.verifyEmail({
    email: 'test@example.com',
    skipUserInput: false
  });
  if (response.status_code === 200) {
    console.log('Verified email:', response.result.email);
  }
} catch (error) {
  console.error(error);
}
```

Skip user input and verify directly:
```typescript
try {
  const response = await profileModule.verifyEmail({
    email: 'test@example.com',
    skipUserInput: true
  });
  if (response.status_code === 200) {
    console.log('Verified email:', response.result.email);
  }
} catch (error) {
  console.error(error);
}
```

Handling the response:
```typescript
try {
  const response = await profileModule.verifyEmail({
    email: 'test@example.com',
    skipUserInput: true
  });

  switch (response.status_code) {
    case 200:
      console.log('Email verified successfully:', response.result.email);
      saveEmailToDatabase(response.result.email);
      break;
    case 204:
      console.log('User closed the bottom sheet.');
      break;
    case 400:
      console.error('Invalid email format:', response.error);
      break;
    case 403:
      console.error('Feature not supported:', response.error);
      break;
    case 500:
      console.error('Verify email error:', response.error);
      break;
  }
} catch (error) {
  console.error(error);
}
```
