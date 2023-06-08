/**
 * **************************************************
 *
 * @module groupController
 *
 * @description
 * This is a collection of Express middleware functions
 * used for interacting with user information
 *
 * **************************************************
 */

const getGroups = require('./middleware/getGroups.js');

module.exports = {
  getGroups,
};
