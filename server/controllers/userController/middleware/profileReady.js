/**
 * **************************************************
 *
 * @module userController.profileReady
 *
 * @description
 * This controller middleware is used to add change the
 * profileReady flag for a user
 *
 * **************************************************
 */

const userModel = require('../../../models/userModel');

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
    await userModel.query(updateReadyQuery, data);
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in userController.profileReady middleware ${error}`,
      status: 400,
      message: { error: 'Unable to create user profile' },
    });
  }
};

module.exports = profileReady;
