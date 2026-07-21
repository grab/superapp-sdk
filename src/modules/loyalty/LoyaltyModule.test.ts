/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { LoyaltyModule } from './LoyaltyModule';
import type {
  EstimateRewardsRequest,
  EstimateRewardsResponse,
  EstimateRewardsResultEntry,
} from './types';

const GRAB_IOS_UA = 'Grab/5.401.0 (iPhone; iOS 16.0)';
const GRAB_ANDROID_UA = 'Grab/5.401.0 (Android 13; SM-G998B)';
const NON_GRAB_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124';

function stubGrabUserAgent(userAgent = GRAB_IOS_UA) {
  vi.stubGlobal('navigator', { userAgent });
}

function stubNonGrabUserAgent() {
  vi.stubGlobal('navigator', { userAgent: NON_GRAB_UA });
}

function installWrappedLoyaltyMock(invoke: ReturnType<typeof vi.fn>) {
  (window as unknown as Record<string, { invoke: typeof invoke }>).WrappedLoyaltyModule = {
    invoke,
  };
}

function cleanupLoyaltyModuleTest() {
  vi.unstubAllGlobals();
  delete (window as unknown as Record<string, unknown>).WrappedLoyaltyModule;
}

const validRequest: EstimateRewardsRequest = {
  items: [
    { id: 'trip-456', amount_in_minor_units: 75000, currency_code: 'SGD' },
    { id: 'trip-789', amount_in_minor_units: 25000000, currency_code: 'IDR' },
  ],
};

const happyPathResponse: EstimateRewardsResponse = {
  status_code: 200,
  result: {
    items: [
      {
        id: 'trip-456',
        status_code: 'SUCCESS',
        result: {
          reward: { amount: 3750, currency_code: 'GRAB-POINT', display_amount: '3,750' },
          estimated_fiat: { amount_in_minor_units: 750, currency_code: 'SGD' },
        },
      },
      {
        id: 'trip-789',
        status_code: 'NOT_APPLICABLE',
        reason_code: 'country_restriction',
      },
    ],
  },
};

const allItemTypesResponse: EstimateRewardsResponse = {
  status_code: 200,
  result: {
    items: [
      {
        id: 'trip-1',
        status_code: 'SUCCESS',
        result: {
          reward: { amount: 492, currency_code: 'GRAB-POINT', display_amount: '492' },
          estimated_fiat: { amount_in_minor_units: 328, currency_code: 'MYR' },
        },
      },
      {
        id: 'trip-2',
        status_code: 'SUCCESS',
        result: {
          reward: { amount: 100, currency_code: 'GRAB-POINT', display_amount: '100' },
        },
      },
      {
        id: 'trip-3',
        status_code: 'NOT_APPLICABLE',
        reason_code: 'country_restriction',
      },
      {
        id: 'trip-4',
        status_code: 'ERROR',
        reason_code: 'estimate_failed',
      },
    ],
  },
};

describe('LoyaltyModule', () => {
  afterEach(() => {
    cleanupLoyaltyModuleTest();
  });

  describe('estimateRewards', () => {
    it('should return 501 when not running in Grab app', async () => {
      stubNonGrabUserAgent();

      const module = new LoyaltyModule();
      const response = await module.estimateRewards(validRequest);

      expect(response.status_code).toBe(501);
      if (response.status_code === 501) {
        expect(response.error).toBe(
          'Not implemented: This method requires the Grab app environment'
        );
      }
    });

    it('should return 426 when Grab app version is below minimum', async () => {
      vi.stubGlobal('navigator', {
        userAgent: 'Grab/5.399.0 (iPhone; iOS 16.0)',
      });

      const module = new LoyaltyModule();
      const response = await module.estimateRewards(validRequest);

      expect(response.status_code).toBe(426);
    });

    it('should return 400 when items array is empty', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedLoyaltyMock(mockInvoke);

      const module = new LoyaltyModule();
      const response = await module.estimateRewards({ items: [] });

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
    });

    it('should return 400 when an item has an empty id', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedLoyaltyMock(mockInvoke);

      const module = new LoyaltyModule();
      const response = await module.estimateRewards({
        items: [{ id: '', amount_in_minor_units: 75000, currency_code: 'SGD' }],
      });

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
    });

    it('should return 400 when an item has a negative amount', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedLoyaltyMock(mockInvoke);

      const module = new LoyaltyModule();
      const response = await module.estimateRewards({
        items: [{ id: 'trip-1', amount_in_minor_units: -100, currency_code: 'SGD' }],
      });

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
    });

    it('should return 400 when an item has amount_in_minor_units of zero', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedLoyaltyMock(mockInvoke);

      const module = new LoyaltyModule();
      const response = await module.estimateRewards({
        items: [{ id: 'trip-1', amount_in_minor_units: 0, currency_code: 'SGD' }],
      });

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
    });

    it('should return 400 when items contain duplicate ids', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedLoyaltyMock(mockInvoke);

      const module = new LoyaltyModule();
      const response = await module.estimateRewards({
        items: [
          { id: 'trip-1', amount_in_minor_units: 1000, currency_code: 'SGD' },
          { id: 'trip-1', amount_in_minor_units: 2000, currency_code: 'MYR' },
        ],
      });

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
    });

    it('should return 400 when an item has an empty currency_code', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn();
      installWrappedLoyaltyMock(mockInvoke);

      const module = new LoyaltyModule();
      const response = await module.estimateRewards({
        items: [{ id: 'trip-1', amount_in_minor_units: 75000, currency_code: '' }],
      });

      expect(response.status_code).toBe(400);
      expect(mockInvoke).not.toHaveBeenCalled();
    });

    it('should return 200 with mixed SUCCESS and NOT_APPLICABLE items', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn().mockResolvedValue(happyPathResponse);
      installWrappedLoyaltyMock(mockInvoke);

      const module = new LoyaltyModule();
      const response = await module.estimateRewards(validRequest);

      expect(mockInvoke).toHaveBeenCalledWith('estimateRewards', validRequest);
      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        const items = response.result.items;
        expect(items).toHaveLength(2);

        const successItem = items[0];
        expect(successItem.status_code).toBe('SUCCESS');
        if (successItem.status_code === 'SUCCESS') {
          expect(successItem.id).toBe('trip-456');
          expect(successItem.result.reward.amount).toBe(3750);
          expect(successItem.result.reward.currency_code).toBe('GRAB-POINT');
          expect(successItem.result.reward.display_amount).toBe('3,750');
          expect(successItem.result.estimated_fiat!.amount_in_minor_units).toBe(750);
          expect(successItem.result.estimated_fiat!.currency_code).toBe('SGD');
        }

        const notApplicableItem = items[1];
        expect(notApplicableItem.status_code).toBe('NOT_APPLICABLE');
        if (notApplicableItem.status_code === 'NOT_APPLICABLE') {
          expect(notApplicableItem.id).toBe('trip-789');
          expect(notApplicableItem.reason_code).toBe('country_restriction');
        }
      }
    });

    it('should return 200 with SUCCESS (no estimated_fiat), NOT_APPLICABLE, and ERROR items', async () => {
      stubGrabUserAgent();

      const request: EstimateRewardsRequest = {
        items: [
          { id: 'trip-1', amount_in_minor_units: 65600, currency_code: 'MYR' },
          { id: 'trip-2', amount_in_minor_units: 75000, currency_code: 'SGD' },
          { id: 'trip-3', amount_in_minor_units: 25000000, currency_code: 'IDR' },
          { id: 'trip-4', amount_in_minor_units: 11950, currency_code: 'EUR' },
        ],
      };

      const mockInvoke = vi.fn().mockResolvedValue(allItemTypesResponse);
      installWrappedLoyaltyMock(mockInvoke);

      const module = new LoyaltyModule();
      const response = await module.estimateRewards(request);

      expect(response.status_code).toBe(200);
      if (response.status_code === 200) {
        const items = response.result.items;
        expect(items).toHaveLength(4);

        const withFiat = items[0] as Extract<
          EstimateRewardsResultEntry,
          { status_code: 'SUCCESS' }
        >;
        expect(withFiat.status_code).toBe('SUCCESS');
        expect(withFiat.result.estimated_fiat?.amount_in_minor_units).toBe(328);
        expect(withFiat.result.estimated_fiat?.currency_code).toBe('MYR');

        const withoutFiat = items[1] as Extract<
          EstimateRewardsResultEntry,
          { status_code: 'SUCCESS' }
        >;
        expect(withoutFiat.status_code).toBe('SUCCESS');
        expect(withoutFiat.result.estimated_fiat).toBeUndefined();

        const notApplicable = items[2] as Extract<
          EstimateRewardsResultEntry,
          { status_code: 'NOT_APPLICABLE' }
        >;
        expect(notApplicable.status_code).toBe('NOT_APPLICABLE');
        expect(notApplicable.reason_code).toBe('country_restriction');

        const errorItem = items[3] as Extract<EstimateRewardsResultEntry, { status_code: 'ERROR' }>;
        expect(errorItem.status_code).toBe('ERROR');
        expect(errorItem.reason_code).toBe('estimate_failed');
      }
    });

    it('should return 200 on Android', async () => {
      stubGrabUserAgent(GRAB_ANDROID_UA);

      const mockInvoke = vi.fn().mockResolvedValue(happyPathResponse);
      installWrappedLoyaltyMock(mockInvoke);

      const module = new LoyaltyModule();
      const response = await module.estimateRewards(validRequest);

      expect(response.status_code).toBe(200);
    });

    it('should return 403 when not authorized', async () => {
      stubGrabUserAgent();

      const mockResponse: EstimateRewardsResponse = {
        status_code: 403,
        error: 'Forbidden',
      };

      const mockInvoke = vi.fn().mockResolvedValue(mockResponse);
      installWrappedLoyaltyMock(mockInvoke);

      const module = new LoyaltyModule();
      const response = await module.estimateRewards(validRequest);

      expect(response.status_code).toBe(403);
    });

    it('should return 500 when an unexpected error occurs', async () => {
      stubGrabUserAgent();

      const mockInvoke = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected bridge error');
      });
      installWrappedLoyaltyMock(mockInvoke);

      const module = new LoyaltyModule();
      const response = await module.estimateRewards(validRequest);

      expect(response.status_code).toBe(500);
      if (response.status_code === 500) {
        expect(response.error).toBe('Failed to invoke method: Unexpected bridge error');
      }
    });
  });
});
