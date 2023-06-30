/**
 * **************************************************
 *
 * @module groupController.getMessages
 *
 * @description
 * This controller middleware is used to
 * get all messages for a group
 *
 * **************************************************
 */

const { client } = require('../../../models/redis');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const getMessages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await client.lRange(`GroupChat-${id}`, 0, -1);
    res.locals.messages = result;
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in groupController.getMessages middleware ${error}`,
      status: 400,
      message: { error: 'Unable to get messages' },
    });
  }
};

module.exports = getMessages;
