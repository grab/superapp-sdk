/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import {
  GrabUserAgentInfo,
  VersionInfo,
  FetchEmailResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from './type';

export class ProfileModule extends ModuleBase {
  constructor() {
    super('ProfileModule');
  }

  /**
   * Parse Grab user agent string to extract app information
   * @param userAgent - User agent string to parse
   * @returns Parsed user agent information or null if invalid
   */
  static parseGrabUserAgent(userAgent: string): GrabUserAgentInfo {
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

  /**
   * Check if current version is below minimum version
   * @param current - Current version information
   * @param min - Minimum required version
   * @returns True if current version is below minimum
   */
  static isVersionBelow(current: VersionInfo, min: VersionInfo): boolean {
    if (current.major !== min.major) {
      return current.major < min.major;
    }
    if (current.minor !== min.minor) {
      return current.minor < min.minor;
    }
    return current.patch < min.patch;
  }

  /**
   * Check if the current Grab app version supports ProfileModule features
   * @returns True if supported (version 5.399 or above)
   */
  static isSupported(): boolean {
    const userAgentInfo = ProfileModule.parseGrabUserAgent(window.navigator.userAgent);
    if (!userAgentInfo) {
      return false;
    }

    const minimumVersion = { major: 5, minor: 399, patch: 0 };
    return !ProfileModule.isVersionBelow(userAgentInfo, minimumVersion);
  }

  /**
   * Fetch user's email address
   * @returns Promise that resolves to email response
   */
  fetchEmail(): Promise<FetchEmailResponse> {
    if (!ProfileModule.isSupported()) {
      return Promise.resolve({
        status_code: 403,
        error: 'This feature requires Grab app version 5.399 or above.',
      });
    }
    return window.WrappedProfileModule.invoke('fetchEmail');
  }

  /**
   * Verify user's email with verification code
   * @param verifyEmailDetails - Email and verification code
   * @returns Promise that resolves to verification response
   */
  verifyEmail(verifyEmailDetails: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    if (!ProfileModule.isSupported()) {
      return Promise.resolve({
        status_code: 403,
        error: 'This feature requires Grab app version 5.399 or above.',
      });
    }
    return window.WrappedProfileModule.invoke('verifyEmail', verifyEmailDetails);
  }
}

export type {
  GrabUserAgentInfo,
  VersionInfo,
  EmailResult,
  FetchEmailResponse,
  VerifyEmailRequest,
  VerifyEmailResult,
  VerifyEmailResponse,
} from './type';
