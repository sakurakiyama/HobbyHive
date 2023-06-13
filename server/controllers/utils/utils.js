/**
 * **************************************************
 *
 * @module utils.js
 *
 * @description
 * This file contains all utils for middleware.
 *
 * **************************************************
 */

function createPlaceholders(array) {
  return array.map((_, index) => `$${index + 1}`).join(',');
}

module.exports = { createPlaceholders };
