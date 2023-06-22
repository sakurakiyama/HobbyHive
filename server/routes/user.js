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
  userController.getUserGroups,
  (req, res) => {
    return res.status(200).json({
      user: res.locals.user,
      interests: res.locals.interests,
      groups: res.locals.userGroups,
      groupInfo: res.locals.groupInfo,
    });
  }
);

router.patch(
  '/updateProfile',
  userController.updateProfile,
  userController.getUserInterests,
  userController.addNewInterests,
  userController.removeInterests,
  userController.getUserInterests,
  (req, res) => {
    return res
      .status(200)
      .json({ user: res.locals.user, interest: res.locals.interests });
  }
);

router.get('/getUserGroups/:id', userController.getUserGroups, (req, res) => {
  return res.status(200).json(res.locals.userGroups);
});

module.exports = router;
