/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { SplashScreenBridgeModule } from './SplashScreenBridgeModule';
import { DismissSplashScreenResponse } from './types';

const GRAB_UA = 'Grab/5.256.0 (iPhone; iOS 16.0)';
const NON_GRAB_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124';

function stubWindowBridge(mockInvoke: ReturnType<typeof vi.fn>): void {
  (
    window as unknown as Record<string, { invoke: typeof mockInvoke }>
  ).WrappedSplashScreenBridgeModule = { invoke: mockInvoke };
}

describe('SplashScreenBridgeModule', () => {
  describe('dismiss', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedSplashScreenBridgeModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', { userAgent: NON_GRAB_UA });

      const module = new SplashScreenBridgeModule();
      const response = await module.dismiss();

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it.each<
      Readonly<{
        name: string;
        mock: DismissSplashScreenResponse;
      }>
    >([
      {
        name: '204 when splash dismissed or not shown',
        mock: { status_code: 204 },
      },
      {
        name: '400 on invalid input',
        mock: {
          status_code: 400,
          error: 'InvalidInput: client input not valid',
        },
      },
      {
        name: '403 when scope not consented',
        mock: {
          status_code: 403,
          error: 'NoAccess: client requesting for not consented scope',
        },
      },
    ])('should return $name', async (row: { name: string; mock: DismissSplashScreenResponse }) => {
      vi.stubGlobal('navigator', { userAgent: GRAB_UA });

      const mockInvoke = vi.fn().mockResolvedValue(row.mock);
      stubWindowBridge(mockInvoke);

      const module = new SplashScreenBridgeModule();
      const response = await module.dismiss();

      expect(mockInvoke).toHaveBeenCalledWith('dismiss', undefined);
      expect(response).toEqual(row.mock);
    });

    it('should return 500 when the bridge throws', async () => {
      vi.stubGlobal('navigator', { userAgent: GRAB_UA });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });
      stubWindowBridge(mockInvoke);

      const module = new SplashScreenBridgeModule();
      const response = await module.dismiss();

      expect(mockInvoke).toHaveBeenCalledWith('dismiss', undefined);
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method: Unexpected bridge error');
      }
    });
  });
});
