/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContainerModule from './ContainerModule';

export default ContainerModule;

export {
  ContainerAnalyticsEventState,
  ContainerAnalyticsEventName,
  ContainerAnalyticsEventData,
} from './types';

export type {
  // Response types
  SetBackgroundColorResponse,
  SetBackgroundColorSuccessResponse,
  SetBackgroundColorErrorResponse,
  SetTitleResponse,
  SetTitleSuccessResponse,
  SetTitleErrorResponse,
  HideBackButtonResponse,
  HideBackButtonSuccessResponse,
  HideBackButtonErrorResponse,
  ShowBackButtonResponse,
  ShowBackButtonSuccessResponse,
  ShowBackButtonErrorResponse,
  HideRefreshButtonResponse,
  HideRefreshButtonSuccessResponse,
  HideRefreshButtonErrorResponse,
  ShowRefreshButtonResponse,
  ShowRefreshButtonSuccessResponse,
  ShowRefreshButtonErrorResponse,
  CloseResponse,
  CloseSuccessResponse,
  CloseErrorResponse,
  OnContentLoadedResponse,
  OnContentLoadedSuccessResponse,
  OnContentLoadedErrorResponse,
  ShowLoaderResponse,
  ShowLoaderSuccessResponse,
  ShowLoaderErrorResponse,
  HideLoaderResponse,
  HideLoaderSuccessResponse,
  HideLoaderErrorResponse,
  OpenExternalLinkResponse,
  OpenExternalLinkSuccessResponse,
  OpenExternalLinkErrorResponse,
  OnCtaTapResponse,
  OnCtaTapSuccessResponse,
  OnCtaTapErrorResponse,
  SendAnalyticsEventResponse,
  SendAnalyticsEventSuccessResponse,
  SendAnalyticsEventErrorResponse,
  IsConnectedResponse,
  IsConnectedSuccessResponse,
  IsConnectedErrorResponse,
  GetSessionParamsResponse,
  GetSessionParamsSuccessResponse,
  GetSessionParamsErrorResponse,
  AnalyticsEventDetails,
} from './types';
