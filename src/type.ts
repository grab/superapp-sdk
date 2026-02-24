import * as importedBridgeSDK from '@grabjs/mobile-kit-bridge-sdk';

declare global {
  interface Window {
    /**
     * Wrapped Container Module interface for invoking native container operations
     */
    WrappedContainerModule: {
      /**
       * Invokes a native container module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: <T = any>(method: string, params?: any) => Promise<WrappedResponse<T>>;
    };
    /**
     * Bridge SDK instance available in the window object
     */
    BridgeSDK?: typeof importedBridgeSDK;
  }
}

/**
 * Native response from the bridge SDK
 * Universal response format for all native modules
 */
export type WrappedResponse<T> =
  | {
      /**
       * Error message if the operation failed
       */
      error?: undefined;
      /**
       * Result data if the operation succeeded
       */
      result: T;
      /**
       * HTTP status code indicating the result of the operation
       */
      status_code: 200;
    }
  | {
      /**
       * Error message if the operation failed
       */
      error?: undefined;
      /**
       * Result data if the operation succeeded
       */
      result?: undefined;
      /**
       * HTTP status code indicating the result of the operation
       */
      status_code: 204;
    }
  | {
      /**
       * Error message if the operation failed
       */
      error: string;
      /**
       * Result data if the operation succeeded
       */
      result?: undefined;
      /**
       * HTTP status code indicating the result of the operation
       */
      status_code: 400 | 403 | 424 | 500;
    };