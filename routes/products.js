const express = require('express');
const router = express.Router();
const { product } = require('../models'); // Importa el modelo de producto

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const singleProduct = await product.findByPk(req.params.id);
    if (!singleProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(singleProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

module.exports = router;