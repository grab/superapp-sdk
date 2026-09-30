/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { OpenSharePanelRequestSchema, OpenSharePanelResponseSchema } from './schemas';
import type { OpenSharePanelRequest, OpenSharePanelResponse } from './types';

/**
 * SDK module for presenting the native Grab Share Panel.
 *
 * @group Modules
 * @category Share Panel
 *
 * @remarks
 * Presents the platform Share Panel and reports external-target selection, native-recipient
 * selection, or dismissal.
 * This code must run in the Grab SuperApp WebView to invoke native functionality.
 *
 * @example
 * ```typescript
 * import { SharePanelModule } from '@grabjs/superapp-sdk';
 * const sharePanel = new SharePanelModule();
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class SharePanelModule extends BaseModule {
  constructor() {
    super('SharePanelModule');
  }

  /**
   * Opens the native Grab Share Panel.
   * Requested individual and group recipient capabilities are authorized natively per trusted
   * OAuth client ID through `CXMiniAppSharePanelModule`; they do not use additional OAuth scopes.
   *
   * @requiredOAuthScope mobile.share_panel
   *
   * @param request - Share content and optional presentation configuration.
   *
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): A target or native recipient was selected.
   * - `204` (No Content): The panel was dismissed before a selection.
   * - `400` (Bad Request): The request failed validation.
   * - `403` (Forbidden): The client is not authorized to open the Share Panel.
   * - `424` (Failed Dependency): A native dependency failed while presenting the panel.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires the Grab app environment.
   *
   * @example
   * ```typescript
   * import { isError, SharePanelModule } from '@grabjs/superapp-sdk';
   *
   * const sharePanel = new SharePanelModule();
   * const response = await sharePanel.open({
   *   content: 'Join me on Grab. https://referral.grab.com/referral',
   *   triggerSource: 'referral_miniapp',
   *   enableIndividualRecipients: true,
   *   enableGroupRecipients: true,
   * });
   *
   * if (response.status_code === 204) {
   *   return;
   * }
   *
   * if (response.status_code === 200) {
   *   console.log(response.result.outcome);
   * } else if (isError(response)) {
   *   console.error(`Share failed: ${response.error}`);
   * }
   * ```
   *
   * @public
   */
  async open(request: OpenSharePanelRequest): Promise<OpenSharePanelResponse> {
    const requestError = this.validate(OpenSharePanelRequestSchema, request);
    if (requestError) return { status_code: 400, error: requestError };

    const normalizedRequest: OpenSharePanelRequest = {
      ...request,
      enableIndividualRecipients: request.enableIndividualRecipients ?? false,
      enableGroupRecipients: request.enableGroupRecipients ?? false,
    };

    const response = (await this.invoke({
      method: 'open',
      params: normalizedRequest,
    })) as OpenSharePanelResponse;

    const responseError = this.validate(OpenSharePanelResponseSchema, response);
    if (responseError) this.logger.warn('open', `Unexpected response shape: ${responseError}`);

    return response;
  }
}
