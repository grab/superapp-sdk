/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import bridgeSDK from "@grabjs/mobile-kit-bridge-sdk";

export class ProfileModule {
  constructor() {
    if (!window.WrappedProfileModule) {
      bridgeSDK.wrapModule(window, 'ProfileModule');
    }
  }

  static parseGrabUserAgent(userAgent) {
    if (!userAgent || typeof userAgent !== "string") {
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
    const userAgentInfo = ProfileModule.parseGrabUserAgent(
      window.navigator.userAgent
    );
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
        error: "This feature requires Grab app version 5.399 or above.",
      });
    }
    return window.WrappedProfileModule.invoke('fetchEmail');
  }

  verifyEmail(verifyEmailDetails) {
    if (!ProfileModule.isSupported()) {
      return Promise.resolve({
        status_code: 403,
        error: "This feature requires Grab app version 5.399 or above.",
      });
    }
    return window.WrappedProfileModule.invoke('verifyEmail', verifyEmailDetails);
  }
}
