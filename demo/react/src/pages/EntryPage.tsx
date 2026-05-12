import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSuccess, isError, ContainerModule, IdentityModule, ScopeModule } from '@grabjs/superapp-sdk';
import { ENVIRONMENT_CONFIG } from '../config';
import { fetchDiscoveryConfiguration, exchangeAuthorizationCode, fetchUserInfo } from '../services/grabidService';
import { runOptional, formatError } from '../utils/sdkHelpers';
import { WarningArea } from '../components/WarningArea';
import { StatusMessage } from '../components/StatusMessage';
import { useUser } from '../context/UserContext';

import type { PageState } from '../types';

const ENVIRONMENT = ENVIRONMENT_CONFIG.clientId === 'REPLACE_WITH_PRODUCTION_CLIENT_ID' ? 'production' : 'staging';

export default function EntryPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [pageState, setPageState] = useState<PageState>({ status: 'loading', message: 'Checking environment...' });
  const [warning, setWarning] = useState<string | null>(null);

  async function init() {
    setPageState({ status: 'loading', message: 'Checking environment...' });

    const container = new ContainerModule();

    const connectionResponse = await container.isConnected();
    if (!isSuccess(connectionResponse) || !connectionResponse.result?.connected) {
      setPageState({ status: 'error', message: 'This page must be opened from within the Grab SuperApp.', type: 'error' });
      return;
    }

    const identity = new IdentityModule();

    setPageState({ status: 'loading', message: 'Authorizing...' });

    await runOptional('Set background color', container.setBackgroundColor('#005339'), setWarning);
    await runOptional('Set title', container.setTitle('Entry'), setWarning);
    await runOptional('Hide back button', container.hideBackButton(), setWarning);
    await runOptional('Hide refresh button', container.hideRefreshButton(), setWarning);
    await runOptional('Hide loader', container.hideLoader(), setWarning);

    const authResponse = await identity.authorize({
      clientId: ENVIRONMENT_CONFIG.clientId,
      redirectUri: ENVIRONMENT_CONFIG.redirectUri,
      scope: 'openid profile.read phone',
      environment: ENVIRONMENT,
      responseMode: 'in_place'
    });

    if (isSuccess(authResponse)) {
      const { status_code } = authResponse;
      if (status_code === 200) {
        setPageState({ status: 'loading', message: 'Completing sign-in...' });

        const { code, codeVerifier, redirectUri } = authResponse.result;

        if (!code) {
          setPageState({ status: 'error', message: 'No authorization code returned.', type: 'error' });
          return;
        }

        try {
          setPageState({ status: 'loading', message: 'Fetching OIDC discovery...' });
          const discovery = await fetchDiscoveryConfiguration();

          setPageState({ status: 'loading', message: 'Exchanging authorization code...' });
          const tokenResponse = await exchangeAuthorizationCode(
            discovery,
            code,
            codeVerifier,
            redirectUri
          );

          // Validate id_token against 'id_token_verification_endpoint' from discovery.
          // Note: This is not performed in the browser demo because the verification 
          // endpoint requires a GET request with a body, which browsers do not allow.

          setPageState({ status: 'loading', message: 'Fetching user info...' });
          const userInfo = await fetchUserInfo(discovery, tokenResponse.access_token);

          setUser({
            userName: userInfo.name || '',
            userEmail: userInfo.email || '',
            userPhone: userInfo.phoneNumber || ''
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          setPageState({ status: 'error', message: `OIDC flow failed: ${message}`, type: 'error' });
          return;
        }

        const scope = new ScopeModule();
        const reloadResponse = await scope.reloadScopes();
        if (!isSuccess(reloadResponse)) {
          setPageState({ status: 'error', message: `Reload scopes failed: ${formatError('Reload scopes', reloadResponse)}`, type: 'error' });
          return;
        }

        await identity.clearAuthorizationArtifacts();
        navigate('/index');
      } else if (status_code === 204) {
        await identity.clearAuthorizationArtifacts();
        setPageState({ status: 'error', message: 'Authorization was cancelled.', type: 'error' });
      }
    } else if (isError(authResponse)) {
      await identity.clearAuthorizationArtifacts();
      setPageState({ status: 'error', message: `Authorization failed: ${authResponse.error} (code: ${authResponse.status_code})`, type: 'error' });
    } else {
      await identity.clearAuthorizationArtifacts();
      setPageState({ status: 'error', message: `Unexpected authorization response: ${authResponse.status_code}`, type: 'error' });
    }
  }

  useEffect(() => {
    queueMicrotask(init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4">
      <WarningArea warning={warning} />
      {pageState.status === 'loading' ? (
        <p>{pageState.message}</p>
      ) : pageState.status === 'error' ? (
        <StatusMessage message={pageState.message} type={pageState.type} />
      ) : null}
    </div>
  );
}