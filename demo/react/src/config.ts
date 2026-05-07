export const ENVIRONMENT = 'staging';

export const CONFIG = {
  staging: {
    clientId: '50ba78444a1c45859453d6d59bd13b2d',
    discoveryUrl: 'https://partner-api.stg-myteksi.com/grabid/v1/oauth2/.well-known/openid-configuration',
    redirectUri: 'http://localhost:5173/entry'
  },
  production: {
    clientId: 'REPLACE_WITH_PRODUCTION_CLIENT_ID',
    discoveryUrl: 'https://partner-api.grab.com/grabid/v1/oauth2/.well-known/openid-configuration',
    redirectUri: 'REPLACE_WITH_PRODUCTION_REDIRECT_URI'
  }
};

export const ENVIRONMENT_CONFIG = CONFIG[ENVIRONMENT];