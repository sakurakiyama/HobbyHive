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
  try {
    const { userid, groupid, message } = req.body;
    const groupIdentifier = `GroupChat-${groupid}`;
    console.log('group is: ', groupIdentifier);
    const post = JSON.stringify({ [userid]: message });
    const result = await client.lPush(groupIdentifier, post);

    if (typeof result === 'number') {
      res.locals.success = true;
    } else {
      res.locals.success = false;
    }

    res.locals.message = {
      user: userid,
      message: message,
      groupId: groupid,
    };
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in groupController.postMessage middleware ${error}`,
      status: 400,
      message: { error: 'Unable to post message' },
    });
  }
};

module.exports = postMessage;
