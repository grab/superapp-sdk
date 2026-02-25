/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Modules
// -------

// CameraModule
export { default as CameraModule } from './modules/CameraModule';
export type {
  // ScanQRCode
  ScanQRCodeRequest,
  ScanQRCodeResponse,
  ScanQRCodeResult,
} from './modules/CameraModule';

// CheckoutModule
export { default as CheckoutModule } from './modules/CheckoutModule';
export type {
  // TriggerCheckout
  TriggerCheckoutRequest,
  TriggerCheckoutResponse,
  TriggerCheckoutResult,
} from './modules/CheckoutModule';

// ContainerModule
export { default as ContainerModule } from './modules/ContainerModule';
export type { AnalyticsEventDetails } from './modules/ContainerModule';
export {
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
  ContainerAnalyticsEventData,
} from './modules/ContainerModule';

// IdentityModule
export { default as IdentityModule } from './modules/IdentityModule';
export type {
  // Authorize
  AuthorizeRequest,
  Environment,
  ResponseMode,
  AuthorizeResponse,

  // GetAuthorizationArtifacts
  GetAuthorizationArtifactsResponse,
  AuthorizationArtifactsResult,

  // ClearAuthorizationArtifacts
  ClearAuthorizationArtifactsResponse,
} from './modules/IdentityModule';

// LocaleModule
export { default as LocaleModule } from './modules/LocaleModule';
export type {
  // GetLanguageLocaleIdentifier
  GetLanguageLocaleIdentifierResponse,
  GetLanguageLocaleIdentifierResult,
} from './modules/LocaleModule';

// LocationModule
export { default as LocationModule } from './modules/LocationModule';
export type {
  // GetCoordinate
  GetCoordinateResponse,
  GetCoordinateResult,

  // GetCountryCode
  GetCountryCodeResponse,
  GetCountryCodeResult,
} from './modules/LocationModule';

// MediaModule
export { default as MediaModule } from './modules/MediaModule';
export type {
  // PlayDRMContent
  PlayDRMContentRequest,
  PlayDRMContentResponse,
  PlaybackStatusResult,
  PlaybackEventType,
} from './modules/MediaModule';

// PlatformModule
export { default as PlatformModule } from './modules/PlatformModule';
export type {
  // Back
  BackResponse,
} from './modules/PlatformModule';

// ProfileModule
export { default as ProfileModule } from './modules/ProfileModule';
export type {
  // FetchEmail
  FetchEmailResponse,
  EmailResult,

  // VerifyEmail
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyEmailResult,
} from './modules/ProfileModule';

// ScopeModule
export { default as ScopeModule } from './modules/ScopeModule';
export type {
  // HasAccessTo
  HasAccessToResponse,

  // ReloadScopes
  ReloadScopesResponse,
} from './modules/ScopeModule';

// StorageModule
export { default as StorageModule } from './modules/StorageModule';
export type {
  // SetXXX
  SetResponse,

  // GetBoolean
  GetBooleanResponse,

  // GetInt
  GetIntResponse,

  // GetString
  GetStringResponse,

  // GetDouble
  GetDoubleResponse,

  // Remove
  RemoveResponse,

  // RemoveAll
  RemoveAllResponse,
} from './modules/StorageModule';

// SystemWebViewKitModule
export { default as SystemWebViewKitModule } from './modules/SystemWebViewKitModule';
export type {
  // RedirectToSystemWebView
  RedirectToSystemWebViewRequest,
  RedirectToSystemWebViewResponse,
} from './modules/SystemWebViewKitModule';

// Core
// ----

// WrappedResponse
export type { WrappedResponse } from './core/types';
