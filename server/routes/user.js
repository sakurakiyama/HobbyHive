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
  userController.getInterests,
  (req, res) => {
    return res
      .status(200)
      .json({ user: res.locals.user, interests: res.locals.interests });
  }
);

router.get('/getInterests/:id', userController.getInterests, (req, res) => {
  return res.status(200).json(res.locals.interests);
});

router.get('/uniqueUsername/', userController.uniqueUsername, (req, res) => {
  return res.status(200).json(res.locals.unique);
});
module.exports = router;
