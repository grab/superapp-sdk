/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { meetsMinimumVersion, Version } from '../../utils/version';
import { OpenSharePanelRequestSchema, OpenSharePanelResponseSchema } from './schemas';
import type { OpenSharePanelRequest, OpenSharePanelResponse } from './types';

/**
 * SDK module for opening the Share Panel.
 *
 * @group Modules
 * @category Share Panel
 *
 * @remarks
 * Presents the Share Panel and reports whether an external target or recipient was selected, or
 * whether the panel was dismissed. This module must be called from the Grab SuperApp WebView.
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

  static readonly MINIMUM_VERSION: Version = { major: 5, minor: 433, patch: 0 };

  /**
   * Opens the Share Panel.
   * Individual and group recipient options do not require additional OAuth scopes, but their
   * availability depends on client authorization.
   *
   * @minimumGrabAppVersion Android: 5.433.0, iOS: 5.433.0
   *
   * @requiredOAuthScope mobile.share_panel
   *
   * @param request - Share content and optional presentation configuration.
   *
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): A target or recipient was selected.
   * - `204` (No Content): The panel was dismissed before a selection.
   * - `400` (Bad Request): The request failed validation.
   * - `403` (Forbidden): The client is not authorized to open the Share Panel.
   * - `424` (Failed Dependency): A dependency failed while presenting the Share Panel.
   * - `426` (Upgrade Required): The Share Panel requires Grab app version 5.433.0 or above.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires the Grab app environment.
   *
   * @example
   * ```typescript
   * import { isError, SharePanelModule } from '@grabjs/superapp-sdk';
   *
   * const sharePanel = new SharePanelModule();
   * const response = await sharePanel.open({
   *   content: 'I found this article useful and thought you might too: https://example.com/article',
   *   triggerSource: 'content_share',
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
    const supportError = this.checkSupport((appInfo) =>
      meetsMinimumVersion(appInfo.version, SharePanelModule.MINIMUM_VERSION)
    );
    if (supportError) return supportError;

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
