/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { wrapModule } from '@grabjs/mobile-kit-bridge-sdk';
import { type GenericSchema, safeParse } from 'valibot';

import { isErrorWithMessage } from '../utils/error';
import { detectGrabApp } from '../utils/platform';
import { formatIssues } from '../utils/schema';
import { BridgeResponse, BridgeStream, InvokeOptions, Subscription, WrappedModule } from './types';

/**
 * Base class for all JSBridge modules.
 *
 * @remarks
 * On construction, the class wraps the JSBridge module on `window` (e.g., `WrappedContainerModule`).
 * This code must run on the Grab SuperApp's webview to function correctly.
 *
 * @public
 */
export class BaseModule {
  /**
   * The module name used to identify the JSBridge module.
   */
  private readonly name: string;

  /**
   * Returns the wrapped JSBridge module from the global `window` object.
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
   * @throws Error when the bridge SDK fails to wrap the module.
   */
  constructor(moduleName: string) {
    this.name = moduleName;

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
   * Validates user input against a schema before it is transformed for a bridge call.
   *
   * @remarks
   * Use this when the params passed to `invoke` differ from the user-facing request object
   * (i.e., when a transform is applied before the bridge call). For straightforward cases
   * where no transform is needed, pass `requestSchema` directly to `invoke` instead.
   *
   * @param schema - The valibot schema to validate against.
   * @param params - The value to validate.
   * @returns A 400 error response if validation fails, or `null` if valid.
   *
   * @protected
   */
  protected validateRequest(
    schema: GenericSchema,
    params: unknown
  ): { status_code: 400; error: string } | null {
    const parsed = safeParse(schema, params);
    if (!parsed.success) {
      return { status_code: 400, error: formatIssues(parsed.issues) };
    }
    return null;
  }

  /**
   * Invokes a JSBridge method with optional app validation and response transformation.
   *
   * @remarks
   * - Always checks if running in Grab app (returns 501 if not).
   * - When `isSupported` returns false, returns 426 (Upgrade Required).
   * - When `transformResponse` is provided, applies it to successful responses.
   * - All errors are reported via the `status_code` field; this method never rejects.
   * - For streaming methods, use `invokeStream` instead.
   *
   * @param options - The invoke options including method name, params, validation, and transformation.
   * @returns A promise resolving to the JSBridge response.
   *
   * @protected
   */
  protected async invoke(options: InvokeOptions): Promise<BridgeResponse> {
    const { method, params, isSupported, transformResponse, requestSchema, responseSchema } =
      options;

    try {
      if (requestSchema !== undefined && params !== undefined) {
        const parsed = safeParse(requestSchema, params);
        if (!parsed.success) {
          return {
            status_code: 400,
            error: formatIssues(parsed.issues),
          };
        }
      }

      const appInfo = detectGrabApp();
      if (!appInfo) {
        return {
          status_code: 501,
          error: 'Not implemented: This method requires the Grab app environment',
        };
      }

      if (isSupported) {
        if (!isSupported(appInfo)) {
          return {
            status_code: 426,
            error: 'Upgrade Required: This method requires a newer version of the Grab app',
          };
        }
      }

      const response = (await this.wrappedModule.invoke(method, params)) as BridgeResponse;

      if (responseSchema !== undefined) {
        const parsed = safeParse(responseSchema, response);
        if (!parsed.success) {
          console.warn(`[SDK:${method}] Unexpected response shape:`, parsed.issues);
        }
      }

      if (transformResponse) {
        return transformResponse(response);
      }

      return response;
    } catch (error) {
      return {
        status_code: 500,
        error: `Failed to invoke method: ${isErrorWithMessage(error) ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Creates a BridgeStream that immediately emits an error response.
   * Used for 501, 426, and 500 error scenarios in invokeStream.
   *
   * @returns A BridgeStream that emits the error and immediately completes.
   *
   * @private
   */
  private createErrorStream(errorResponse: BridgeResponse): BridgeStream {
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
    } as BridgeStream;
  }

  /**
   * Invokes a JSBridge streaming method that returns a `BridgeStream`.
   *
   * @remarks
   * - Always checks if running in Grab app (returns 501 error response if not).
   * - When `isSupported` returns false, returns 426 error response.
   * - Returns a `BridgeStream` that can be subscribed to or awaited for the first value.
   * - All errors are reported via error responses in the stream; this method never rejects.
   *
   * @param options - The invoke options including method name, params, and validation.
   * @returns A `BridgeStream` for receiving continuous data from the JSBridge.
   *
   * @protected
   */
  protected invokeStream(options: InvokeOptions): BridgeStream {
    const { method, params, isSupported, transformResponse, requestSchema, responseSchema } =
      options;

    try {
      if (requestSchema !== undefined && params !== undefined) {
        const parsed = safeParse(requestSchema, params);
        if (!parsed.success) {
          return this.createErrorStream({
            status_code: 400,
            error: formatIssues(parsed.issues),
          });
        }
      }

      const appInfo = detectGrabApp();
      if (!appInfo) {
        return this.createErrorStream({
          status_code: 501,
          error: 'Not implemented: This method requires the Grab app environment',
        });
      }

      if (isSupported) {
        if (!isSupported(appInfo)) {
          return this.createErrorStream({
            status_code: 426,
            error: 'Upgrade Required: This method requires a newer version of the Grab app',
          });
        }
      }

      const stream = this.wrappedModule.invoke(method, params) as BridgeStream;

      if (!transformResponse && !responseSchema) {
        return stream;
      }

      return {
        subscribe: (handlers) =>
          stream.subscribe({
            next: (value) => {
              if (responseSchema !== undefined) {
                const parsed = safeParse(responseSchema, value);
                if (!parsed.success) {
                  console.warn(`[SDK:${method}] Unexpected response shape:`, parsed.issues);
                }
              }
              handlers?.next?.(transformResponse ? transformResponse(value) : value);
            },
            complete: handlers?.complete,
          }),
        then: (onfulfilled) =>
          stream.then((value) => {
            if (responseSchema !== undefined) {
              const parsed = safeParse(responseSchema, value);
              if (!parsed.success) {
                console.warn(`[SDK:${method}] Unexpected response shape:`, parsed.issues);
              }
            }
            const transformed = transformResponse ? transformResponse(value) : value;
            return onfulfilled ? onfulfilled(transformed) : (transformed as unknown);
          }),
      } as BridgeStream;
    } catch (error) {
      return this.createErrorStream({
        status_code: 500,
        error: `Failed to invoke method: ${isErrorWithMessage(error) ? error.message : 'Unknown error'}`,
      });
    }
  }
}
