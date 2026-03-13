/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { detectGrabApp, isAndroid, isIOS, isRunningInGrabApp } from './platform';
import { GrabAppInfo } from './types';

describe('platform utilities', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('detectGrabApp', () => {
    it('should return null when window is undefined', () => {
      vi.stubGlobal('window', undefined);
      expect(detectGrabApp()).toBeNull();
    });

    it('should return null when navigator is undefined', () => {
      vi.stubGlobal('window', {});
      expect(detectGrabApp()).toBeNull();
    });

    it('should return null when userAgent is empty string', () => {
      vi.stubGlobal('window', { navigator: { userAgent: '' } });
      expect(detectGrabApp()).toBeNull();
    });

    it('should return null when userAgent is undefined', () => {
      vi.stubGlobal('window', { navigator: { userAgent: undefined } });
      expect(detectGrabApp()).toBeNull();
    });

    it('should return null when userAgent is a non-string truthy value', () => {
      // Test defensive code - number as userAgent is truthy but not a string
      vi.stubGlobal('window', { navigator: { userAgent: 123 as unknown as string } });
      expect(detectGrabApp()).toBeNull();
    });

    it('should return null for non-Grab browser user agents', () => {
      const nonGrabUserAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
        'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 Chrome/91.0.4472.120',
      ];

      for (const userAgent of nonGrabUserAgents) {
        vi.stubGlobal('navigator', { userAgent });
        expect(detectGrabApp()).toBeNull();
      }
    });

    it('should extract info from various Grab app user agents', () => {
      const testCases: Array<{
        userAgent: string;
        expected: GrabAppInfo;
      }> = [
        {
          userAgent: 'Grab/5.396.0 (iPhone; iOS 16.0)',
          expected: {
            appName: 'Grab',
            version: { major: 5, minor: 396, patch: 0 },
            platform: 'iOS',
          },
        },
        {
          userAgent: 'Grab/5.396.0 (Android 13; SM-G998B)',
          expected: {
            appName: 'Grab',
            version: { major: 5, minor: 396, patch: 0 },
            platform: 'Android',
          },
        },
        {
          userAgent: 'GrabBeta/5.396.0 (iPhone; iOS 16.0)',
          expected: {
            appName: 'GrabBeta',
            version: { major: 5, minor: 396, patch: 0 },
            platform: 'iOS',
          },
        },
        {
          userAgent: 'GrabBetaDebug/5.396.0 (Android 14; Pixel 7)',
          expected: {
            appName: 'GrabBetaDebug',
            version: { major: 5, minor: 396, patch: 0 },
            platform: 'Android',
          },
        },
        {
          userAgent: 'GrabTaxi/5.396.0 (iPhone; iOS 16.0)',
          expected: {
            appName: 'GrabTaxi',
            version: { major: 5, minor: 396, patch: 0 },
            platform: 'iOS',
          },
        },
        {
          userAgent: 'GrabEarlyAccess/5.396.0 (Android 12; Samsung Galaxy S21)',
          expected: {
            appName: 'GrabEarlyAccess',
            version: { major: 5, minor: 396, patch: 0 },
            platform: 'Android',
          },
        },
      ];

      for (const { userAgent, expected } of testCases) {
        vi.stubGlobal('navigator', { userAgent });
        expect(detectGrabApp()).toEqual(expected);
      }
    });

    it('should handle various version formats', () => {
      const testCases = [
        {
          userAgent: 'Grab/v5.396.0 (iPhone; iOS 16.0)',
          expectedVersion: { major: 5, minor: 396, patch: 0 },
        },
        {
          userAgent: 'Grab/10.999.100 (iPhone; iOS 20.5)',
          expectedVersion: { major: 10, minor: 999, patch: 100 },
        },
        {
          userAgent: 'Grab/1.0.0 (Android 10; Device)',
          expectedVersion: { major: 1, minor: 0, patch: 0 },
        },
      ];

      for (const { userAgent, expectedVersion } of testCases) {
        vi.stubGlobal('navigator', { userAgent });
        expect(detectGrabApp()?.version).toEqual(expectedVersion);
      }
    });

    it('should handle various platform and device formats', () => {
      const testCases = [
        { userAgent: 'Grab/5.396.0 (iPad; iOS 16.0)', expectedPlatform: 'iOS' },
        {
          userAgent: 'Grab/5.396.0 (Android 13; SM-G998B; Build/TP1A.220624.014)',
          expectedPlatform: 'Android',
        },
        { userAgent: 'Grab/5.396.0 (iPhone; iOS 14.0)', expectedPlatform: 'iOS' },
        { userAgent: 'Grab/5.396.0 (iPhone; iOS 15.5)', expectedPlatform: 'iOS' },
        { userAgent: 'Grab/5.396.0 (iPhone; iOS 16.0.1)', expectedPlatform: 'iOS' },
        { userAgent: 'Grab/5.396.0 (iPhone; iOS 17 Beta)', expectedPlatform: 'iOS' },
        { userAgent: 'Grab/5.396.0 (Android 10)', expectedPlatform: 'Android' },
        { userAgent: 'Grab/5.396.0 (Android 11)', expectedPlatform: 'Android' },
        { userAgent: 'Grab/5.396.0 (Android 12)', expectedPlatform: 'Android' },
        { userAgent: 'Grab/5.396.0 (Android 13; SM-G998B)', expectedPlatform: 'Android' },
        { userAgent: 'Grab/5.396.0 (Android 14; Pixel 7)', expectedPlatform: 'Android' },
      ];

      for (const { userAgent, expectedPlatform } of testCases) {
        vi.stubGlobal('navigator', { userAgent });
        expect(detectGrabApp()?.platform).toBe(expectedPlatform);
      }
    });

    it('should return null for invalid formats', () => {
      const invalidUserAgents = [
        { userAgent: 'Grab/5.396 (iPhone; iOS 16.0)', reason: 'missing patch version' },
        { userAgent: 'Grab/5 (iPhone; iOS 16.0)', reason: 'incomplete version' },
        { userAgent: 'Grab/a.b.c (iPhone; iOS 16.0)', reason: 'non-numeric version' },
        { userAgent: 'Grab/5.396.0 (Windows 10; Desktop)', reason: 'unsupported platform' },
        { userAgent: 'Grab/5.396.0 (Linux; Ubuntu)', reason: 'unsupported platform' },
      ];

      for (const { userAgent } of invalidUserAgents) {
        vi.stubGlobal('navigator', { userAgent });
        expect(detectGrabApp()).toBeNull();
      }
    });

    it('should be case-insensitive for app names', () => {
      const testCases = [
        { userAgent: 'GRAB/5.396.0 (iPhone; iOS 16.0)', expectedAppName: 'GRAB' },
        { userAgent: 'grab/5.396.0 (Android 12; Device)', expectedAppName: 'grab' },
      ];

      for (const { userAgent, expectedAppName } of testCases) {
        vi.stubGlobal('navigator', { userAgent });
        expect(detectGrabApp()?.appName).toBe(expectedAppName);
      }
    });
  });

  describe('isAndroid', () => {
    it('should correctly identify Android platform', () => {
      const testCases: Array<{ appName: GrabAppInfo['appName']; expected: boolean }> = [
        { appName: 'Grab', expected: true },
        { appName: 'GrabBeta', expected: true },
        { appName: 'GrabTaxi', expected: true },
      ];

      for (const { appName, expected } of testCases) {
        const appInfo: GrabAppInfo = {
          appName,
          version: { major: 5, minor: 396, patch: 0 },
          platform: 'Android',
        };
        expect(isAndroid(appInfo)).toBe(expected);
      }
    });

    it('should return false for iOS platform', () => {
      const appInfo: GrabAppInfo = {
        appName: 'Grab',
        version: { major: 5, minor: 396, patch: 0 },
        platform: 'iOS',
      };
      expect(isAndroid(appInfo)).toBe(false);
    });
  });

  describe('isIOS', () => {
    it('should correctly identify iOS platform', () => {
      const testCases: Array<{ appName: GrabAppInfo['appName']; expected: boolean }> = [
        { appName: 'Grab', expected: true },
        { appName: 'GrabBeta', expected: true },
        { appName: 'GrabTaxi', expected: true },
      ];

      for (const { appName, expected } of testCases) {
        const appInfo: GrabAppInfo = {
          appName,
          version: { major: 5, minor: 396, patch: 0 },
          platform: 'iOS',
        };
        expect(isIOS(appInfo)).toBe(expected);
      }
    });

    it('should return false for Android platform', () => {
      const appInfo: GrabAppInfo = {
        appName: 'Grab',
        version: { major: 5, minor: 396, patch: 0 },
        platform: 'Android',
      };
      expect(isIOS(appInfo)).toBe(false);
    });
  });

  describe('isRunningInGrabApp', () => {
    it('should return true when running in a Grab app', () => {
      vi.stubGlobal('navigator', { userAgent: 'Grab/5.396.0 (iPhone; iOS 16.0)' });
      expect(isRunningInGrabApp()).toBe(true);
    });

    it('should return false when not running in a Grab app', () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0',
      });
      expect(isRunningInGrabApp()).toBe(false);
    });

    it('should return false when environment is not available', () => {
      vi.stubGlobal('window', undefined);
      expect(isRunningInGrabApp()).toBe(false);
    });
  });
});
