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

module.exports = {
    createProfile,
    getOrCreateUser,
};
