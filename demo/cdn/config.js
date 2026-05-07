const ENVIRONMENT = 'staging'; // Change to 'production' for prod

const CONFIG = {
  staging: {
    clientId: '50ba78444a1c45859453d6d59bd13b2d',
    discoveryUrl: 'https://partner-api.stg-myteksi.com/grabid/v1/oauth2/.well-known/openid-configuration',
    redirectUri: 'http://localhost:8000/cdn/entry.html'
  },
  production: {
    clientId: 'REPLACE_WITH_PROD_CLIENT_ID',
    discoveryUrl: 'https://partner-api.grab.com/grabid/v1/oauth2/.well-known/openid-configuration',
    redirectUri: 'https://your-partner-domain.com/cdn/entry.html'
  }
};

const ENVIRONMENT_CONFIG = CONFIG[ENVIRONMENT];
