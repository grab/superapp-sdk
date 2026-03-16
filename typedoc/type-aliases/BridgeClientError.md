[@grabjs/superapp-sdk](../README.md) / BridgeClientError

# Type Alias: BridgeClientError

> **BridgeClientError** = [`ResponseStatusCode400`](ResponseStatusCode400.md) \| [`ResponseStatusCode401`](ResponseStatusCode401.md) \| [`ResponseStatusCode403`](ResponseStatusCode403.md) \| [`ResponseStatusCode404`](ResponseStatusCode404.md) \| [`ResponseStatusCode424`](ResponseStatusCode424.md) \| [`ResponseStatusCode426`](ResponseStatusCode426.md)

Union type representing all client error JSBridge responses (4xx status codes).
Includes: 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found),
424 (Failed Dependency), and 426 (Upgrade Required).
