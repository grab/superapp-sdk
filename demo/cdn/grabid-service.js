// Demo-only GrabID/OIDC helpers. In production, run token exchange and userinfo on your backend.

window.fetchDiscoveryConfiguration = async function fetchDiscoveryConfiguration() {
  try {
    const response = await fetch(ENVIRONMENT_CONFIG.discoveryUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Discovery fetch failed (${ENVIRONMENT_CONFIG.discoveryUrl}): ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Discovery fetch error: ${error.message}`);
  }
};

window.exchangeAuthorizationCode = async function exchangeAuthorizationCode(discovery, code, codeVerifier, redirectUri) {
  const tokenEndpoint = discovery.token_endpoint;
  if (!tokenEndpoint) {
    throw new Error('Token endpoint not found in discovery document');
  }
  try {
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        client_id: ENVIRONMENT_CONFIG.clientId,
        grant_type: 'authorization_code',
        code: code,
        code_verifier: codeVerifier,
        redirect_uri: redirectUri
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Token exchange failed (${tokenEndpoint}): ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Token exchange error: ${error.message}`);
  }
};

window.fetchUserInfo = async function fetchUserInfo(discovery, accessToken) {
  const userinfoEndpoint = discovery.userinfo_endpoint;
  if (!userinfoEndpoint) {
    throw new Error('Userinfo endpoint not found in discovery document');
  }
  try {
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
    return await response.json();
  } catch (error) {
    throw new Error(`User info fetch error: ${error.message}`);
  }
};
