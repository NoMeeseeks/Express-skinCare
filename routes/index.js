var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to the API');
});

router.get('/test', function(req, res, next) {
  res.json({
    message: 'Test route'
  });
}
);

module.exports = router;
