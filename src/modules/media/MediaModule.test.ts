/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { MediaModule } from './MediaModule';
import { PlayDRMContentResponse } from './types';

describe('MediaModule', () => {
  describe('playDRMContent', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedMediaModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new MediaModule();
      const response = await module.playDRMContent({
        contentId: 'movie-123',
        licenseUrl: 'https://license.example.com/widevine',
        contentUrl: 'https://cdn.example.com/video.mp4',
      });

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 200 when DRM content playback starts successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: PlayDRMContentResponse = {
        status_code: 200,
        result: undefined,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedMediaModule = {
        invoke: mockInvoke,
      };

      const drmConfig = {
        contentId: 'movie-123',
        licenseUrl: 'https://license.example.com/widevine',
        contentUrl: 'https://cdn.example.com/video.mp4',
      };

      const module = new MediaModule();
      const response = await module.playDRMContent(drmConfig);

      expect(mockInvoke).toHaveBeenCalledWith('playDRMContent', { data: drmConfig });
      expect(response.status_code).toBe(200);
    });

    it('should return 204 when DRM parameters are invalid', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (Android 13; SM-G998B)',
      });

      const mockResponse: PlayDRMContentResponse = {
        status_code: 204,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedMediaModule = {
        invoke: mockInvoke,
      };

      const module = new MediaModule();
      const response = await module.playDRMContent({});

      expect(mockInvoke).toHaveBeenCalledWith('playDRMContent', { data: {} });
      expect(response.status_code).toBe(204);
    });

    it('should return 200 with FairPlay DRM configuration', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'GrabBeta/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: PlayDRMContentResponse = {
        status_code: 200,
        result: undefined,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedMediaModule = {
        invoke: mockInvoke,
      };

      const fairPlayConfig = {
        assetId: 'content-456',
        certificateUrl: 'https://fairplay.example.com/cert',
        licenseUrl: 'https://fairplay.example.com/license',
        contentUrl: 'https://cdn.example.com/video.m3u8',
      };

      const module = new MediaModule();
      const response = await module.playDRMContent(fairPlayConfig);

      expect(mockInvoke).toHaveBeenCalledWith('playDRMContent', { data: fairPlayConfig });
      expect(response.status_code).toBe(200);
    });

    it('should return 500 when an unexpected error occurs', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedMediaModule = {
        invoke: mockInvoke,
      };

      const module = new MediaModule();
      const response = await module.playDRMContent({ contentId: 'test' });

      expect(mockInvoke).toHaveBeenCalledWith('playDRMContent', { data: { contentId: 'test' } });
      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method');
      }
    });
  });
});
