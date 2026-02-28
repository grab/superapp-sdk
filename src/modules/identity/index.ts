/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import IdentityModule from './IdentityModule';

export default IdentityModule;

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
} from './types';
