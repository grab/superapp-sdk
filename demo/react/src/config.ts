export const ENVIRONMENT = 'staging';

export const CONFIG = {
  staging: {
    clientId: 'REPLACE_WITH_STAGING_CLIENT_ID',
    discoveryUrl: 'https://partner-api.stg-myteksi.com/grabid/v1/oauth2/.well-known/openid-configuration',
    redirectUri: 'REPLACE_WITH_STAGING_REDIRECT_URI'
  },
  production: {
    clientId: 'REPLACE_WITH_PRODUCTION_CLIENT_ID',
    discoveryUrl: 'https://partner-api.grab.com/grabid/v1/oauth2/.well-known/openid-configuration',
    redirectUri: 'REPLACE_WITH_PRODUCTION_REDIRECT_URI'
  }
};

export const ENVIRONMENT_CONFIG = CONFIG[ENVIRONMENT];