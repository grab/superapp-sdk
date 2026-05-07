/**
 * Centralized environment and OAuth client configuration.
 * Used across the demo to maintain consistency between staging and production.
 */
const ENVIRONMENT = 'staging'; // Change to 'production' for prod

const CONFIG = {
  // Staging environment (default)
  staging: {
    clientId: 'REPLACE_WITH_STAGING_CLIENT_ID',
    discoveryUrl: 'https://partner-api.stg-myteksi.com/grabid/v1/oauth2/.well-known/openid-configuration',
    redirectUri: 'REPLACE_WITH_STAGING_REDIRECT_URI'
  },
  // Production environment
  production: {
    clientId: 'REPLACE_WITH_PRODUCTION_CLIENT_ID',
    discoveryUrl: 'https://partner-api.grab.com/grabid/v1/oauth2/.well-known/openid-configuration',
    redirectUri: 'REPLACE_WITH_PRODUCTION_REDIRECT_URI'
  }
};

/**
 * The configuration for the current environment.
 */
const ENVIRONMENT_CONFIG = CONFIG[ENVIRONMENT];
