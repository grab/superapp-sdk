import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSuccess, isOk, isNoContent, isError, ContainerModule, IdentityModule, ScopeModule, LocationModule, LocaleModule } from '@grabjs/superapp-sdk';
import { ENVIRONMENT_CONFIG } from '../config';
import { runOptional, formatError } from '../utils/sdkHelpers';
import { getVisitCount } from '../utils/visitStorage';
import { WarningArea } from '../components/WarningArea';
import { StatusMessage } from '../components/StatusMessage';
import { useUser } from '../context/UserContext';

import type { PageState } from '../types';

export default function IndexPage() {
  const navigate = useNavigate();
  const { userName, userEmail, userPhone } = useUser();
  const [pageState, setPageState] = useState<PageState>({ status: 'loading', message: 'Checking environment...' });
  const [warning, setWarning] = useState<string | null>(null);
  const [locale, setLocale] = useState<string>('N/A');
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [actionResult, setActionResult] = useState<{ message: string; type: 'error' | 'warning' } | null>(null);

  async function init() {
    setPageState({ status: 'loading', message: 'Checking environment...' });

    const container = new ContainerModule();

    const connectionResponse = await container.isConnected();
    if (!isSuccess(connectionResponse) || !connectionResponse.result?.connected) {
      setPageState({ status: 'error', message: 'This page must be opened from within the Grab SuperApp.', type: 'error' });
      return;
    }

    const localeMod = new LocaleModule();

    setPageState({ status: 'loading', message: 'Loading user information...' });

    await runOptional('Set background color', container.setBackgroundColor('#005339'), setWarning);
    await runOptional('Set title', container.setTitle('Home'), setWarning);
    await runOptional('Hide back button', container.hideBackButton(), setWarning);
    await runOptional('Show refresh button', container.showRefreshButton(), setWarning);

    const localeResponse = await localeMod.getLanguageLocaleIdentifier();
    if (isOk(localeResponse)) {
      setLocale(localeResponse.result);
    }

    if (!userName && !userEmail) {
      setPageState({ status: 'error', message: 'No user information found. Please authorize first.', type: 'error' });
      return;
    }

    await runOptional('Send DEFAULT analytics', container.sendAnalyticsEvent({ state: 'HOMEPAGE', name: 'DEFAULT' }), setWarning);

    setVisitCount(await getVisitCount());

    setPageState({ status: 'ready' });
  }

  useEffect(() => {
    queueMicrotask(init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleViewMap() {
    setActionResult(null);
    const identity = new IdentityModule();
    const scope = new ScopeModule();
    const location = new LocationModule();
    const container = new ContainerModule();

    const hasAccessResponse = await scope.hasAccessTo('LocationModule', 'getCoordinate');
    if (!isSuccess(hasAccessResponse) || !hasAccessResponse.result) {
      const authResponse = await identity.authorize({
        clientId: ENVIRONMENT_CONFIG.clientId,
        redirectUri: window.location.href,
        scope: 'mobile.geolocation',
        environment: 'staging',
        responseMode: 'in_place'
      });

      if (!isOk(authResponse)) {
        if (isError(authResponse)) {
          setActionResult({ message: `Location access denied: ${authResponse.error}`, type: 'error' });
        } else if (isNoContent(authResponse)) {
          setActionResult({ message: 'Location access was cancelled.', type: 'warning' });
        }
        return;
      }

      const reloadResponse = await scope.reloadScopes();
      if (!isSuccess(reloadResponse)) {
        setActionResult({ message: formatError('Reload scopes', reloadResponse), type: 'error' });
        return;
      }
      await identity.clearAuthorizationArtifacts();
    }

    const locationResponse = await location.getCoordinate();
    if (!isOk(locationResponse)) {
      setActionResult({ message: formatError('Fetch location', locationResponse), type: 'error' });
      return;
    }

    await runOptional('Send INITIATE analytics', container.sendAnalyticsEvent({ state: 'HOMEPAGE', name: 'INITIATE' }), setWarning);

    const { latitude, longitude } = locationResponse.result;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    const openResponse = await container.openExternalLink(mapUrl);
    if (!isSuccess(openResponse)) {
      setActionResult({ message: formatError('Open map', openResponse), type: 'error' });
    }
  }

  function handleCheckout() {
    navigate('/checkout');
  }

  function handleLoyalty() {
    navigate('/loyalty');
  }

  return (
    <div className="p-4">
      <WarningArea warning={warning} />
      {pageState.status === 'loading' ? (
        <p>{pageState.message}</p>
      ) : pageState.status === 'error' ? (
        <StatusMessage message={pageState.message} type={pageState.type} />
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">User Information</h1>
          <div className="space-y-2 mb-6">
            <p><strong>Name:</strong> {userName || 'N/A'}</p>
            <p><strong>Email:</strong> {userEmail || 'N/A'}</p>
            <p><strong>Phone:</strong> {userPhone || 'N/A'}</p>
            <p><strong>Locale:</strong> {locale}</p>
            <p><strong>Visits:</strong> {visitCount || 'N/A'}</p>
          </div>
          <div className="mt-6 space-y-3">
            <button
              onClick={handleViewMap}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Location on Map
            </button>
            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Go to Checkout
            </button>
            <button
              onClick={handleLoyalty}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Estimate Rewards
            </button>
          </div>
          {actionResult && (
            <div className="mt-4">
              <StatusMessage message={actionResult.message} type={actionResult.type} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
