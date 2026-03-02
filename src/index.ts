/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @grabjs/superapp-sdk - SDK for Grab SuperApp WebView.
 *
 * Use the module classes (e.g. CameraModule, IdentityModule) to interact with
 * native capabilities from miniapps running in the Grab app webview.
 */

// Core
// ----

// Logger
export type { LoggerConfig } from './core';
export { Logger, logger, LogLevel } from './core';

// Response types
export type { ErrorResponse, NoResultResponse, Response, SuccessResponse } from './core';

// Utils (environment detection)
export type { GrabUserAgent, Version } from './utils';
export {
  isGrabAppConnected,
  isVersionBelow,
  meetsMinimumVersion,
  parseGrabUserAgent,
} from './utils';

// Modules
// -------

// CameraModule
export type {
  ScanQRCodeCancelledResponse,
  ScanQRCodeErrorResponse,
  // ScanQRCode
  ScanQRCodeRequest,
  ScanQRCodeResponse,
  ScanQRCodeResult,
  ScanQRCodeSuccessResponse,
} from './modules/camera';
export { default as CameraModule } from './modules/camera';

// CheckoutModule
export type {
  TriggerCheckoutErrorResponse,
  // TriggerCheckout
  TriggerCheckoutRequest,
  TriggerCheckoutResponse,
  TriggerCheckoutResult,
  TriggerCheckoutSuccessResponse,
} from './modules/checkout';
export { default as CheckoutModule } from './modules/checkout';

// ContainerModule
export type {
  AnalyticsEventDetails,
  CloseErrorResponse,
  CloseResponse,
  CloseSuccessResponse,
  GetSessionParamsErrorResponse,
  GetSessionParamsResponse,
  GetSessionParamsSuccessResponse,
  HideBackButtonErrorResponse,
  HideBackButtonResponse,
  HideBackButtonSuccessResponse,
  HideLoaderErrorResponse,
  HideLoaderResponse,
  HideLoaderSuccessResponse,
  HideRefreshButtonErrorResponse,
  HideRefreshButtonResponse,
  HideRefreshButtonSuccessResponse,
  IsConnectedErrorResponse,
  IsConnectedResponse,
  IsConnectedSuccessResponse,
  OnContentLoadedErrorResponse,
  OnContentLoadedResponse,
  OnContentLoadedSuccessResponse,
  OnCtaTapErrorResponse,
  OnCtaTapResponse,
  OnCtaTapSuccessResponse,
  OpenExternalLinkErrorResponse,
  OpenExternalLinkResponse,
  OpenExternalLinkSuccessResponse,
  SendAnalyticsEventErrorResponse,
  SendAnalyticsEventResponse,
  SendAnalyticsEventSuccessResponse,
  SetBackgroundColorErrorResponse,
  // Response types (referenced by ContainerModule methods)
  SetBackgroundColorResponse,
  SetBackgroundColorSuccessResponse,
  SetTitleErrorResponse,
  SetTitleResponse,
  SetTitleSuccessResponse,
  ShowBackButtonErrorResponse,
  ShowBackButtonResponse,
  ShowBackButtonSuccessResponse,
  ShowLoaderErrorResponse,
  ShowLoaderResponse,
  ShowLoaderSuccessResponse,
  ShowRefreshButtonErrorResponse,
  ShowRefreshButtonResponse,
  ShowRefreshButtonSuccessResponse,
} from './modules/container';
export {
  ContainerAnalyticsEventData,
  ContainerAnalyticsEventName,
  ContainerAnalyticsEventState,
  default as ContainerModule,
} from './modules/container';

// IdentityModule
export type {
  AuthorizationArtifactsResult,
  AuthorizeCancelledResponse,
  AuthorizeErrorResponse,
  AuthorizeRedirectResponse,
  // Authorize
  AuthorizeRequest,
  AuthorizeResponse,
  AuthorizeResult,
  AuthorizeSuccessResponse,
  // ClearAuthorizationArtifacts
  ClearAuthorizationArtifactsResponse,
  ClearAuthorizationArtifactsSuccessResponse,
  Environment,
  GetAuthorizationArtifactsErrorResponse,
  GetAuthorizationArtifactsNoResultResponse,
  // GetAuthorizationArtifacts
  GetAuthorizationArtifactsResponse,
  GetAuthorizationArtifactsSuccessResponse,
  ResponseMode,
} from './modules/identity';
export { default as IdentityModule } from './modules/identity';

// LocaleModule
export type {
  GetLanguageLocaleIdentifierErrorResponse,
  // GetLanguageLocaleIdentifier
  GetLanguageLocaleIdentifierResponse,
  GetLanguageLocaleIdentifierResult,
  GetLanguageLocaleIdentifierSuccessResponse,
} from './modules/locale';
export { default as LocaleModule } from './modules/locale';

// LocationModule
export type {
  GetCoordinateErrorResponse,
  // GetCoordinate
  GetCoordinateResponse,
  GetCoordinateResult,
  GetCoordinateSuccessResponse,
  GetCountryCodeErrorResponse,
  GetCountryCodeNoResultResponse,
  // GetCountryCode
  GetCountryCodeResponse,
  GetCountryCodeResult,
  GetCountryCodeSuccessResponse,
} from './modules/location';
export { default as LocationModule } from './modules/location';

// MediaModule
export type {
  PlaybackEventType,
  PlaybackStatusResult,
  PlayDRMContentErrorResponse,
  // PlayDRMContent
  PlayDRMContentRequest,
  PlayDRMContentResponse,
  PlayDRMContentSuccessResponse,
} from './modules/media';
export { default as MediaModule, PLAYBACK_EVENT_TYPES } from './modules/media';

// PlatformModule
export type {
  BackErrorResponse,
  // Back
  BackResponse,
  BackSuccessResponse,
} from './modules/platform';
export { default as PlatformModule } from './modules/platform';

// ProfileModule
export type {
  EmailResult,
  FetchEmailErrorResponse,
  FetchEmailNoResultResponse,
  // FetchEmail
  FetchEmailResponse,
  FetchEmailSuccessResponse,
  VerifyEmailCancelledResponse,
  VerifyEmailErrorResponse,
  // VerifyEmail
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyEmailResult,
  VerifyEmailSuccessResponse,
} from './modules/profile';
export { default as ProfileModule } from './modules/profile';

// ScopeModule
export type {
  HasAccessToErrorResponse,
  // HasAccessTo
  HasAccessToResponse,
  HasAccessToSuccessResponse,
  ReloadScopesErrorResponse,
  // ReloadScopes
  ReloadScopesResponse,
  ReloadScopesSuccessResponse,
} from './modules/scope';
export { default as ScopeModule } from './modules/scope';

// StorageModule
export type {
  GetBooleanErrorResponse,
  GetBooleanNoResultResponse,
  // GetBoolean
  GetBooleanResponse,
  GetBooleanSuccessResponse,
  GetDoubleErrorResponse,
  GetDoubleNoResultResponse,
  // GetDouble
  GetDoubleResponse,
  GetDoubleSuccessResponse,
  GetIntErrorResponse,
  GetIntNoResultResponse,
  // GetInt
  GetIntResponse,
  GetIntSuccessResponse,
  GetStringErrorResponse,
  GetStringNoResultResponse,
  // GetString
  GetStringResponse,
  GetStringSuccessResponse,
  RemoveAllErrorResponse,
  // RemoveAll
  RemoveAllResponse,
  RemoveAllSuccessResponse,
  RemoveErrorResponse,
  // Remove
  RemoveResponse,
  RemoveSuccessResponse,
  SetErrorResponse,
  // SetXXX
  SetResponse,
  SetSuccessResponse,
} from './modules/storage';
export { default as StorageModule } from './modules/storage';

// SystemWebViewKitModule
export type {
  RedirectToSystemWebViewErrorResponse,
  // RedirectToSystemWebView
  RedirectToSystemWebViewRequest,
  RedirectToSystemWebViewResponse,
  RedirectToSystemWebViewSuccessResponse,
} from './modules/system-web-view-kit';
export { default as SystemWebViewKitModule } from './modules/system-web-view-kit';
