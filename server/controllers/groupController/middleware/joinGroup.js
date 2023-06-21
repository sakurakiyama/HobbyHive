/**
 * **************************************************
 *
 * @module groupController.joinGroup
 *
 * @description
 * This controller middleware is used to join
 * a group.
 *
 * **************************************************
 */

const db = require('../../../models/db');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const joinGroup = async (req, res, next) => {
  try {
    const { groupID, userID } = req.body;

    // Check to see if the user is already a member.
    const checkExistsQuery = `SELECT * FROM usergroups WHERE user_id = $1 AND group_id = $2`;
    const { rows: doesExist } = await db.query(checkExistsQuery, [
      userID,
      groupID,
    ]);

    if (doesExist.length) return next();

    const joinGroupQuery = `INSERT INTO usergroups (user_id, group_id) VALUES ($1, $2)`;
    await db.query(joinGroupQuery, [userID, groupID]);
    res.locals.joined = true;
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in groupController.joinGroup middleware ${error}`,
      status: 400,
      message: { error: 'Unable to join group' },
    });
  }
};

module.exports = joinGroup;
