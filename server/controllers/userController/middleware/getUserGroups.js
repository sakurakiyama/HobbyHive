/**
 * **************************************************
 *
 * @module userController.getUserGroups
 *
 * @description
 * This controller middleware is used to get all of a
 * users groups
 *
 * **************************************************
 */

const db = require('../../../models/db');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const getUserGroups = async (req, res, next) => {
  try {
    const userId = !res.locals.user ? req.params.id : res.locals.user.id;

    const getUserGroupsQuery = 'SELECT * FROM usergroups WHERE user_id=$1';
    const { rows: allUserGroups } = await db.query(getUserGroupsQuery, [
      userId,
    ]);

    res.locals.userGroups = allUserGroups;
    // Create placeholders for the query.

    if (!allUserGroups.length) return next();

    const placeholders = allUserGroups
      .map((_, index) => `$${index + 1}`)
      .join(',');

    // Grab the group Ids.
    const groupIds = allUserGroups.map((element) => {
      return element.group_id;
    });

    const groupInfoQuery = `SELECT * FROM groups WHERE id IN (${placeholders})`;
    const { rows: groupInfo } = await db.query(groupInfoQuery, groupIds);
    res.locals.groupInfo = groupInfo;
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in groupController.getUserGroups middleware ${error}`,
      status: 400,
      message: { error: 'Unable to get users groups' },
    });
  }
};

module.exports = getUserGroups;
