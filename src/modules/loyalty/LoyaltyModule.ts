/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { meetsMinimumVersion, Version } from '../../utils/version';
import { EstimateRewardsRequestSchema, EstimateRewardsResponseSchema } from './schemas';
import { EstimateRewardsRequest, EstimateRewardsResponse } from './types';

/**
 * SDK module for Loyalty features via `JSBridge`.
 *
 * @group Modules
 * @category Loyalty
 *
 * @remarks
 * Provides GrabCoin (Grab Points) reward estimation for items in a transaction.
 * This code must run on the Grab SuperApp's WebView to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { LoyaltyModule } from '@grabjs/superapp-sdk';
 * const loyalty = new LoyaltyModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
 * <script>
 *   const loyalty = new SuperAppSDK.LoyaltyModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class LoyaltyModule extends BaseModule {
  constructor() {
    super('LoyaltyModule');
  }

  static readonly MINIMUM_VERSION: Version = { major: 5, minor: 400, patch: 0 }; // TBD: confirm with native team

  /**
   * Estimates the GrabCoin rewards for a list of items.
   *
   * @minimumGrabAppVersion Android: TBD, iOS: TBD
   *
   * @requiredOAuthScope mobile.loyalty
   *
   * @param request - Request containing the list of items to estimate rewards for.
   *
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): Estimation successful. The `result` contains {@link EstimateRewardsResult}.
   *   Each item in `result.items` has its own `status_code`: `SUCCESS` or `NOT_APPLICABLE`.
   * - `400` (Bad Request): Invalid request parameters (for example, empty items array or missing fields).
   * - `403` (Forbidden): Client is not authorized to estimate GrabCoin rewards.
   * - `426` (Upgrade Required): Feature requires a minimum Grab app version.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
   * ```typescript
   * import { LoyaltyModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * const loyalty = new LoyaltyModule();
   *
   * const response = await loyalty.estimateRewards({
   *   items: [
   *     { id: 'trip-456', amount_in_minor_units: 75000, currency_code: 'SGD' },
   *     { id: 'trip-789', amount_in_minor_units: 25000000, currency_code: 'IDR' },
   *   ],
   * });
   *
   * if (isSuccess(response) && response.status_code === 200) {
   *   for (const item of response.result.items) {
   *     if (item.status_code === 'SUCCESS') {
   *       console.log(`${item.id}: ${item.result.reward.display_amount} GrabPoints`);
   *     } else {
   *       console.log(`${item.id}: not applicable (${item.reason_code})`);
   *     }
   *   }
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * }
   * ```
   *
   * @public
   */
  async estimateRewards(request: EstimateRewardsRequest): Promise<EstimateRewardsResponse> {
    const supportError = this.checkSupport((appInfo) =>
      meetsMinimumVersion(appInfo.version, LoyaltyModule.MINIMUM_VERSION)
    );
    if (supportError) return supportError;

    const requestError = this.validate(EstimateRewardsRequestSchema, request);
    if (requestError) return { status_code: 400, error: requestError };

    const response = (await this.invoke({
      method: 'estimateRewards',
      params: request,
    })) as EstimateRewardsResponse;

    const responseError = this.validate(EstimateRewardsResponseSchema, response);
    if (responseError)
      this.logger.warn('estimateRewards', `Unexpected response shape: ${responseError}`);

    return response;
  }
}
