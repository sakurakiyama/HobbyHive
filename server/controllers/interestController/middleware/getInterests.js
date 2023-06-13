/**
 * **************************************************
 *
 * @module interestController.getInterests
 *
 * @description
 * This controller middleware is used to get the
 * all interests
 *
 * **************************************************
 */

const userModel = require('../../../models/userModel');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const getInterests = async (req, res, next) => {
  try {
    const interestQuery = 'SELECT * FROM interests';
    const { rows } = await userModel.query(interestQuery);
    res.locals.interests = rows;

    return next();
  } catch (error) {
    return next({
      log: `Error occurred in interestController.getInterests middleware ${error}`,
      status: 400,
      message: { error: 'Unable to get all interests' },
    });
  }
};

module.exports = getInterests;
