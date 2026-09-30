/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SharePanelModule } from './SharePanelModule';
import type { OpenSharePanelRequest, OpenSharePanelResponse } from './types';

describe('SharePanelModule', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      userAgent: 'Grab/5.433.0 (Android 16; Pixel 10)',
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    delete (window as unknown as Record<string, unknown>).WrappedSharePanelModule;
  });

  const installBridge = (response: unknown) => {
    const invoke = vi.fn().mockResolvedValue(response);
    (window as unknown as Record<string, { invoke: typeof invoke }>).WrappedSharePanelModule = {
      invoke,
    };
    return invoke;
  };

  it('returns 426 without invoking the bridge when app version is below 5.433', async () => {
    vi.stubGlobal('navigator', {
      userAgent: 'Grab/5.432.0 (Android 16; Pixel 10)',
    });
    const invoke = installBridge({
      status_code: 200,
      result: { outcome: 'target_selected' },
    });

    await expect(new SharePanelModule().open({ content: 'Join me' })).resolves.toEqual({
      status_code: 426,
      error: 'Upgrade Required: This method requires a newer version of the Grab app',
    });
    expect(invoke).not.toHaveBeenCalled();
  });

  it('defaults omitted recipient capabilities to false', async () => {
    const response: OpenSharePanelResponse = {
      status_code: 200,
      result: { outcome: 'target_selected' },
    };
    const invoke = installBridge(response);

    await expect(
      new SharePanelModule().open({
        content:
          'I found this article useful and thought you might too: https://example.com/article',
      })
    ).resolves.toEqual(response);
    expect(invoke).toHaveBeenCalledWith('open', {
      content: 'I found this article useful and thought you might too: https://example.com/article',
      enableIndividualRecipients: false,
      enableGroupRecipients: false,
    });
  });

  it.each([
    { enableIndividualRecipients: false, enableGroupRecipients: false },
    { enableIndividualRecipients: true, enableGroupRecipients: false },
    { enableIndividualRecipients: false, enableGroupRecipients: true },
    { enableIndividualRecipients: true, enableGroupRecipients: true },
  ])('forwards recipient capability combination: %#', async (capabilities) => {
    const response: OpenSharePanelResponse = {
      status_code: 200,
      result: { outcome: 'recipients_selected' },
    };
    const invoke = installBridge(response);
    const request: OpenSharePanelRequest = {
      content: 'I found this article useful and thought you might too: https://example.com/article',
      triggerSource: 'content_share',
      ...capabilities,
    };

    await expect(new SharePanelModule().open(request)).resolves.toEqual(response);
    expect(invoke).toHaveBeenCalledWith('open', request);
  });

  it.each([{ outcome: 'target_selected' as const }, { outcome: 'recipients_selected' as const }])(
    'accepts a privacy-safe 200 $outcome result',
    async (result) => {
      const response: OpenSharePanelResponse = { status_code: 200, result };
      installBridge(response);

      await expect(new SharePanelModule().open({ content: 'Join me' })).resolves.toEqual(response);
    }
  );

  it('accepts a payload-free 204 dismissal response', async () => {
    const response: OpenSharePanelResponse = { status_code: 204 };
    installBridge(response);

    await expect(new SharePanelModule().open({ content: 'Join me' })).resolves.toEqual(response);
  });

  it('accepts content at the 2,000 UTF-16 code unit limit', async () => {
    const response: OpenSharePanelResponse = {
      status_code: 200,
      result: { outcome: 'target_selected' },
    };
    installBridge(response);

    await expect(new SharePanelModule().open({ content: '😀'.repeat(1_000) })).resolves.toEqual(
      response
    );
  });

  it.each([
    { request: {}, description: 'missing content' },
    { request: null, description: 'null request' },
    { request: { content: '   ' }, description: 'blank content' },
    {
      request: { content: 'Join me', unexpected: true },
      description: 'unknown request field',
    },
    {
      request: { content: 'Join me', triggerSource: 'Invalid Source' },
      description: 'invalid trigger source',
    },
    {
      request: { content: 'Join me', enableIndividualRecipients: 'true' },
      description: 'non-boolean individual recipients flag',
    },
    {
      request: { content: 'Join me', enableGroupRecipients: 'true' },
      description: 'non-boolean group recipients flag',
    },
    {
      request: { content: 'Join me', enableIndividualRecipients: null },
      description: 'null individual recipients flag',
    },
    {
      request: { content: 'Join me', enableGroupRecipients: null },
      description: 'null group recipients flag',
    },
    {
      request: { content: 'C'.repeat(2_001) },
      description: 'content over 2,000 UTF-16 code units',
    },
    {
      request: { content: '😀'.repeat(1_001) },
      description: 'content over 2,000 UTF-16 code units',
    },
    {
      // C0 controls stay within the content limit but expand under JSON.stringify
      // past the 8 KiB UTF-8 serialized-request ceiling.
      request: { content: '\u0001'.repeat(2_000) },
      description: 'serialized request over 8 KiB',
    },
    {
      request: { content: 'Join me', triggerSource: 's'.repeat(65) },
      description: 'trigger source over 64 characters',
    },
  ])('returns 400 without invoking the bridge for $description', async ({ request }) => {
    const invoke = installBridge({
      status_code: 200,
      result: { outcome: 'target_selected' },
    });

    const response = await new SharePanelModule().open(request as unknown as OpenSharePanelRequest);

    expect(response.status_code).toBe(400);
    expect(invoke).not.toHaveBeenCalled();
  });

  it.each([400, 403, 424, 426, 500, 501] as const)(
    'passes through status %i returned by the bridge',
    async (statusCode) => {
      const response = {
        status_code: statusCode,
        error: 'Sample error',
      } as OpenSharePanelResponse;
      installBridge(response);

      await expect(new SharePanelModule().open({ content: 'Join me' })).resolves.toEqual(response);
    }
  );

  it('returns 500 when the bridge throws', async () => {
    const invoke = vi.fn().mockRejectedValue(new Error('Unexpected bridge error'));
    (window as unknown as Record<string, { invoke: typeof invoke }>).WrappedSharePanelModule = {
      invoke,
    };

    await expect(new SharePanelModule().open({ content: 'Join me' })).resolves.toEqual({
      status_code: 500,
      error: 'Failed to invoke method: Unexpected bridge error',
    });
  });

  it.each([
    { status_code: 200, result: { outcome: 'dismissed' } },
    { status_code: 200, result: { outcome: 'target_selected', target: 'copy' } },
  ])('warns when the bridge returns an unexpected response shape: %#', async (response) => {
    installBridge(response);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await new SharePanelModule().open({ content: 'Join me' });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[SuperAppSDK][SharePanelModule.open] Unexpected response shape:')
    );
  });

  it('returns 501 outside the supported app environment', async () => {
    vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 Chrome/152.0' });

    await expect(new SharePanelModule().open({ content: 'Join me' })).resolves.toEqual({
      status_code: 501,
      error: 'Not implemented: This method requires the Grab app environment',
    });
  });
});
