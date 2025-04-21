/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const bridgeSDK = require("@grabjs/mobile-kit-bridge-sdk");

export class ContainerModule {
  constructor() {
    bridgeSDK.wrapModule(window, "ContainerModule");
  }

  setBackgroundColor(backgroundColor) {
    return window.WrappedContainerModule.invoke("setBackgroundColor", {
      backgroundColor,
    });
  }

  setTitle(title) {
    return window.WrappedContainerModule.invoke("setTitle", { title });
  }

  hideBackButton() {
    return window.WrappedContainerModule.invoke("hideBackButton", {});
  }

  showBackButton() {
    return window.WrappedContainerModule.invoke("showBackButton", {});
  }

  hideRefreshButton() {
    return window.WrappedContainerModule.invoke("hideRefreshButton", {});
  }

  showRefreshButton() {
    return window.WrappedContainerModule.invoke("showRefreshButton", {});
  }

  hideLoader() {
    return window.WrappedContainerModule.invoke("hideLoader", {});
  }

  close() {
    return window.WrappedContainerModule.invoke("close", {});
  }
}
