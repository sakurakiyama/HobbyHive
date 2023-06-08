/**
 * **************************************************
 *
 * @module userController
 *
 * @description
 * This is a collection of Express middleware functions
 * used for interacting with user information
 *
 * **************************************************
 */

const createProfile = require('./middleware/createProfile');
const getOrCreateUser = require('./middleware/getOrCreateUser');
const addInterests = require('./middleware/addInterests');
const profileReady = require('./middleware/profileReady');
const getInterests = require('./middleware/getInterests');
const uniqueUsername = require('./middleware/uniqueUsername'); 

module.exports = {
  createProfile,
  getOrCreateUser,
  addInterests,
  profileReady,
  getInterests,
  uniqueUsername
};
