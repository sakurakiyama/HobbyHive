/**
 * **************************************************
 *
 * @module userController.getUserInterests
 *
 * @description
 * This controller middleware is used to get the
 * users interests
 *
 * **************************************************
 */

const db = require('../../../models/db');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const getUserInterests = async (req, res, next) => {
  const userId = !res.locals.user ? req.params.id : res.locals.user.id;
  const userQuery = `
  SELECT interests.id, interests.interest, interests.icon 
  FROM interests 
  JOIN userinterests ON userinterests.interest_id = interests.id 
  WHERE userinterests.user_id = $1`;

  const { rows } = await db.query(userQuery, [userId]);
  res.locals.interests = !rows.length ? [] : rows;
  try {
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in userController.getUserInterests middleware ${error}`,
      status: 400,
      message: { error: 'Unable to get users interests' },
    });
  }
};

module.exports = getUserInterests;
