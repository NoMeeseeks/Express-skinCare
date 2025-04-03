const express = require('express');
const router = express.Router();
const { shopping_cart, product, user } = require('../models'); // Importa los modelos necesarios

//todos los productos del carrito de compras de un usuario
router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    const cartItems = await shopping_cart.findAll({
      where: { id_user: id }, 
      include: [
        {
          model: product, 
          as: 'product',
          attributes: ['id', 'product_name', 'description', 'price', 'image_url'],
        },
      ],
    });

    if (cartItems.length === 0) {
      return res.status(404).json({ error: 'No se encontraron productos para este usuario' });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos del carrito' });
  }
});

module.exports = router;