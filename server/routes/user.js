const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/getOrCreateUser', userController.getOrCreateUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post(
  '/createProfile',
  userController.createProfile,
  userController.addInterests,
  userController.profileReady,
  userController.getUserInterests,
  (req, res) => {
    return res
      .status(200)
      .json({ user: res.locals.user, interests: res.locals.interests });
  }
);

router.get('/getInterests/:id', userController.getUserInterests, (req, res) => {
  return res.status(200).json(res.locals.interests);
});

router.get('/uniqueUsername/', userController.uniqueUsername, (req, res) => {
  return res.status(200).json(res.locals.unique);
});

router.post(
  '/getAllUserData',
  userController.getOrCreateUser,
  userController.getUserInterests,
  (req, res) => {
    return res
      .status(200)
      .json({ user: res.locals.user, interests: res.locals.interests });
  }
);

module.exports = router;
