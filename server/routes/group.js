const express = require('express');
const groupController = require('../controllers/groupController');
const router = express.Router();

router.get('/getGroups', groupController.getGroups, (req, res) => {
  return res.status(200).json(res.locals.groups);
});

router.put('/joinGroup', groupController.joinGroup, (req, res) => {
  return res.status(200).json(res.locals.joined);
});

router.get('/getUserGroups/:id', groupController.getUserGroups, (req, res) => {
  return res.status(200).json(res.locals.userGroups);
});

module.exports = router;
