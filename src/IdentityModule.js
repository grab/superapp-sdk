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

  setStorageItem(key, value) {
    window.localStorage.setItem(`${this.NAMESPACE}:${key}`, value);
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

  performWebAuthorization(params) {
    this.setStorageItem("login_return_uri", window.location.href);

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
      params.authorizationEndpoint,
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
      redirectUri: IdentityModule.normalizeUrl(window.location.href),
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

    const { authorizationEndpoint } = request;
    const responseMode = request.responseMode || "redirect";

    // Always try native consent first, fallback to web consent if unavailable
    // Note: Native respects responseMode; web always redirects
    try {
      const nativeResult = await IdentityModule.performNativeAuthorization({
        ...invokeParams,
        responseMode,
      });

      // Check if native authorization returned a 403 error
      if (nativeResult.error && nativeResult.status_code === 403) {
        console.error(
          "Native authorization returned 403, falling back to web flow:",
          nativeResult.error
        );
        // Fallback to web flow
        return this.performWebAuthorization({
          ...invokeParams,
          authorizationEndpoint: authorizationEndpoint,
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
        authorizationEndpoint: authorizationEndpoint,
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

    // authorizationEndpoint is always required as fallback for web consent
    const endpointError = IdentityModule.validateRequiredString(
      request.authorizationEndpoint,
      "authorizationEndpoint"
    );
    if (endpointError) return endpointError;

    try {
      const url = new URL(request.authorizationEndpoint);
      if (!url) {
        return "authorizationEndpoint must be a valid URL";
      }
    } catch (error) {
      return "authorizationEndpoint must be a valid URL";
    }

    return null;
  }
}
