var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); // 1. Require CORS

const productRoutes = require('./routes/products'); // Importa el router de productos
const shoppingCartRoutes = require('./routes/shoppingCart'); // Importa las rutas del carrito

var app = express(); // 2. Create app first


// 3. ENABLE CORS FOR ALL ROUTES (most permissive)
app.use(cors()); // That's it! No config needed

// Rest of your middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/billing', require('./routes/billing'));
app.use('/api/products', productRoutes); 
app.use('/api/shopping-cart', shoppingCartRoutes); 

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;