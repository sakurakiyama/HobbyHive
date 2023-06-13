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
const getUserInterests = require('./middleware/getUserInterests');
const uniqueUsername = require('./middleware/uniqueUsername');
const updateProfile = require('./middleware/updateProfile');
const updateUserInterests = require('./middleware/removeInterests');
const addNewInterests = require('./middleware/addNewInterests');
const removeInterests = require('./middleware/removeInterests');

module.exports = {
  createProfile,
  getOrCreateUser,
  addInterests,
  profileReady,
  getUserInterests,
  uniqueUsername,
  updateProfile,
  updateUserInterests,
  addNewInterests,
  removeInterests,
};
