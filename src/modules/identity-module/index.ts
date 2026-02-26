/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import IdentityModule from './IdentityModule';

export default IdentityModule;

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
} from './types';
