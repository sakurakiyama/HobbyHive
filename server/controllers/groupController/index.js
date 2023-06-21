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
const joinGroup = require('./middleware/joinGroup.js');
const getUserGroups = require('./middleware/getUserGroups.js');

module.exports = {
  getGroups,
  joinGroup,
  getUserGroups,
};
