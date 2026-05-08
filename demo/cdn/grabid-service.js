/**
 * NEVER run token exchange or userinfo on the frontend in a production environment.
 * Doing so exposes your Client Secret (if used) and makes access tokens vulnerable 
 * to interception.
 * 
 * In production, these operations MUST be performed on your backend.
 */

/**
 * Fetches the OIDC discovery configuration from the GrabID server.
 */
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
    throw new Error(`Discovery fetch error: ${error.message}`, { cause: error });
  }
};

/**
 * Exchanges an authorization code for an access token using the OIDC token endpoint.
 */
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
    throw new Error(`Token exchange error: ${error.message}`, { cause: error });
  }
};

/**
 * Fetches user profile information using the access token.
 */
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
    throw new Error(`User info fetch error: ${error.message}`, { cause: error });
  }
};
