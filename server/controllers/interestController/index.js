/**
 * **************************************************
 *
 * @module groupController
 *
 * @description
 * This is a collection of Express middleware functions
 * used for interacting with interests
 *
 * **************************************************
 */

const getInterests = require('./middleware/getInterests');

module.exports = {
  getInterests,
};
