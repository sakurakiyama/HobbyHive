const express = require('express');
const groupController = require('../controllers/groupController');
const router = express.Router();

router.get('/getGroups', groupController.getGroups, (req, res) => {
  return res.status(200).json(res.locals.groups);
});

module.exports = router;
