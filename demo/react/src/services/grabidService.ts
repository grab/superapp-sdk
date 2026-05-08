
import { ENVIRONMENT_CONFIG } from '../config';

export async function fetchDiscoveryConfiguration(): Promise<Record<string, unknown>> {
  const response = await fetch(ENVIRONMENT_CONFIG.discoveryUrl, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Discovery fetch failed (${ENVIRONMENT_CONFIG.discoveryUrl}): ${response.status} - ${errorText}`);
  }
  return response.json();
}

export async function exchangeAuthorizationCode(
  discovery: Record<string, string>,
  code: string,
  codeVerifier: string,
  redirectUri: string
): Promise<Record<string, unknown>> {
  const tokenEndpoint = discovery.token_endpoint;
  if (!tokenEndpoint) {
    throw new Error('Token endpoint not found in discovery document');
  }
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify({
      client_id: ENVIRONMENT_CONFIG.clientId,
      grant_type: 'authorization_code',
      code,
      code_verifier: codeVerifier,
      redirect_uri: redirectUri
    })
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Token exchange failed (${tokenEndpoint}): ${response.status} - ${errorText}`);
  }
  return response.json();
}

export async function fetchUserInfo(
  discovery: Record<string, string>,
  accessToken: string
): Promise<Record<string, unknown>> {
  const userinfoEndpoint = discovery.userinfo_endpoint;
  if (!userinfoEndpoint) {
    throw new Error('Userinfo endpoint not found in discovery document');
  }
  const response = await fetch(userinfoEndpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`User info fetch failed (${userinfoEndpoint}): ${response.status} - ${errorText}`);
  }
  return response.json();
}