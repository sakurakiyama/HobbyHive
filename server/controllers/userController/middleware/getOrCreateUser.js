/**
 * **************************************************
 *
 * @module userController.getOrCreateUser
 *
 * @description
 * This controller middleware is used to create a
 * user if it's their first time logging in and get the user data.
 *
 * **************************************************
 */

const userModel = require('../../../models/userModel');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const getOrCreateUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const getUserQuery = 'SELECT * from users WHERE email = $1';
    const { rows } = await userModel.query(getUserQuery, [email]);
    let user = rows[0];
    if (user) {
      res.locals.user = user;
      return next();
    } else {
      const createUserQuery =
        'INSERT INTO users (email) VALUES ($1) RETURNING *';
      const { rows } = await userModel.query(createUserQuery, [email]);
      user = rows[0];
      res.locals.user = user;
      return next();
    }
  } catch (error) {
    return next({
      log: `Error occurred in userController.getOrCreateUser middleware ${error}`,
      status: 400,
      message: { error: 'Unable to create a new user account' },
    });
  }
};
module.exports = getOrCreateUser;
