/**
 * **************************************************
 *
 * @module userController.updateProfile
 *
 * @description
 * This controller middleware is used to update a
 * users profile
 *
 * **************************************************
 */

const userModel = require('../../../models/userModel');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const updateProfile = async (req, res, next) => {
  try {
    const { email, firstname, lastname, bio, city } = req.body;
    // Update the users profile
    const updateProfileQuery =
      'UPDATE users SET firstname=$1, lastname=$2, bio=$3, city=$4 WHERE email=$5 RETURNING *';

    const { rows } = await userModel.query(updateProfileQuery, [
      firstname,
      lastname,
      bio,
      city,
      email,
    ]);

    res.locals.user = rows[0];
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in userController.updateProfile middleware ${error}`,
      status: 400,
      message: { error: 'Unable to add update a users profile' },
    });
  }
};

module.exports = updateProfile;
