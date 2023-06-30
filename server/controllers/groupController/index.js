/**
 * **************************************************
 *
 * @module groupController
 *
 * @description
 * This is a collection of Express middleware functions
 * used for interacting with group information
 *
 * **************************************************
 */

const getGroups = require('./middleware/getGroups.js');
const joinGroup = require('./middleware/joinGroup.js');
const getMembers = require('./middleware/getMembers.js');
const getEvents = require('./middleware/getEvents.js');
const postMessage = require('./middleware/postMessage.js');
const getMessages = require('./middleware/getMessages.js');
const getMember = require('./middleware/getMember.js');

module.exports = {
  getGroups,
  joinGroup,
  getMembers,
  getEvents,
  postMessage,
  getMessages,
  getMember,
};
