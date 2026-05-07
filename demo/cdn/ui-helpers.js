/**
 * Shared UI utilities for error handling, HTML escaping, and optional SDK calls.
 */

/**
 * Escapes HTML special characters to prevent XSS when rendering user-provided content.
 */
window.escapeHtml = function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * Formats SDK error responses into human-readable strings.
 */
window.formatError = function (label, response) {
  if (SuperAppSDK.isError(response)) {
    return `${label} failed: ${response.error} (code: ${response.status_code})`;
  }
  return `${label} failed with status: ${response.status_code}`;
};

/**
 * Displays a message in a specific element with color-coding based on the message type.
 */
window.show = function (elementId, message, type) {
  const el = document.getElementById(elementId);
  const colorClass = type === 'success' ? 'text-green-500' : type === 'error' ? 'text-red-500' : 'text-yellow-500';
  el.innerHTML = `<p class="${colorClass}">${window.escapeHtml(message)}</p>`;
};

/**
 * Runs an optional SDK operation and displays a warning if it fails, without blocking execution.
 */
window.runOptional = async function (label, promise) {
  const response = await promise;
  if (!SuperAppSDK.isSuccess(response)) {
    window.show('warningArea', window.formatError(label, response), 'warning');
  }
  return response;
};
