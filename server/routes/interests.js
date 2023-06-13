const express = require('express');
const interestController = require('../controllers/interestController');
const router = express.Router();

router.get('/getInterests', interestController.getInterests, (req, res) => {
  return res.status(200).json(res.locals.interests);
});

module.exports = router;
