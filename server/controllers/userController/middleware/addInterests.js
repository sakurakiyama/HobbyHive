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
const { createPlaceholders } = require('../../utils/utils');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const addInterests = async (req, res, next) => {
  const { interests } = req.fields;
  const userId = res.locals.user.id;
  try {
    const interestValues = interests.split(',');
    // Create placeholders for the query
    const placeholders = createPlaceholders(interestValues);

    // Grab all the ids from the interest table for the interests the user selected
    const getInterestQuery = `SELECT id FROM interests WHERE interest IN (${placeholders})`;
    const { rows: interestIds } = await userModel.query(
      getInterestQuery,
      interestValues
    );

    // Loop over the interests, executing a query to insert into the userInterests table
    const joinUserInterestsQuery = `INSERT INTO userInterests (user_id, interest_id) VALUES ($1, $2)`;
    for (const interest of interestIds) {
      const interestId = interest.id;
      await userModel.query(joinUserInterestsQuery, [userId, interestId]);
    }

    return next();
  } catch (error) {
    return next({
      log: `Error occurred in userController.addInterests middleware ${error}`,
      status: 400,
      message: { error: 'Unable to add interests to user' },
    });
  }
};

module.exports = addInterests;
