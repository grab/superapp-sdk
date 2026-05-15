/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { wrapModule } from '@grabjs/mobile-kit-bridge-sdk';
import { type GenericSchema, safeParse } from 'valibot';

import { isErrorWithMessage } from '../utils/error';
import { Logger } from '../utils/logger';
import { detectGrabApp, GrabAppInfo } from '../utils/platform';
import { formatIssues } from '../utils/schema';
import { ModuleInvokeOptions, SDKResponse, SDKStream, Subscription, WrappedModule } from './types';

/**
 * Base class for all modules.
 *
 * @group Core
 *
 * @remarks
 * On construction, the class wraps the module on `window` (e.g., `WrappedContainerModule`).
 * This code must run on the Grab SuperApp's webview to function correctly.
 *
 * @public
 */
export class BaseModule {
  /**
   * The module name.
   */
  private readonly name: string;

  /**
   * Logger scoped to this module.
   *
   * @protected
   */
  protected readonly logger: Logger;

  /**
   * Returns the wrapped module from the global `window` object.
   *
   * @returns The wrapped module instance with native method bindings.
   *
   * @public
   */
  protected get wrappedModule(): WrappedModule {
    return (window as unknown as Record<string, WrappedModule>)[`Wrapped${this.name}`];
  }

  /**
   * Creates a new module instance and wraps it on the global `window` object.
   *
   * @param moduleName - The name of the module (e.g., "ContainerModule", "ProfileModule").
   * @throws Error when the module fails to initialize.
   */
  constructor(moduleName: string) {
    this.name = moduleName;
    this.logger = new Logger(moduleName);

    if (this.wrappedModule) {
      // Module is already initialized
      return;
    }

    try {
      wrapModule(window, this.name);
    } catch (error) {
      throw new Error(
        `Failed to initialize ${this.name}${isErrorWithMessage(error) ? `: ${error.message}` : ''}`,
        {
          cause: error,
        }
      );
    }
  }

  /**
   * Validates a value against a schema.
   *
   * @param schema - The valibot schema to validate against.
   * @param value - The value to validate.
   * @returns A formatted error string if validation fails, or `null` if valid.
   *
   * @protected
   */
  protected validate(schema: GenericSchema, value: unknown): string | null {
    const parsed = safeParse(schema, value);
    if (!parsed.success) {
      return formatIssues(parsed.issues);
    }
    return null;
  }

  /**
   * Checks whether the current app version supports this method.
   *
   * @remarks
   * Returns `501` status code if not running in the Grab app, `426` status code if the version check fails. Otherwise, returns `null`.
   *
   * @param isSupported - A function receiving the detected app info, returning `true` if supported.
   * @returns An error response, or `null` if supported.
   *
   * @protected
   */
  protected checkSupport(
    isSupported: (appInfo: GrabAppInfo) => boolean
  ): { status_code: 501; error: string } | { status_code: 426; error: string } | null {
    const appInfo = detectGrabApp();
    if (!appInfo) {
      return {
        status_code: 501,
        error: 'Not implemented: This method requires the Grab app environment',
      };
    }
    if (!isSupported(appInfo)) {
      return {
        status_code: 426,
        error: 'Upgrade Required: This method requires a newer version of the Grab app',
      };
    }
    return null;
  }

  /**
   * Invokes a method.
   *
   * @remarks
   * - Always checks if running in Grab app (returns `501` status code if not).
   * - All errors are reported via the `status_code` field; this method never rejects.
   *
   * @param options - The invoke options including method name and params.
   * @returns A promise resolving to the SDK response.
   *
   * @protected
   */
  protected async invoke(options: ModuleInvokeOptions): Promise<SDKResponse> {
    const { method, params } = options;

    try {
      const appInfo = detectGrabApp();
      if (!appInfo) {
        return {
          status_code: 501,
          error: 'Not implemented: This method requires the Grab app environment',
        };
      }

      return (await this.wrappedModule.invoke(method, params)) as SDKResponse;
    } catch (error) {
      return {
        status_code: 500,
        error: `Failed to invoke method: ${isErrorWithMessage(error) ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Creates a {@link SDKStream} that immediately emits an error response.
   *
   * @returns A {@link SDKStream} that immediately emits an error response.
   *
   * @private
   */
  private createErrorStream(errorResponse: SDKResponse): SDKStream {
    return {
      subscribe: (handlers) => {
        handlers?.next?.(errorResponse);
        handlers?.complete?.();
        return {
          isUnsubscribed: () => true,
          unsubscribe: () => {},
        } as Subscription;
      },
      then: (onfulfilled) => Promise.resolve(errorResponse).then(onfulfilled),
    } as SDKStream;
  }

  /**
   * Invokes a streaming method that returns a {@link SDKStream}.
   *
   * @remarks
   * - Always checks if running in Grab app (returns `501` status code if not).
   * - Returns a {@link SDKStream} that can be subscribed to or awaited for the first value.
   * - All errors are reported via error responses in the stream; this method never rejects.
   *
   * @param options - The invoke options including method name and params.
   * @returns A {@link SDKStream} for receiving continuous data.
   *
   * @protected
   */
  protected invokeStream(options: ModuleInvokeOptions): SDKStream {
    const { method, params } = options;

    try {
      const appInfo = detectGrabApp();
      if (!appInfo) {
        return this.createErrorStream({
          status_code: 501,
          error: 'Not implemented: This method requires the Grab app environment',
        });
      }

      return this.wrappedModule.invoke(method, params) as SDKStream;
    } catch (error) {
      return this.createErrorStream({
        status_code: 500,
        error: `Failed to invoke method: ${isErrorWithMessage(error) ? error.message : 'Unknown error'}`,
      });
    }
  }
}
