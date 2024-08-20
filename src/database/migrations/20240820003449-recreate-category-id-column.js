
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'category_id');
    await queryInterface.addColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }, 
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        // eslint-disable-next-line no-dupe-keys
        allowNull: true,
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('products', 'category_id');
  }
};