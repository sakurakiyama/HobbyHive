/**
 * **************************************************
 *
 * @module groupController.getMembers
 *
 * @description
 * This controller middleware is used to get all the members
 * in a specific group
 *
 * **************************************************
 */

const db = require('../../../models/db');
const { createPlaceholders } = require('../../utils/utils');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const getMembers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getUserIdsQuery = `SELECT user_id FROM usergroups WHERE group_id=$1`;
    const { rows: users } = await db.query(getUserIdsQuery, [id]);
    const placeholders = createPlaceholders(users);
    const userIds = users.map((element) => element.user_id);

    const getUserInfoQuery = `SELECT firstname, lastname, photo, username, city, bio FROM users WHERE id IN (${placeholders})`;
    const { rows: members } = await db.query(getUserInfoQuery, userIds);
    res.locals.members = members;
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in groupController.getMembers middleware ${error}`,
      status: 400,
      message: { error: 'Unable to get members' },
    });
  }
};

module.exports = getMembers;
