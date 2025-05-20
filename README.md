# JavaScript to Native bridge communication

## Overview

Communication between web-app and native Grab app happens via web bridge. Each request and
response object must have a structure defined in this document.

## Currently available modules

- [Checkout Module](https://github.com/grab/superapp-sdk/blob/master/docs/CheckoutModule.md).
- [Container Module](https://github.com/grab/superapp-sdk/blob/master/docs/ContainerModule.md).
- [Location Module](https://github.com/grab/superapp-sdk/blob/master/docs/LocationModule.md).
- [Media Module](https://github.com/grab/superapp-sdk/blob/master/docs/MediaModule.md).
- [Scope Module](https://github.com/grab/superapp-sdk/blob/master/docs/ScopeModule.md).
- [Locale Module](https://github.com/grab/superapp-sdk/blob/master/docs/LocaleModule.md).
- [Storage Module](https://github.com/grab/superapp-sdk/blob/master/docs/StorageModule.md)
- [Platform Module](https://github.com/grab/superapp-sdk/blob/master/docs/PlatformModule.md)
- [SystemWebViewKit Module](https://github.com/grab/superapp-sdk/blob/master/docs/SystemWebViewKitModule.md)

One point to note is that partner engineers need to call `ScopeModule.reloadScopes` after redirection to partner website to load permissions from `GrabID`:

```javascript
const scopeModule = new ScopeModule();
await scopeModule.reloadScopes();
```

Afterwards, calls to module methods will reflect actual permissions.

## Request

Each request to native API should be done through JavaScript bridge provided by Grab. Please refer to specific Module API documentation for more details

## Response

Each resonse from the native bridge follows the same structure described bellow.

| Key         | Type                     | Description                                                                        |
| ----------- | ------------------------ | ---------------------------------------------------------------------------------- |
| status_code | Integer                  | Response status code (see list of codes below)                                     |
| result      | Object or primitive type | Result object according to method specification (required for **200** status code) |
| error       | String                   | Error message (required for **non-200** status codes)                              |

### Response status codes

| Code | Type              | Description                                                                     |
| ---- | ----------------- | ------------------------------------------------------------------------------- |
| 200  | OK                | Request successful, **result** value contains response data                     |
| 204  | No Content        | Request successful, **result** value doesn't contain data                       |
| 400  | Bad Request       | The request is malformed (e.g. missing **parameters**, missing **method** name) |
| 403  | Forbidden         | The client doesn't have permission to access this method                        |
| 424  | Failed Dependency | Underlying request returned an error                                            |
| 500  | Internal Error    | Unexpected internal error (e.g. failed to serialize response object)            |

### Success response example
```json
{
  "status_code": 200,
  "result": {
    "latitude": 1.234567,
    "longitude": -1.234567
  }
}
```

### Failure response example

```json
{
  "status_code": 403,
  "error": "Client doesn't have access to method \"getLocation\" in module \"LocationModule\""
}
```
---
* **GDMCOMMENT:** Latitudes and longitudes used in this file are either sourced from GrabPlaces, GrabMaps, OSM or randomly created by the developer and are not obtained from other external sources.

