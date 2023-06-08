/**
 * **************************************************
 *
 * @module userController.uniqueUsername
 *
 * @description
 * This controller middleware is used to check to see
 * if the inputted username is unique.
 *
 * **************************************************
 */

const userModel = require('../../../models/userModel');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const uniqueUsername = async (req, res, next) => {
  try {
    const { username } = req.query;

    const uniqueQuery = `SELECT * FROM users WHERE username = $1`;
    const { rows } = await userModel.query(uniqueQuery, [username]);

    res.locals.unique = !rows.length ? true : false;
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in userController.uniqueUsername middleware ${error}`,
      status: 400,
      message: { error: 'Unable to verify true or falsy with username' },
    });
  }
};

module.exports = uniqueUsername;
