'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('shopping_cart', [
      {
        id_user: 1,  // Asume que existe un usuario con ID 1
        id_product: 130,  // Asume que existe un producto con ID 1
        price: 19.99,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 1,
        id_product: 117,  // Asume que existe un producto con ID 3
        price: 29.99,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 2,  // Asume que existe un usuario con ID 2
        id_product: 121,  // Asume que existe un producto con ID 2
        price: 15.50,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 3,  // Asume que existe un usuario con ID 3
        id_product: 120,  // Asume que existe un producto con ID 4
        price: 45.00,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 3,
        id_product: 81,  // Asume que existe un producto con ID 5
        price: 12.75,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('shopping_cart', null, {});
  }
};