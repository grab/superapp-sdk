/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Request parameters for opening the native Share Panel.
 *
 * @group Modules
 * @category Share Panel
 * @public
 */
export type OpenSharePanelRequest = {
  /** Complete nonblank share text, limited to 2,000 Unicode code points. */
  content: string;
  /** Optional source identifier matching `[a-z0-9_]{1,64}`. */
  triggerSource?: string;
  /**
   * Whether native individual recipients are requested. Defaults to `false`.
   * Native requires the trusted OAuth client ID to be allowlisted by
   * `CXMiniAppSharePanelModule` when this capability is requested.
   */
  enableIndividualRecipients?: boolean;
  /**
   * Whether native group recipients are requested. Defaults to `false`.
   * Native requires the trusted OAuth client ID to be allowlisted by
   * `CXMiniAppSharePanelModule` when this capability is requested.
   */
  enableGroupRecipients?: boolean;
};

/**
 * Successful terminal result from the native Share Panel.
 *
 * @group Modules
 * @category Share Panel
 * @public
 */
export type OpenSharePanelResult =
  | { outcome: 'target_selected' }
  | { outcome: 'recipients_selected' };

/**
 * Response from opening the native Share Panel.
 *
 * @group Modules
 * @category Share Panel
 * @public
 */
export type OpenSharePanelResponse =
  | SDKOkResponse<OpenSharePanelResult>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<403>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
