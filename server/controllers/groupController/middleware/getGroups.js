/**
 * **************************************************
 *
 * @module groupController.getGroups
 *
 * @description
 * This controller middleware is used to get the
 * selected groups
 *
 * **************************************************
 */

const userModel = require('../../../models/userModel');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const getGroups = async (req, res, next) => {
  try {
    const data = req.query;

    const interestIds = data.interests;
    // Create placeholders for the query
    const placeholders = interestIds
      .map((_, index) => `$${index + 1}`)
      .join(',');

    // Query the database for all the groups that contain the interest ids and are in 1 mile radius
    const groupQuery = `SELECT * FROM groups WHERE (
      3959 * ACOS(
        COS(RADIANS(lat)) * COS(RADIANS(${data.latitude})) *
        COS(RADIANS(${data.longitude}) - RADIANS(lon)) +
        SIN(RADIANS(lat)) * SIN(RADIANS(${data.latitude}))
      )
    ) <= 1
    AND interest_id IN (${placeholders})`;

    const { rows } = await userModel.query(groupQuery, interestIds);
    res.locals.groups = rows;

    return next();
  } catch (error) {
    return next({
      log: `Error occurred in groupController.getGroups middleware ${error}`,
      status: 400,
      message: { error: 'Unable to create user profile' },
    });
  }
};

module.exports = getGroups;
