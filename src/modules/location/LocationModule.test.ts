/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { LocationModule } from './LocationModule';
import { GetCoordinateResponse, GetCountryCodeResponse } from './types';

describe('LocationModule', () => {
  describe('getCoordinate', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedLocationModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new LocationModule();
      const response = await module.getCoordinate();

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 200 with coordinates', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: GetCoordinateResponse = {
        status_code: 200,
        result: { lat: 1.3521, lng: 103.8198 },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedLocationModule = {
        invoke: mockInvoke,
      };

      const module = new LocationModule();
      const response = await module.getCoordinate();

      expect(mockInvoke).toHaveBeenCalledWith('getCoordinate', undefined);
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.lat).toBe(1.3521);
        expect(response.result.lng).toBe(103.8198);
      }
    });

    it('should return 424 when GeoKit error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: GetCoordinateResponse = {
        status_code: 424,
        error: 'GeoKit error',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedLocationModule = {
        invoke: mockInvoke,
      };

      const module = new LocationModule();
      const response = await module.getCoordinate();

      expect(mockInvoke).toHaveBeenCalledWith('getCoordinate', undefined);
      expect(response.status_code).toBe(424);
      if (response.status_code === 424) {
        expect(response.error).toBe('GeoKit error');
      }
    });

    it('should return 500 when an unexpected error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedLocationModule = {
        invoke: mockInvoke,
      };

      const module = new LocationModule();
      const response = await module.getCoordinate();

      expect(mockInvoke).toHaveBeenCalledWith('getCoordinate', undefined);
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });

  describe('getCountryCode', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedLocationModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new LocationModule();
      const response = await module.getCountryCode();

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 200 with Singapore country code', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: GetCountryCodeResponse = {
        status_code: 200,
        result: { countryCode: 'SG' },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedLocationModule = {
        invoke: mockInvoke,
      };

      const module = new LocationModule();
      const response = await module.getCountryCode();

      expect(mockInvoke).toHaveBeenCalledWith('getCountryCode', undefined);
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.countryCode).toBe('SG');
      }
    });

    it('should return 200 with Indonesia country code', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: GetCountryCodeResponse = {
        status_code: 200,
        result: { countryCode: 'ID' },
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedLocationModule = {
        invoke: mockInvoke,
      };

      const module = new LocationModule();
      const response = await module.getCountryCode();

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.countryCode).toBe('ID');
      }
    });

    it('should return 424 when GeoKit/Resolver error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'GrabBeta/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: GetCountryCodeResponse = {
        status_code: 424,
        error: 'GeoKit/Resolver error',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedLocationModule = {
        invoke: mockInvoke,
      };

      const module = new LocationModule();
      const response = await module.getCountryCode();

      expect(mockInvoke).toHaveBeenCalledWith('getCountryCode', undefined);
      expect(response.status_code).toBe(424);
      if (response.status_code === 424) {
        expect(response.error).toBe('GeoKit/Resolver error');
      }
    });

    it('should return 500 when an unexpected error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedLocationModule = {
        invoke: mockInvoke,
      };

      const module = new LocationModule();
      const response = await module.getCountryCode();

      expect(mockInvoke).toHaveBeenCalledWith('getCountryCode', undefined);
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });
});
