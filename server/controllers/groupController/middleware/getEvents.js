/**
 * **************************************************
 *
 * @module groupController.getGroups
 *
 * @description
 * This controller middleware is used to get the
 * the events for a specific group
 *
 * **************************************************
 */

const db = require('../../../models/db');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const getEvents = async (req, res, next) => {
  try {
    const { id } = req.params;

    const getEventsQuery = `SELECT * FROM events WHERE group_id=$1`;
    const { rows: events } = await db.query(getEventsQuery, [id]);
    res.locals.events = events;

    return next();
  } catch (error) {
    return next({
      log: `Error occurred in groupController.getEvents middleware ${error}`,
      status: 400,
      message: { error: 'Unable to get events for a group' },
    });
  }
};

module.exports = getEvents;
