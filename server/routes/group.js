const express = require('express');
const groupController = require('../controllers/groupController');
const router = express.Router();

router.get('/getGroups', groupController.getGroups, (req, res) => {
  return res.status(200).json(res.locals.groups);
});

router.put('/joinGroup', groupController.joinGroup, (req, res) => {
  return res.status(200).json(res.locals.joined);
});

router.get('/getMembers/:id', groupController.getMembers, (req, res) => {
  return res.status(200).json(res.locals.members);
});

router.get('/getEvents/:id', groupController.getEvents, (req, res) => {
  return res.status(200).json(res.locals.events);
});

router.patch('/postMessage', groupController.postMessage, (req, res) => {
  // return res.status(200).json(res.locals.events);
});
module.exports = router;
