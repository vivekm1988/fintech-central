var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/trial', function(req, res, next) {
  res.send('respond with a resource trial');
});

module.exports = router;
