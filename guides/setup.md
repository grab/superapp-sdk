---
title: Setup
---

# Setup

## Installation

### NPM

```bash
npm install @grabjs/superapp-sdk
```

### Yarn

```bash
yarn add @grabjs/superapp-sdk
```

## Importing

### ES Modules (recommended)

Import only the modules you need:

```typescript
import { ContainerModule, ScopeModule } from '@grabjs/superapp-sdk';
```

Type guards and response types are also available as named exports:

```typescript
import { isSuccess, isError } from '@grabjs/superapp-sdk';
```

### CDN (UMD Bundle)

If you are not using a bundler, load the SDK from a CDN and access it via the `SuperAppSDK` global:

```html
<script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
<script>
  const { ContainerModule, ScopeModule, isSuccess, isError } = window.SuperAppSDK;
</script>
```

## Requirements

SDK methods communicate with the native Grab SuperApp via JSBridge. They only work when your page is running inside the **Grab SuperApp WebView**. Calling a method outside that environment returns `{ status_code: 501 }`.
