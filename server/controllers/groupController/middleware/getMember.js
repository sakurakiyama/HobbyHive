/**
 * **************************************************
 *
 * @module groupController.getMember
 *
 * @description
 * This controller middleware is used to get a member
 *
 * **************************************************
 */

const db = require('../../../models/db');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const getMember = async (req, res, next) => {
  try {
    const { id } = req.params;

    const getUserInfoQuery = `SELECT firstname, lastname, photo, username, city, bio FROM users WHERE id=$1`;
    const { rows: member } = await db.query(getUserInfoQuery, [id]);
    res.locals.member = member;
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in groupController.getMember
      middleware ${error}`,
      status: 400,
      message: { error: 'Unable to get member' },
    });
  }
};

module.exports = getMember;
