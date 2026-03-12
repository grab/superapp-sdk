/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../core/response';
import { DataStream } from '../core/stream';

/**
 * Generic interface for all native JSBridge module wrappers.
 *
 * @remarks
 * This is the base interface that all Wrapped*Module interfaces implement.
 * Modules can use this directly for generic method invocation, or extend it
 * with method-specific overloads for stricter typing.
 *
 * @example
 * Using directly (CameraModule, ContainerModule):
 * ```typescript
 * invoke<ScanQRCodeResult>('scanQRCode', request)
 * ```
 *
 * @example
 * Extending with method overloads (ProfileModule, LocationModule):
 * ```typescript
 * export interface WrappedProfileModule extends WrappedModule {
 *   invoke(method: 'fetchEmail', params?: any): Promise<BridgeResponse<string>>;
 * }
 * ```
 *
 * @public
 */
export interface WrappedModule {
  invoke<T>(method: string, params?: unknown): DataStream<T> | Promise<BridgeResponse<T>>;
}
