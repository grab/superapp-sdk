/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import bridgeSDK from "@grabjs/mobile-kit-bridge-sdk";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";

export class IdentityModule {
  constructor() {
    // TODO: migrate to IdentityModule later, use ContainerModule for now
    if (!window.WrappedContainerModule) {
      bridgeSDK.wrapModule(window, "ContainerModule");
    }
  }

  get NAMESPACE() {
    return "grabid";
  }

  get CODE_CHALLENGE_METHOD() {
    return "S256";
  }

  get NONCE_LENGTH() {
    return 16;
  }

  get STATE_LENGTH() {
    return 7;
  }

  get CODE_VERIFIER_LENGTH() {
    return 64;
  }

  get OPENID_CONFIG_ENDPOINTS() {
    return {
      staging: "https://partner-api.stg-myteksi.com/grabid/v1/oauth2/.well-known/openid-configuration",
      production: "https://partner-api.grab.com/grabid/v1/oauth2/.well-known/openid-configuration"
    };
  }

  async fetchAuthorizationEndpoint(environment) {
    const configUrl = this.OPENID_CONFIG_ENDPOINTS[environment];
    if (!configUrl) {
      throw new Error(`Invalid environment: ${environment}. Must be 'staging' or 'production'`);
    }

    try {
      const response = await fetch(configUrl);
      if (!response.ok) {
        console.error(`Failed to fetch OpenID configuration from ${configUrl}: ${response.status} ${response.statusText}`);
        throw new Error("Failed to fetch authorization configuration");
      }
      
      const config = await response.json();
      if (!config.authorization_endpoint) {
        console.error("authorization_endpoint not found in OpenID configuration response");
        throw new Error("Invalid authorization configuration");
      }
      
      return config.authorization_endpoint;
    } catch (error) {
      console.error("Error fetching authorization endpoint:", error);
      
      if (error.message === "Failed to fetch authorization configuration" || 
          error.message === "Invalid authorization configuration") {
        throw error;
      }
      
      throw new Error("Something wrong happened when fetching authorization configuration");
    }
  }

  static generateRandomString(length) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    let result = "";
    for (let i = 0; i < length; i += 1) {
      result += charset.charAt(randomValues[i] % charset.length);
    }
    return result;
  }

  static base64URLEncode(str) {
    return str
      .toString(Base64)
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }

  static generateCodeVerifier(len) {
    return IdentityModule.base64URLEncode(
      IdentityModule.generateRandomString(len)
    );
  }

  static generateCodeChallenge(codeVerifier) {
    return IdentityModule.base64URLEncode(sha256(codeVerifier));
  }

  generatePKCEArtifacts() {
    const nonce = IdentityModule.generateRandomString(this.NONCE_LENGTH);
    const state = IdentityModule.generateRandomString(this.STATE_LENGTH);
    const codeVerifier = IdentityModule.generateCodeVerifier(
      this.CODE_VERIFIER_LENGTH
    );
    const codeChallenge = IdentityModule.generateCodeChallenge(codeVerifier);

    return {
      nonce,
      state,
      codeVerifier,
      codeChallenge,
      codeChallengeMethod: this.CODE_CHALLENGE_METHOD,
    };
  }

  storePKCEArtifacts(artifacts) {
    this.setStorageItem("nonce", artifacts.nonce);
    this.setStorageItem("state", artifacts.state);
    this.setStorageItem("code_verifier", artifacts.codeVerifier);
  }

  async getPKCEArtifacts() {
    const state = this.getStorageItem("state");
    const codeVerifier = this.getStorageItem("code_verifier");
    const nonce = this.getStorageItem("nonce");

    const existingCount = [state, codeVerifier, nonce].filter(item => item !== null).length;

    if (existingCount === 3) {
      return Promise.resolve({
        status_code: 200,
        result: { state, codeVerifier, nonce },
        error: null
      });
    }

    if (existingCount === 0) {
      return Promise.resolve({
        status_code: 204,
        result: null,
        error: null
      });
    }

    return Promise.resolve({
      status_code: 400,
      result: null,
      error: "Inconsistent PKCE artifacts in storage"
    });
  }

  setStorageItem(key, value) {
    window.localStorage.setItem(`${this.NAMESPACE}:${key}`, value);
  }

  getStorageItem(key) {
    return window.localStorage.getItem(`${this.NAMESPACE}:${key}`);
  }

  static normalizeUrl(urlString) {
    const parsedUrl = new URL(urlString);
    return `${parsedUrl.origin}${parsedUrl.pathname}`;
  }

  static buildAuthorizeUrl(authorizationEndpoint, requestMap) {
    const query = Object.entries(requestMap)
      .filter((entry) => entry[1] !== undefined && entry[1] !== null)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    return `${authorizationEndpoint}?${query}`;
  }

  async performWebAuthorization(params) {
    this.setStorageItem("login_return_uri", window.location.href);

    let authorizationEndpoint;
    try {
      authorizationEndpoint = await this.fetchAuthorizationEndpoint(params.environment);
    } catch (error) {
      return Promise.resolve({ 
        status_code: 400, 
        error: error.message 
      });
    }

    const requestMap = {
      client_id: params.clientId,
      scope: params.scope,
      response_type: "code",
      redirect_uri: params.redirectUri,
      nonce: params.nonce,
      state: params.state,
      code_challenge_method: params.codeChallengeMethod,
      code_challenge: params.codeChallenge,
    };

    const authorizeUrl = IdentityModule.buildAuthorizeUrl(
      authorizationEndpoint,
      requestMap
    );
    window.location.assign(authorizeUrl);

    return Promise.resolve({
      status_code: 302,
      result: null,
    });
  }

  static performNativeAuthorization(invokeParams) {
    return window.WrappedContainerModule.invoke("authorize", {
      clientId: invokeParams.clientId,
      redirectUri: invokeParams.redirectUri,
      scope: invokeParams.scope,
      nonce: invokeParams.nonce,
      state: invokeParams.state,
      codeChallenge: invokeParams.codeChallenge,
      codeChallengeMethod: invokeParams.codeChallengeMethod,
      responseMode: invokeParams.responseMode,
    });
  }

  async authorize(request) {
    const validationError = IdentityModule.validateAuthorizeRequest(request);
    if (validationError) {
      return Promise.resolve({ status_code: 400, error: validationError });
    }

    const pkceArtifacts = this.generatePKCEArtifacts();
    this.storePKCEArtifacts(pkceArtifacts);

    const invokeParams = {
      clientId: request.clientId,
      redirectUri: request.redirectUri,
      scope: request.scope,
      nonce: pkceArtifacts.nonce,
      state: pkceArtifacts.state,
      codeChallenge: pkceArtifacts.codeChallenge,
      codeChallengeMethod: pkceArtifacts.codeChallengeMethod,
    };

    const responseMode = request.responseMode || "redirect";

    // Always try native consent first, fallback to web consent if unavailable
    // Note: Native respects responseMode; web always redirects
    try {
      const nativeResult = await IdentityModule.performNativeAuthorization({
        ...invokeParams,
        responseMode,
      });

      // Check if native authorization returned error - only fallback to web for specific status codes
      if (nativeResult.error && [400, 401, 403].includes(nativeResult.status_code)) {
        console.error(
          `Native authorization returned ${nativeResult.status_code}, falling back to web flow:`,
          nativeResult.error
        );
        // Fallback to web flow
        return this.performWebAuthorization({
          ...invokeParams,
          environment: request.environment,
        });
      }

      return nativeResult;
    } catch (error) {
      // Native consent is unavailable, fallback to web flow
      console.error(
        "Native authorization failed, falling back to web flow:",
        error
      );
      return this.performWebAuthorization({
        ...invokeParams,
        environment: request.environment,
      });
    }
  }

  static validateRequiredString(value, fieldName) {
    if (!value || typeof value !== "string" || value.trim() === "") {
      return `${fieldName} is required and must be a non-empty string`;
    }
    return null;
  }

  static validateAuthorizeRequest(request) {
    if (request == null) {
      return "request is required";
    }

    const scopeError = IdentityModule.validateRequiredString(
      request.scope,
      "scope"
    );
    if (scopeError) return scopeError;

    const clientIdError = IdentityModule.validateRequiredString(
      request.clientId,
      "clientId"
    );
    if (clientIdError) return clientIdError;

    const redirectUriError = IdentityModule.validateRequiredString(
      request.redirectUri,
      "redirectUri"
    );
    if (redirectUriError) return redirectUriError;

    try {
      const url = new URL(request.redirectUri);
      if (!url) {
        return "redirectUri must be a valid URL";
      }
    } catch (error) {
      return "redirectUri must be a valid URL";
    }

    const environmentError = IdentityModule.validateRequiredString(
      request.environment,
      "environment"
    );
    if (environmentError) return environmentError;

    if (request.environment !== "staging" && request.environment !== "production") {
      return "environment must be either 'staging' or 'production'";
    }

    return null;
  }
}
