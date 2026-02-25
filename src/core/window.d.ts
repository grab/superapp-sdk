/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as importedBridgeSDK from '@grabjs/mobile-kit-bridge-sdk';
import type { ScanQRCodeRequest, ScanQRCodeResponse } from '../modules/CameraModule/type';
import type { TriggerCheckoutRequest, TriggerCheckoutResponse } from '../modules/CheckoutModule/type';
import type { AuthorizeResponse } from '../modules/IdentityModule/type';
import type { LanguageLocaleResponse } from '../modules/LocaleModule/type';
import type { CoordinateResponse, CountryCodeResponse } from '../modules/LocationModule/type';
import type { VideoData, PlayDRMContentResponse } from '../modules/MediaModule/type';
import type { BackResponse } from '../modules/PlatformModule/type';
import type {
  FetchEmailResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '../modules/ProfileModule/type';
import type {
  HasAccessToRequest,
  HasAccessToResponse,
  ReloadScopesResponse,
} from '../modules/ScopeModule/type';
import type {
  SetBooleanRequest,
  SetIntRequest,
  SetStringRequest,
  SetDoubleRequest,
  StorageKeyRequest,
  SetStorageResponse,
  GetBooleanResponse,
  GetIntResponse,
  GetStringResponse,
  GetDoubleResponse,
  RemoveResponse,
  RemoveAllResponse,
} from '../modules/StorageModule/type';
import type {
  RedirectToSystemWebViewRequest,
  RedirectToSystemWebViewResponse,
} from '../modules/SystemWebViewKitModule/type';
import type { WrappedResponse, InvokeFn } from './types';

/**
 * Method map for CameraModule
 */
type CameraModuleMethods = {
  scanQRCode: { params: ScanQRCodeRequest; response: ScanQRCodeResponse };
};

/**
 * Method map for CheckoutModule
 */
type CheckoutModuleMethods = {
  triggerCheckout: { params: TriggerCheckoutRequest; response: TriggerCheckoutResponse };
};

/**
 * Method map for ContainerModule
 */
type ContainerModuleMethods = {
  setBackgroundColor: { params: { backgroundColor: string }; response: WrappedResponse<undefined> };
  setTitle: { params: { title: string }; response: WrappedResponse<undefined> };
  hideBackButton: { params: never; response: WrappedResponse<undefined> };
  showBackButton: { params: never; response: WrappedResponse<undefined> };
  hideRefreshButton: { params: never; response: WrappedResponse<undefined> };
  showRefreshButton: { params: never; response: WrappedResponse<undefined> };
  close: { params: never; response: WrappedResponse<undefined> };
  onContentLoaded: { params: never; response: WrappedResponse<undefined> };
  showLoader: { params: never; response: WrappedResponse<undefined> };
  hideLoader: { params: never; response: WrappedResponse<undefined> };
  openExternalLink: { params: { url: string }; response: WrappedResponse<undefined> };
  onCtaTap: { params: { action: string }; response: WrappedResponse<undefined> };
  sendAnalyticsEvent: {
    params: { state: string; name: string; data: string | null };
    response: WrappedResponse<undefined>;
  };
  getSessionParams: { params: never; response: WrappedResponse<Record<string, unknown>> };
};

/**
 * Method map for IdentityModule
 */
type IdentityModuleMethods = {
  authorize: {
    params: {
      clientId: string;
      redirectUri: string;
      scope: string;
      nonce: string;
      state: string;
      codeChallenge: string;
      codeChallengeMethod: string;
      responseMode: string;
    };
    response: AuthorizeResponse;
  };
};

/**
 * Method map for LocaleModule
 */
type LocaleModuleMethods = {
  getLanguageLocaleIdentifier: { params: never; response: LanguageLocaleResponse };
};

/**
 * Method map for LocationModule
 */
type LocationModuleMethods = {
  getCoordinate: { params: never; response: CoordinateResponse };
  observeLocationChange: { params: never; response: CoordinateResponse };
  getCountryCode: { params: never; response: CountryCodeResponse };
};

/**
 * Method map for MediaModule
 */
type MediaModuleMethods = {
  playDRMContent: { params: { data: VideoData }; response: PlayDRMContentResponse };
};

/**
 * Method map for PlatformModule
 */
type PlatformModuleMethods = {
  back: { params: never; response: BackResponse };
};

/**
 * Method map for ProfileModule
 */
type ProfileModuleMethods = {
  fetchEmail: { params: never; response: FetchEmailResponse };
  verifyEmail: { params: VerifyEmailRequest; response: VerifyEmailResponse };
};

/**
 * Method map for ScopeModule
 */
type ScopeModuleMethods = {
  hasAccessTo: { params: HasAccessToRequest; response: HasAccessToResponse };
  reloadScopes: { params: never; response: ReloadScopesResponse };
};

/**
 * Method map for StorageModule
 */
type StorageModuleMethods = {
  setBoolean: { params: SetBooleanRequest; response: SetStorageResponse };
  getBoolean: { params: StorageKeyRequest; response: GetBooleanResponse };
  setInt: { params: SetIntRequest; response: SetStorageResponse };
  getInt: { params: StorageKeyRequest; response: GetIntResponse };
  setString: { params: SetStringRequest; response: SetStorageResponse };
  getString: { params: StorageKeyRequest; response: GetStringResponse };
  setDouble: { params: SetDoubleRequest; response: SetStorageResponse };
  getDouble: { params: StorageKeyRequest; response: GetDoubleResponse };
  remove: { params: StorageKeyRequest; response: RemoveResponse };
  removeAll: { params: never; response: RemoveAllResponse };
};

/**
 * Method map for SystemWebViewKitModule
 */
type SystemWebViewKitModuleMethods = {
  redirectToSystemWebView: {
    params: RedirectToSystemWebViewRequest;
    response: RedirectToSystemWebViewResponse;
  };
};

declare global {
  interface Window {
    /**
     * Wrapped Camera Module interface for invoking native camera operations
     */
    WrappedCameraModule: {
      /**
       * Invokes a native camera module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: InvokeFn<CameraModuleMethods>;
    };
    /**
     * Wrapped Checkout Module interface for invoking native checkout operations
     */
    WrappedCheckoutModule: {
      /**
       * Invokes a native checkout module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: InvokeFn<CheckoutModuleMethods>;
    };
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
      invoke: InvokeFn<ContainerModuleMethods>;
    };
    /**
     * Wrapped Identity Module interface for invoking native identity operations
     */
    WrappedIdentityModule: {
      /**
       * Invokes a native identity module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: InvokeFn<IdentityModuleMethods>;
    };
    /**
     * Wrapped Locale Module interface for invoking native locale operations
     */
    WrappedLocaleModule: {
      /**
       * Invokes a native locale module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: InvokeFn<LocaleModuleMethods>;
    };
    /**
     * Wrapped Location Module interface for invoking native location operations
     */
    WrappedLocationModule: {
      /**
       * Invokes a native location module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: InvokeFn<LocationModuleMethods>;
    };
    /**
     * Wrapped Media Module interface for invoking native media operations
     */
    WrappedMediaModule: {
      /**
       * Invokes a native media module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: InvokeFn<MediaModuleMethods>;
    };
    /**
     * Wrapped Platform Module interface for invoking native platform operations
     */
    WrappedPlatformModule: {
      /**
       * Invokes a native platform module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: InvokeFn<PlatformModuleMethods>;
    };
    /**
     * Wrapped Profile Module interface for invoking native profile operations
     */
    WrappedProfileModule: {
      /**
       * Invokes a native profile module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: InvokeFn<ProfileModuleMethods>;
    };
    /**
     * Wrapped Scope Module interface for invoking native scope operations
     */
    WrappedScopeModule: {
      /**
       * Invokes a native scope module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: InvokeFn<ScopeModuleMethods>;
    };
    /**
     * Wrapped Storage Module interface for invoking native storage operations
     */
    WrappedStorageModule: {
      /**
       * Invokes a native storage module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: InvokeFn<StorageModuleMethods>;
    };
    /**
     * Wrapped SystemWebViewKit Module interface for invoking native system webview kit operations
     */
    WrappedSystemWebViewKitModule: {
      /**
       * Invokes a native system webview kit module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: InvokeFn<SystemWebViewKitModuleMethods>;
    };
    /**
     * Bridge SDK instance available in the window object
     */
    BridgeSDK?: typeof importedBridgeSDK;
  }
}
