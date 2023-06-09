/**
 * **************************************************
 *
 * @module userController.createProfile
 *
 * @description
 * This controller middleware is used to create a
 * users profile.
 *
 * **************************************************
 */

const db = require('../../../models/db');
const fs = require('fs');

/**
 * ====================================
 *        MIDDLEWARE FUNCTION
 * ====================================
 */

const createProfile = async (req, res, next) => {
  const { firstName, lastName, email, username, city, bio, interests } = req.fields;
  const { photo } = req.files;

  // Invoke global error handler if any of the fields are empty
  if (
    !firstName ||
    !lastName ||
    !photo ||
    !email ||
    !username ||
    !city ||
    !bio ||
    !interests
  ) {
    return next({
      log: 'Error occurred in userController.createProfile middleware: Missing required fields',
      status: 400,
      message: 'Missing data. Please enter all required fields.',
    });
  }
  try {
    // Encode the file to Base 64 format
    const fileData = fs.readFileSync(photo.path);
    const encodedData = fileData.toString('base64');

    const createProfileQuery = `
    UPDATE users
    SET firstName = $1,
        lastName = $2,
        photo = $3,
        username = $5,
        city = $6,
        bio = $7
    WHERE email = $4
    RETURNING *
    `;
    const userData = [
      firstName,
      lastName,
      encodedData,
      email,
      username,
      city,
      bio,
    ];

    // Add the user's profile information to the database
    const response = await db.query(createProfileQuery, userData);
    res.locals.user = response.rows[0];
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in userController.createProfile middleware ${error}`,
      status: 400,
      message: { error: 'Unable to create user profile' },
    });
  }
};

module.exports = createProfile;
