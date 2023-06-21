/**
 * **************************************************
 *
 * @module groupController.getUserGroups
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
    const { id } = req.params;
    const getUserGroupsQuery = 'SELECT * FROM usergroups WHERE user_id=$1';
    const { rows: allUserGroups } = await db.query(getUserGroupsQuery, [id]);
    res.locals.userGroups = allUserGroups;
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
