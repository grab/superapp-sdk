/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Module exports
export { CameraModule } from './modules/CameraModule';
export { CheckoutModule } from './modules/CheckoutModule';
export {
  ContainerModule,
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
  ContainerAnalyticsEventData,
} from './modules/ContainerModule/index';
export { IdentityModule } from './modules/IdentityModule/index';
export { ProfileModule } from './modules/ProfileModule/index';
export { LocaleModule } from './modules/LocaleModule/index';
export { LocationModule } from './modules/LocationModule/index';
export { MediaModule } from './modules/MediaModule/index';
export { PlatformModule } from './modules/PlatformModule/index';
export { ScopeModule } from './modules/ScopeModule/index';
export { StorageModule } from './modules/StorageModule/index';
export { SystemWebViewKitModule } from './modules/SystemWebViewKitModule/index';

// Type exports - Global types
export type { WrappedResponse } from './core/types';

// Type exports - CameraModule
export type { ScanQRCodeResult, ScanQRCodeResponse, ScanQRCodeRequest } from './modules/CameraModule/type';

// Type exports - CheckoutModule
export type {
  TriggerCheckoutRequest,
  TriggerCheckoutResult,
  TriggerCheckoutResponse,
} from './modules/CheckoutModule/type';

// Type exports - ContainerModule
export type { AnalyticsEventDetails } from './modules/ContainerModule/type';

// Type exports - IdentityModule
export type {
  Environment,
  ResponseMode,
  OpenIDConfigEndpoints,
  PKCEArtifacts,
  StoredPKCEArtifacts,
  AuthorizationArtifactsResult,
  GetAuthorizationArtifactsResponse,
  ClearAuthorizationArtifactsResponse,
  GrabUserAgentInfo as IdentityGrabUserAgentInfo,
  VersionInfo as IdentityVersionInfo,
  WebAuthorizationParams,
  NativeAuthorizationParams,
  AuthorizeRequest,
  AuthorizeResponse,
  ShouldUseWebConsentRequest,
} from './modules/IdentityModule/type';

// Type exports - LocationModule
export type {
  CoordinateResult,
  CoordinateResponse,
  CountryCodeResult,
  CountryCodeResponse,
} from './modules/LocationModule/type';

// Type exports - MediaModule
export type {
  VideoData,
  PlaybackEventType,
  PlaybackStatusResult,
  PlayDRMContentResponse,
} from './modules/MediaModule/type';
export { PlaybackEventType as PlaybackEventTypeEnum } from './modules/MediaModule/type';

// Type exports - LocaleModule
export type { LanguageLocaleResult, LanguageLocaleResponse } from './modules/LocaleModule/type';

// Type exports - PlatformModule
export type { BackResponse } from './modules/PlatformModule/type';

// Type exports - ProfileModule
export type {
  GrabUserAgentInfo,
  VersionInfo,
  EmailResult,
  FetchEmailResponse,
  VerifyEmailRequest,
  VerifyEmailResult,
  VerifyEmailResponse,
} from './modules/ProfileModule/type';

// Type exports - ScopeModule
export type {
  HasAccessToRequest,
  HasAccessToResponse,
  ReloadScopesResponse,
} from './modules/ScopeModule/type';

// Type exports - StorageModule
export type {
  StorageKeyRequest,
  SetBooleanRequest,
  SetIntRequest,
  SetStringRequest,
  SetDoubleRequest,
  SetStorageResponse,
  GetBooleanResponse,
  GetIntResponse,
  GetStringResponse,
  GetDoubleResponse,
  RemoveResponse,
  RemoveAllResponse,
} from './modules/StorageModule/type';

// Type exports - SystemWebViewKitModule
export type {
  RedirectToSystemWebViewRequest,
  RedirectToSystemWebViewResponse,
} from './modules/SystemWebViewKitModule/type';
