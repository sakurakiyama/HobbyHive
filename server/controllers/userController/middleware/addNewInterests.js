/**
 * **************************************************
 *
 * @module userController.addNewInterests
 *
 * @description
 * This controller middleware is used to update a
 * users interests and add new interests.
 *
 * **************************************************
 */

const db = require('../../../models/db');
const { createPlaceholders } = require('../../utils/utils');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const addNewInterests = async (req, res, next) => {
  try {
    const { interests } = req.body;
    const userId = res.locals.user.id;

    // Compare what needs to be added.
    const oldInterests = res.locals.interests.map((element) => {
      return element.interest;
    });

    const compare = new Set(oldInterests);

    const toAdd = [];
    for (let i = 0; i < interests.length; i++) {
      if (!compare.has(interests[i])) toAdd.push(interests[i]);
    }

    // If there's anything to add, add it.
    if (toAdd.length) {
      // Grab the new interests ids
      const placeholders = createPlaceholders(toAdd);
      const getNewInterestDataQuery = `SELECT id FROM interests WHERE interest IN (${placeholders})`;
      const { rows: interestIds } = await db.query(
        getNewInterestDataQuery,
        toAdd
      );

      const joinUserInterestsQuery = `INSERT INTO userInterests (user_id, interest_id) VALUES ($1, $2)`;
      for (const interest of interestIds) {
        const interestId = interest.id;
        await db.query(joinUserInterestsQuery, [userId, interestId]);
      }
    }

    return next();
  } catch (error) {
    return next({
      log: `Error occurred in userController.addNewInterests middleware ${error}`,
      status: 400,
      message: { error: 'Unable to add new interests' },
    });
  }
};

module.exports = addNewInterests;
