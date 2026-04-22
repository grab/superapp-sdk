/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { ContainerModule } from './ContainerModule';
import {
  GetSessionParamsResponse,
  OnContentLoadedResponse,
  OnCtaTapResponse,
  RawCloseResponse,
  RawHideBackButtonResponse,
  RawHideLoaderResponse,
  RawHideRefreshButtonResponse,
  RawOpenExternalLinkResponse,
  RawSendAnalyticsEventResponse,
  RawSetBackgroundColorResponse,
  RawSetTitleResponse,
  RawShowBackButtonResponse,
  RawShowLoaderResponse,
  RawShowRefreshButtonResponse,
} from './types';

describe('ContainerModule', () => {
  describe('setBackgroundColor', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedContainerModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.setBackgroundColor('#ffffff');

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 204 when background color is set successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawSetBackgroundColorResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.setBackgroundColor('#ffffff');

      expect(mockInvoke).toHaveBeenCalledWith('setBackgroundColor', { backgroundColor: '#ffffff' });
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when background color format is invalid', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawSetBackgroundColorResponse = {
        status_code: 400,
        error: 'Invalid background color format',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.setBackgroundColor('invalid-color');

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Invalid background color format');
      }
    });
  });

  describe('setTitle', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedContainerModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.setTitle('Home');

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when title is set successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawSetTitleResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.setTitle('Home Page');

      expect(mockInvoke).toHaveBeenCalledWith('setTitle', { title: 'Home Page' });
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when title parameter is invalid', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawSetTitleResponse = {
        status_code: 400,
        error: 'Invalid title parameter',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.setTitle('');

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('Invalid title parameter');
      }
    });
  });

  describe('hideBackButton', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedContainerModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.hideBackButton();

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when back button is hidden successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawHideBackButtonResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.hideBackButton();

      expect(mockInvoke).toHaveBeenCalledWith('hideBackButton', undefined);
      expect(response.status_code).toBe(204);
    });
  });

  describe('showBackButton', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedContainerModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.showBackButton();

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when back button is shown successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawShowBackButtonResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.showBackButton();

      expect(mockInvoke).toHaveBeenCalledWith('showBackButton', undefined);
      expect(response.status_code).toBe(204);
    });
  });

  describe('hideRefreshButton', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedContainerModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.hideRefreshButton();

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when refresh button is hidden successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawHideRefreshButtonResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.hideRefreshButton();

      expect(mockInvoke).toHaveBeenCalledWith('hideRefreshButton', undefined);
      expect(response.status_code).toBe(204);
    });
  });

  describe('showRefreshButton', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedContainerModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.showRefreshButton();

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when refresh button is shown successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawShowRefreshButtonResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.showRefreshButton();

      expect(mockInvoke).toHaveBeenCalledWith('showRefreshButton', undefined);
      expect(response.status_code).toBe(204);
    });
  });

  describe('close', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedContainerModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.close();

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when container closes successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawCloseResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.close();

      expect(mockInvoke).toHaveBeenCalledWith('close', undefined);
      expect(response.status_code).toBe(204);
    });
  });

  describe('onContentLoaded', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedContainerModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.onContentLoaded();

      expect(response.status_code).toBe(501);
    });

    it('should return 200 when content loaded notification is sent', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: OnContentLoadedResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.onContentLoaded();

      expect(mockInvoke).toHaveBeenCalledWith('onContentLoaded', undefined);
      expect(response.status_code).toBe(200);
    });
  });

  describe('showLoader', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedContainerModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.showLoader();

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when loader is shown successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawShowLoaderResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.showLoader();

      expect(mockInvoke).toHaveBeenCalledWith('showLoader', undefined);
      expect(response.status_code).toBe(204);
    });
  });

  describe('hideLoader', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedContainerModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.hideLoader();

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when loader is hidden successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawHideLoaderResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.hideLoader();

      expect(mockInvoke).toHaveBeenCalledWith('hideLoader', undefined);
      expect(response.status_code).toBe(204);
    });
  });

  describe('openExternalLink', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedContainerModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.openExternalLink('https://example.com');

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when external link is opened successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawOpenExternalLinkResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.openExternalLink('https://example.com');

      expect(mockInvoke).toHaveBeenCalledWith('openExternalLink', { url: 'https://example.com' });
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when URL parameter is invalid', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawOpenExternalLinkResponse = {
        status_code: 400,
        error: 'URL parameter not found',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.openExternalLink('');

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('URL parameter not found');
      }
    });
  });

  describe('onCtaTap', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedContainerModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.onCtaTap('AV_LANDING_PAGE_CONTINUE');

      expect(response.status_code).toBe(501);
    });

    it('should return 200 when CTA tap is notified successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: OnCtaTapResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.onCtaTap('AV_LANDING_PAGE_CONTINUE');

      expect(mockInvoke).toHaveBeenCalledWith('onCtaTap', { action: 'AV_LANDING_PAGE_CONTINUE' });
      expect(response.status_code).toBe(200);
    });
  });

  describe('sendAnalyticsEvent', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedContainerModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.sendAnalyticsEvent({
        state: 'HOMEPAGE',
        name: 'DEFAULT',
      });

      expect(response.status_code).toBe(501);
    });

    it('should return 204 when analytics event is sent successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawSendAnalyticsEventResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.sendAnalyticsEvent({
        state: 'HOMEPAGE',
        name: 'DEFAULT',
      });

      expect(mockInvoke).toHaveBeenCalledWith('sendAnalyticsEvent', {
        state: 'HOMEPAGE',
        name: 'DEFAULT',
        data: null,
      });
      expect(response.status_code).toBe(204);
    });

    it('should return 204 when analytics event with data is sent successfully', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: RawSendAnalyticsEventResponse = {
        status_code: 200,
        result: true,
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.sendAnalyticsEvent({
        state: 'CHECKOUT_PAGE',
        name: 'BOOK',
        data: { itemId: '123', quantity: 2 },
      });

      expect(mockInvoke).toHaveBeenCalledWith('sendAnalyticsEvent', {
        state: 'CHECKOUT_PAGE',
        name: 'BOOK',
        data: '{"itemId":"123","quantity":2}',
      });
      expect(response.status_code).toBe(204);
    });

    it('should return 400 when name is missing', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const module = new ContainerModule();
      const response = await module.sendAnalyticsEvent({
        state: 'HOMEPAGE',
        name: null as unknown as string,
      });

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('name: Invalid type: Expected string but received null');
      }
    });

    it('should return 400 when state is missing', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const module = new ContainerModule();
      const response = await module.sendAnalyticsEvent({
        state: null as unknown as string,
        name: 'DEFAULT',
      });

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('state: Invalid type: Expected string but received null');
      }
    });

    it('should return 400 when data is not an object', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const module = new ContainerModule();
      const response = await module.sendAnalyticsEvent({
        state: 'HOMEPAGE',
        name: 'DEFAULT',
        data: 'invalid' as unknown as Record<string, unknown>,
      });

      expect(response.status_code).toBe(400);
      if (response.status_code === 400) {
        expect(response.error).toBe('data: Invalid type: Expected Object but received "invalid"');
      }
    });
  });

  describe('isConnected', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('should return 404 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.isConnected();

      expect(response.status_code).toBe(404);
      if (response.status_code === 404) {
        expect(response.error).toBe('Not connected to Grab app');
      }
    });

    it('should return 200 when running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const module = new ContainerModule();
      const response = await module.isConnected();

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result.connected).toBe(true);
      }
    });
  });

  describe('getSessionParams', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      delete (window as unknown as Record<string, unknown>).WrappedContainerModule;
    });

    it('should return 501 when not running in Grab app', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124',
      });

      const module = new ContainerModule();
      const response = await module.getSessionParams();

      expect(response.status_code).toBe(501);
    });

    it('should return 200 with session parameters', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.256.0 (iPhone; iOS 16.0)',
      });

      const mockResponse: GetSessionParamsResponse = {
        status_code: 200,
        result: '{"userId": "123", "sessionToken": "abc"}',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);

      (window as unknown as Record<string, { invoke: typeof mockInvoke }>).WrappedContainerModule =
        {
          invoke: mockInvoke,
        };

      const module = new ContainerModule();
      const response = await module.getSessionParams();

      expect(mockInvoke).toHaveBeenCalledWith('getSessionParams', undefined);
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        expect(response.result).toBe('{"userId": "123", "sessionToken": "abc"}');
      }
    });
  });
});
