/**
 * **************************************************
 *
 * @module userController.removeInterests
 *
 * @description
 * This controller middleware is used to update a
 * users interests by removing interests
 *
 * **************************************************
 */

const userModel = require('../../../models/userModel');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const removeInterests = async (req, res, next) => {
  try {
    const { interests } = req.body;
    const userId = res.locals.user.id;

    // Compare whats currently in there with the new ones and delete any that aren't in the new ones.
    const toDelete = res.locals.interests.filter((element) => {
      return !interests.includes(element.interest);
    });

    // If there's anything to delete, delete it.
    if (toDelete.length) {
      const deleteQuery = `DELETE FROM userinterests WHERE user_id =$1 AND interest_id =$2`;

      for (const interest of toDelete) {
        const interestId = interest.id;
        await userModel.query(deleteQuery, [userId, interestId]);
      }
    }

    return next();
  } catch (error) {
    return next({
      log: `Error occurred in userController.removeInterests middleware ${error}`,
      status: 400,
      message: { error: 'Unable to remove interests' },
    });
  }
};

module.exports = removeInterests;
