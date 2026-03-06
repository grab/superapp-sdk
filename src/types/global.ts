/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { DataStream } from '../core/stream';
import { BridgeResponse } from '../core/response';

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
  invoke<T, P = unknown, R = BridgeResponse<T>, M extends string = string>(
    method: M,
    params?: P
  ): M extends `observe${string}` ? DataStream<T> : Promise<R>;
}

/**
 * Module names that have a corresponding Wrapped*Module on the window.
 */
type ModuleName =
  | 'Camera'
  | 'Checkout'
  | 'Container'
  | 'Identity'
  | 'Locale'
  | 'Location'
  | 'Media'
  | 'Platform'
  | 'Profile'
  | 'Scope'
  | 'Storage'
  | 'SystemWebViewKit';

/**
 * Template literal type for all Wrapped*Module property names.
 */
type WrappedModuleKey = `Wrapped${ModuleName}Module`;

/**
 * Type representing all Wrapped*Module properties on Window.
 * Uses template literal types to generate the property names dynamically.
 */
type WindowWithWrappedModules = {
  [K in WrappedModuleKey]?: WrappedModule;
};

/**
 * Global Window interface extensions for all JSBridge modules.
 *
 * @remarks
 * Uses declaration merging with a mapped type to avoid listing all modules manually.
 * Any new module just needs to be added to the ModuleName union type.
 *
 * @public
 */
declare global {
  interface Window extends WindowWithWrappedModules {}
}

export {};
