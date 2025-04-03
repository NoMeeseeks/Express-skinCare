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
});

//agregue m
const productRoutes = require('./products'); 
router.use('/products', productRoutes); 

const shoppingCartRoutes = require('./shoppingCart'); 
router.use('/shopping-cart', shoppingCartRoutes); 


module.exports = router;
