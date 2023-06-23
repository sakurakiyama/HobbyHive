/**
 * **************************************************
 *
 * @module groupController.postMessage
 *
 * @description
 * This controller middleware is used to
 * post messages to a group.
 *
 * **************************************************
 */

const { client } = require('../../../models/redis');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const postMessage = async (req, res, next) => {
  const { userid, groupid, message } = req.body;
  try {
  } catch (error) {
    return next({
      log: `Error occurred in groupController.postMessage middleware ${error}`,
      status: 400,
      message: { error: 'Unable to post message' },
    });
  }
};

module.exports = postMessage;
