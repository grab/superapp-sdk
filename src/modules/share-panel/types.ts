/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Request parameters for opening the Share Panel.
 *
 * @group Modules
 * @category Share Panel
 * @public
 */
export type OpenSharePanelRequest = {
  /** Complete nonblank share text, limited to 2,000 UTF-16 code units. */
  content: string;
  /** Optional source identifier matching `[a-z0-9_]{1,64}`. */
  triggerSource?: string;
  /**
   * Whether individual recipients are requested. Defaults to `false`.
   * Availability depends on client authorization.
   */
  enableIndividualRecipients?: boolean;
  /**
   * Whether group recipients are requested. Defaults to `false`.
   * Availability depends on client authorization.
   */
  enableGroupRecipients?: boolean;
};

/**
 * Successful terminal result from the Share Panel.
 *
 * @group Modules
 * @category Share Panel
 * @public
 */
export type OpenSharePanelResult =
  | { outcome: 'target_selected' }
  | { outcome: 'recipients_selected' };

/**
 * Response from opening the Share Panel.
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
  | SDKErrorResponse<426>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
