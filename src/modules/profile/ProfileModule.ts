/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';

/**
 * JSBridge module for accessing user profile information.
 *
 * @remarks
 * Provides access to user profile data such as email verification.
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { ProfileModule } from '@grabjs/superapp-sdk';
 * const profile = new ProfileModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const profile = new SuperAppSDK.ProfileModule();
 * </script>
 * ```
 *
 * @public
 */
export class ProfileModule extends BaseModule {
  constructor() {
    super('ProfileModule');
  }

  static parseGrabUserAgent(userAgent) {
    if (!userAgent || typeof userAgent !== 'string') {
      return null;
    }

    const match = userAgent.match(
      /(Grab|GrabBeta|GrabBetaDebug|GrabTaxi|GrabEarlyAccess)\/v?([0-9]+)\.([0-9]+)\.([0-9]+) \(.*(Android|iOS).*\)/i
    );
    if (!match) {
      return null;
    }

    return {
      appName: match[1],
      major: Number(match[2]),
      minor: Number(match[3]),
      patch: Number(match[4]),
      platform: match[5],
    };
  }

  static isVersionBelow(current, min) {
    if (current.major !== min.major) {
      return current.major < min.major;
    }
    if (current.minor !== min.minor) {
      return current.minor < min.minor;
    }
    return current.patch < min.patch;
  }

  static isSupported() {
    const userAgentInfo = ProfileModule.parseGrabUserAgent(window.navigator.userAgent);
    if (!userAgentInfo) {
      return false;
    }

    const minimumVersion = { major: 5, minor: 399, patch: 0 };
    return !ProfileModule.isVersionBelow(userAgentInfo, minimumVersion);
  }

  fetchEmail() {
    if (!ProfileModule.isSupported()) {
      return Promise.resolve({
        status_code: 403,
        error: 'This feature requires Grab app version 5.399 or above.',
      });
    }
    return window.WrappedProfileModule!.invoke('fetchEmail');
  }

  verifyEmail(verifyEmailDetails) {
    if (!ProfileModule.isSupported()) {
      return Promise.resolve({
        status_code: 403,
        error: 'This feature requires Grab app version 5.399 or above.',
      });
    }
    return window.WrappedProfileModule!.invoke('verifyEmail', verifyEmailDetails);
  }
}
