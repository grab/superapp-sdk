/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

export { BaseModule } from './core/module';
export {
  BridgeResponse,
  BridgeSuccessResponse,
  BridgeNoResultResponse,
  BridgeErrorResponse,
} from './core/response';
export { DataStream, DataStreamHandlers, Subscription } from './core/stream';
export { CameraModule } from './modules/camera/CameraModule';
export type {
  ScanQRCodeRequest,
  ScanQRCodeResponse,
  ScanQRCodeResult,
} from './modules/camera/types';
export { CheckoutModule } from './modules/checkout/CheckoutModule';
export type {
  TriggerCheckoutRequest,
  TriggerCheckoutResponse,
  TriggerCheckoutResult,
} from './modules/checkout/types';
export { ContainerModule } from './modules/container/ContainerModule';
export {
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
  ContainerAnalyticsEventData,
} from './modules/container/constants';
export type {
  SetBackgroundColorRequest,
  SetBackgroundColorResult,
  SetBackgroundColorResponse,
  SetTitleRequest,
  SetTitleResult,
  SetTitleResponse,
  HideBackButtonResult,
  HideBackButtonResponse,
  ShowBackButtonResult,
  ShowBackButtonResponse,
  HideRefreshButtonResult,
  HideRefreshButtonResponse,
  ShowRefreshButtonResult,
  ShowRefreshButtonResponse,
  CloseResult,
  CloseResponse,
  OnContentLoadedResult,
  OnContentLoadedResponse,
  ShowLoaderResult,
  ShowLoaderResponse,
  HideLoaderResult,
  HideLoaderResponse,
  OpenExternalLinkRequest,
  OpenExternalLinkResult,
  OpenExternalLinkResponse,
  OnCtaTapRequest,
  OnCtaTapResult,
  OnCtaTapResponse,
  SendAnalyticsEventRequest,
  SendAnalyticsEventResult,
  SendAnalyticsEventResponse,
  IsConnectedResult,
  IsConnectedResponse,
  GetSessionParamsResult,
  GetSessionParamsResponse,
} from './modules/container/types';
export { IdentityModule } from './modules/identity/IdentityModule';
export type {
  AuthorizeRequest,
  AuthorizeResponse,
  AuthorizeResult,
  GetAuthorizationArtifactsResponse,
  GetAuthorizationArtifactsResult,
  ClearAuthorizationArtifactsResponse,
  ClearAuthorizationArtifactsResult,
} from './modules/identity/types';
export { ProfileModule } from './modules/profile/ProfileModule';
export type {
  FetchEmailResponse,
  FetchEmailResult,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyEmailResult,
} from './modules/profile/types';
export { LocaleModule } from './modules/locale/LocaleModule';
export type { GetLanguageLocaleIdentifierResponse } from './modules/locale/types';
export { LocationModule } from './modules/location/LocationModule';
export type {
  GetCoordinateResult,
  GetCoordinateResponse,
  ObserveLocationChangeResponse,
  GetCountryCodeResult,
  GetCountryCodeResponse,
} from './modules/location/types';
export { MediaModule } from './modules/media/MediaModule';
export { PlatformModule } from './modules/platform/PlatformModule';
export { ScopeModule } from './modules/scope/ScopeModule';
export type {
  HasAccessToRequest,
  HasAccessToResponse,
  HasAccessToResult,
  ReloadScopesResponse,
  ReloadScopesResult,
} from './modules/scope/types';
export { StorageModule } from './modules/storage/StorageModule';
export type {
  SetBooleanRequest,
  SetBooleanResponse,
  SetBooleanResult,
  GetBooleanRequest,
  GetBooleanResponse,
  GetBooleanResult,
  SetIntRequest,
  SetIntResponse,
  SetIntResult,
  GetIntRequest,
  GetIntResponse,
  GetIntResult,
  SetStringRequest,
  SetStringResponse,
  SetStringResult,
  GetStringRequest,
  GetStringResponse,
  GetStringResult,
  SetDoubleRequest,
  SetDoubleResponse,
  SetDoubleResult,
  GetDoubleRequest,
  GetDoubleResponse,
  GetDoubleResult,
  RemoveRequest,
  RemoveResponse,
  RemoveResult,
  RemoveAllResponse,
  RemoveAllResult,
} from './modules/storage/types';
export { SystemWebViewKitModule } from './modules/system-web-view-kit/SystemWebViewKitModule';
export type {
  RedirectToSystemWebViewRequest,
  RedirectToSystemWebViewResponse,
  RedirectToSystemWebViewResult,
} from './modules/system-web-view-kit/types';
export type { WrappedModule } from './types/global';
