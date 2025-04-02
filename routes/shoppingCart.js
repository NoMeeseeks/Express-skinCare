const express = require('express');
const router = express.Router();
const { shopping_cart, product } = require('../models'); // Importa los modelos necesarios

// Obtener productos del carrito de un usuario
router.get('/:userId', async (req, res) => {
  try {
    const cartItems = await shopping_cart.findAll({
      where: { id_user: req.params.userId },
      include: [
        {
          model: product,
          as: 'product'
        }
      ]
    });

    if (!cartItems.length) {
      return res.status(404).json({ error: 'No hay productos en el carrito para este usuario' });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos del carrito' });
  }
});

module.exports = router;