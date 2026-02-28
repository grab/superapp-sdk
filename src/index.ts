/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Core
// ----

// Logger
export { logger, Logger, LogLevel } from './core';
export type { LoggerConfig } from './core';

// Response types
export type { Response, ErrorResponse, NoResultResponse, SuccessResponse } from './core';

// Modules
// -------

// CameraModule
export { default as CameraModule } from './modules/camera';
export type {
  // ScanQRCode
  ScanQRCodeRequest,
  ScanQRCodeResponse,
  ScanQRCodeSuccessResponse,
  ScanQRCodeCancelledResponse,
  ScanQRCodeErrorResponse,
  ScanQRCodeResult,
} from './modules/camera';

// CheckoutModule
export { default as CheckoutModule } from './modules/checkout';
export type {
  // TriggerCheckout
  TriggerCheckoutRequest,
  TriggerCheckoutResponse,
  TriggerCheckoutSuccessResponse,
  TriggerCheckoutErrorResponse,
  TriggerCheckoutResult,
} from './modules/checkout';

// ContainerModule
export { default as ContainerModule } from './modules/container';
export type { AnalyticsEventDetails } from './modules/container';
export {
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
  ContainerAnalyticsEventData,
} from './modules/container';

// IdentityModule
export { default as IdentityModule } from './modules/identity';
export type {
  // Authorize
  AuthorizeRequest,
  Environment,
  ResponseMode,
  AuthorizeResponse,
  AuthorizeSuccessResponse,
  AuthorizeRedirectResponse,
  AuthorizeCancelledResponse,
  AuthorizeErrorResponse,
  AuthorizeResult,

  // GetAuthorizationArtifacts
  GetAuthorizationArtifactsResponse,
  GetAuthorizationArtifactsSuccessResponse,
  GetAuthorizationArtifactsNoResultResponse,
  GetAuthorizationArtifactsErrorResponse,
  AuthorizationArtifactsResult,

  // ClearAuthorizationArtifacts
  ClearAuthorizationArtifactsResponse,
  ClearAuthorizationArtifactsSuccessResponse,
} from './modules/identity';

// LocaleModule
export { default as LocaleModule } from './modules/locale';
export type {
  // GetLanguageLocaleIdentifier
  GetLanguageLocaleIdentifierResponse,
  GetLanguageLocaleIdentifierSuccessResponse,
  GetLanguageLocaleIdentifierErrorResponse,
  GetLanguageLocaleIdentifierResult,
} from './modules/locale';

// LocationModule
export { default as LocationModule } from './modules/location';
export type {
  // GetCoordinate
  GetCoordinateResponse,
  GetCoordinateSuccessResponse,
  GetCoordinateErrorResponse,
  GetCoordinateResult,

  // GetCountryCode
  GetCountryCodeResponse,
  GetCountryCodeSuccessResponse,
  GetCountryCodeNoResultResponse,
  GetCountryCodeErrorResponse,
  GetCountryCodeResult,
} from './modules/location';

// MediaModule
export { default as MediaModule } from './modules/media';
export type {
  // PlayDRMContent
  PlayDRMContentRequest,
  PlayDRMContentResponse,
  PlayDRMContentSuccessResponse,
  PlayDRMContentErrorResponse,
  PlaybackStatusResult,
  PlaybackEventType,
} from './modules/media';

// PlatformModule
export { default as PlatformModule } from './modules/platform';
export type {
  // Back
  BackResponse,
  BackSuccessResponse,
  BackErrorResponse,
} from './modules/platform';

// ProfileModule
export { default as ProfileModule } from './modules/profile';
export type {
  // FetchEmail
  FetchEmailResponse,
  FetchEmailSuccessResponse,
  FetchEmailNoResultResponse,
  FetchEmailErrorResponse,
  EmailResult,

  // VerifyEmail
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyEmailSuccessResponse,
  VerifyEmailCancelledResponse,
  VerifyEmailErrorResponse,
  VerifyEmailResult,
} from './modules/profile';

// ScopeModule
export { default as ScopeModule } from './modules/scope';
export type {
  // HasAccessTo
  HasAccessToResponse,
  HasAccessToSuccessResponse,
  HasAccessToErrorResponse,

  // ReloadScopes
  ReloadScopesResponse,
  ReloadScopesSuccessResponse,
  ReloadScopesErrorResponse,
} from './modules/scope';

// StorageModule
export { default as StorageModule } from './modules/storage';
export type {
  // SetXXX
  SetResponse,
  SetSuccessResponse,
  SetErrorResponse,

  // GetBoolean
  GetBooleanResponse,
  GetBooleanSuccessResponse,
  GetBooleanNoResultResponse,
  GetBooleanErrorResponse,

  // GetInt
  GetIntResponse,
  GetIntSuccessResponse,
  GetIntNoResultResponse,
  GetIntErrorResponse,

  // GetString
  GetStringResponse,
  GetStringSuccessResponse,
  GetStringNoResultResponse,
  GetStringErrorResponse,

  // GetDouble
  GetDoubleResponse,
  GetDoubleSuccessResponse,
  GetDoubleNoResultResponse,
  GetDoubleErrorResponse,

  // Remove
  RemoveResponse,
  RemoveSuccessResponse,
  RemoveErrorResponse,

  // RemoveAll
  RemoveAllResponse,
  RemoveAllSuccessResponse,
  RemoveAllErrorResponse,
} from './modules/storage';

// SystemWebViewKitModule
export { default as SystemWebViewKitModule } from './modules/system-web-view-kit';
export type {
  // RedirectToSystemWebView
  RedirectToSystemWebViewRequest,
  RedirectToSystemWebViewResponse,
  RedirectToSystemWebViewSuccessResponse,
  RedirectToSystemWebViewErrorResponse,
} from './modules/system-web-view-kit';
