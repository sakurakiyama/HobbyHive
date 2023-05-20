/**
 * **************************************************
 *
 * @module userController.addInterests
 *
 * @description
 * This controller middleware is used to add interests
 * to a users profile.
 *
 * **************************************************
 */

const userModel = require('../../../models/userModel');
const fs = require('fs');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const addInterests = async (req, res, next) => {
  const { interests, email } = req.fields;

  try {
    // Grab the interests from the request
    const interestValues = interests.split(',');
    // Create placeholders for the query
    const placeholders = interestValues
      .map((_, index) => `$${index + 1}`)
      .join(',');

    // Grab all the IDs from the interest table for the interests the user selected
    const getInterestQuery = `SELECT id FROM interests WHERE interest IN (${placeholders})`;
    const response = await userModel.query(getInterestQuery, interestValues);

    // Convert them to an array
    const ids = response.rows.map((obj) => obj.id);

    // Update the users with the interests ids
    const addInterestsQuery = `UPDATE users SET userInterests = $1 WHERE email = $2 RETURNING *`;
    const userData = [JSON.stringify(ids), email];
    const result = await userModel.query(addInterestsQuery, userData);
    res.locals.user = result.rows[0];

    return next();
  } catch (error) {
    return next({
      log: `Error occurred in userController.addInterests middleware ${error}`,
      status: 400,
      message: { error: 'Unable to create user profile' },
    });
  }
};

module.exports = addInterests;
