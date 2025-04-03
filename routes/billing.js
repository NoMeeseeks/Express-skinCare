const express = require('express');
const router = express.Router();
const { bill, detailbill, product, user } = require('../models');
const { sequelize } = require('../models/index');

// POST /bills - Crear factura con detalles
router.post('/', async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id_user, payment_method, items } = req.body;

    // Validaciones básicas
    if (!id_user || !payment_method || !items || !items.length) {
      await transaction.rollback();
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    // 1. Verificar que el usuario existe
    const userExists = await user.findByPk(id_user, { transaction });
    if (!userExists) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // 2. Obtener productos y validar stock
    const productIds = items.map(item => item.id_product);
    const products = await product.findAll({
      where: { id: productIds },
      transaction
    });

    // 3. Calcular total y validar
    let total = 0;
    const itemsWithPrice = items.map(item => {
      const productItem = products.find(p => p.id === item.id_product);
      if (!productItem) {
        throw new Error(`Producto ${item.id_product} no encontrado`);
      }
      if (productItem.quantity < item.quantity) {
        throw new Error(`Stock insuficiente para el producto ${productItem.product_name}`);
      }
      const subtotal = productItem.price * item.quantity;
      total += subtotal;
      return {
        id_product: item.id_product,
        quantity: item.quantity,
        unit_price: productItem.price
      };
    });

    // 4. Crear la factura
    const newBill = await bill.create({
      id_user,
      total,
      payment_method,
      status: 'pending',
      purchase_date: new Date()
    }, { transaction });

    // 5. Crear detalles
    await detailbill.bulkCreate(
      itemsWithPrice.map(item => ({
        id_bill: newBill.id,
        ...item
      })),
      { transaction }
    );

    // 6. Actualizar stock
    for (const item of items) {
      await product.decrement('quantity', {
        by: item.quantity,
        where: { id: item.id_product },
        transaction
      });
    }

    await transaction.commit();
    
    // 7. Obtener la factura creada con sus relaciones
    const createdBill = await bill.findByPk(newBill.id, {
      include: [
        { association: 'user', attributes: ['id', 'name', 'email'] },
        { 
          association: 'details',
          include: [{
            association: 'product',
            attributes: ['id', 'product_name']
          }]
        }
      ]
    });

    res.status(201).json({
      message: 'Factura creada exitosamente',
      bill: createdBill
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Error en billing:', error);
    res.status(500).json({ 
      error: error.message || 'Error al crear la factura'
    });
  }
});

// GET /bills/:id - Obtener factura con detalles
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const billData = await bill.findOne({
      where: { id },
      include: [
        { 
          association: 'user',
          attributes: ['id', 'name', 'email']
        },
        {
          association: 'details',
          include: [{
            association: 'product',
            attributes: ['id', 'product_name', 'image_url']
          }]
        }
      ]
    });

    if (!billData) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }

    res.json(billData);

  } catch (error) {
    console.error('Error al obtener factura:', error);
    res.status(500).json({ 
      error: 'Error al obtener la factura',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;