const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/getOrCreateUser', userController.getOrCreateUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post('/createProfile', userController.createProfile, (req, res) => {
  return res.status(200).json(res.locals.user);
});

module.exports = router;
