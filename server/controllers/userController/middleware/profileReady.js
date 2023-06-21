/**
 * **************************************************
 *
 * @module userController.profileReady
 *
 * @description
 * This controller middleware is used to change the
 * profileReady flag for a user
 *
 * **************************************************
 */

const db = require('../../../models/db');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const profileReady = async (req, res, next) => {
  const userId = res.locals.user.id;
  const isReady = true;
  try {
    const updateReadyQuery = `UPDATE users SET profileready = $1 WHERE id = $2`;
    const data = [isReady, userId];
    await db.query(updateReadyQuery, data);
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in userController.profileReady middleware ${error}`,
      status: 400,
      message: { error: 'Unable to set profile ready flag' },
    });
  }
};

module.exports = profileReady;
